const express = require("express")
const app = express()
const mongodb = require("mongodb")
const hbs = require("express-handlebars").engine
const ObjectId = require('mongodb').ObjectId;

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", hbs())
app.set("view engine", "handlebars")
app.set("views", "views")

const uri = "mongodb+srv://mdong:Bacon1A3@cluster0.qkeu5vg.mongodb.net/"
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true })

let collection = null;
let currentId = null;

// connect
client.connect()
.then(() => {
    return client.db("usersDatabase").collection("usertodo")
})
.then (__collection => {
    collection = __collection
    return collection.find({}).toArray()
})
.then (console.log)

// i have no idea what this does, but everything breaks when i remove it so it'll stay
app.use((req, res, next) => {
    if (collection !== null) {
      next()
    }
    else {
      res.status(503).send()
    }
})

// first page
app.get("/", (req,res) => {
    res.render("index", { msg:"", layout:false })
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
            console.log("account found");
            currentId = data[0][0]._id;
            res.redirect("/todo");
        }

        else if (!usernameFound) {
            console.log("adding new user");
            let result = await collection.insertOne({
                username: user,
                password: pass,
                todolist: []
            });
            currentId = ObjectId(result.insertedId);
            res.redirect("/todo");
        }

        else {
            currentId = null;
            res.render("index", { msg:"login failed, please try again", layout:false })
        }
    })
})

// send todo page
app.get("/todo", (req, res) => {
    res.render("todo", { msg:"success you have logged in", layout:false })
})

// add new todo item
app.post("/add", (req, res) => {
    console.log(req.body)
    collection.updateOne(
      { _id: currentId },
      { $push: { todolist: req.body }}
    )
    .then (result => res.json(result))
})

// deletes one todo item
app.post("/delete", (req, res) => {
    collection.updateOne(
        { _id: currentId },
        { $pull: { todolist: { iid: req.body.iid } }}
    )
    .then (result => res.json(result))
})

// something isn't working here. it's not getting updated
app.post("/edit", (req, res) => {
    collection.updateOne(
        { _id: currentId, todolist: { iid: req.body.iid } },
        { $set: { "todolist.$.title": req.body.title } }
    )
    .then (result => {
        console.log(result)
        res.json(result)
    })
})

// get todolist
app.get("/todolist", (req, res) => {
    collection.find({_id: currentId}, {_id: 0, todolist: 1}).toArray()
    .then(result => {
        res.json(result[0].todolist)
    })
})

const port = 3000;
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});