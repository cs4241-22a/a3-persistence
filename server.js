const express = require("express")
const app = express()
const mongodb = require("mongodb")
const hbs = require("express-handlebars").engine
const ObjectId = require('mongodb').ObjectId;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", hbs())
app.set("view engine", "handlebars")
app.set("views", "views")

// favicon middleware; serves favicon
const favicon = require('serve-favicon')
const path = require('path')
app.use(favicon(path.join(__dirname, 'public', 'resources', 'favicon.png')))

// compression middleware
const compression = require('compression')
app.use(compression())

const uri = "mongodb+srv://mdong:Bacon1A3@cluster0.qkeu5vg.mongodb.net/"
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true })

let collection = null;

// connect
client.connect()
.then(() => {
    return client.db("usersDatabase").collection("usertodo")
})
.then (__collection => {
    collection = __collection
    return collection.find({}).toArray()
})

// cookie-session middleware
const cookie  = require('cookie-session');
app.use(cookie({
    name: 'session',
    keys: ['key1', 'key2']
}))

// first page
app.get("/", (req,res) => {
    if (req.session.login === true) { 
        req.session.status = 0;
        res.redirect("todo") 
    }
    else { res.render("index", { msg:"", layout:false }) }
})

// login
app.post("/login", async(req, res) => {
    const user = req.body.username
    const pass = req.body.password

    const usernamePromise = collection.find({username: user}).toArray();
    const accountPromise = collection.find({username: user, password: pass}).toArray();
    Promise.all([usernamePromise, accountPromise]).then(async data => {
        const usernameFound = data[0].length != 0;
        const accountFound = data[1].length != 0;
        if (accountFound) {
            req.session.id = data[0][0]._id.toString();
            req.session.login = true;
            req.session.status = 1;
            res.redirect("/todo");
        }

        else if (!usernameFound) {
            let result = await collection.insertOne({
                username: user,
                password: pass,
                todolist: []
            });
            req.session.id = result.insertedId;
            req.session.login = true;
            req.session.status = 2;
            res.redirect("/todo");
        }

        else {
            req.session.id = null;
            req.session.login = false;
            res.render("index", { msg:"login failed, please try again", layout:false })
        }
    })
})

// redirects unauthorized users to login
app.use(function(req, res, next) {
    if (req.session.login === true) { next(); }
    else { 
        res.sendFile(path.join(__dirname, "views", "index"), function(err) {
            if (err) {
                res.status(err.status).end();
            }
        });
    }
})

// logs out
app.get("/logout", (req, res) => {
    req.session.id = null;
    req.session.login = false;
    return res.render("index", { msg:"signed out", layout:false })
})

// send todo page
app.get("/todo", (req, res) => {
    let msg = "";
    if (req.session.status === 1) { msg = "success you have logged in"; }
    else if (req.session.status === 2) { msg = "new account generated"; }
    res.render("todo", { msg:msg, layout:false })
})

// add new todo item
app.post("/add", (req, res) => {
    collection.updateOne(
      { _id: ObjectId(req.session.id) },
      { $push: { todolist: req.body }}
    )
    .then (result => res.json(result))
})

// deletes one todo item
app.post("/delete", (req, res) => {
    collection.updateOne(
        { _id: ObjectId(req.session.id) },
        { $pull: { todolist: { iid: req.body.iid } }}
    )
    .then (result => res.json(result))
})

// edits todo item
app.post("/edit", (req, res) => {
    collection.updateOne(
        { _id: ObjectId(req.session.id), "todolist.iid": req.body.iid },
        { $set: { "todolist.$.title": req.body.title } }
    )
    .then (result => res.json(result))
})

// get todolist
app.get("/todolist", (req, res) => {
    collection.find({_id: ObjectId(req.session.id) }, {_id: 0, todolist: 1}).toArray()
    .then(result => res.json(result[0].todolist))
})

app.use(express.static("public"))
const port = 3000;
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});