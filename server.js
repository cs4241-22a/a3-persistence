const express = require("express"),
cookie = require("cookie-session"),
hbs = require("express-handlebars").engine,
app = express()

// use express.urlencoded to get data sent by defaut form actions or GET requests
app.use(express.urlencoded({extended:true}) )

// use handlebars
// http://expressjs.com/en/guide/using-template-engines.html
app.engine("handlebars", hbs())
app.set("view engine", "handlebars")
app.set("views","./views")

// cookie middleware! The keys are used for encryption and should be changed
app.use(cookie({
  name: "session",
  keys: ["asdf", "127ev%*Wbbf*WS"]
}))

app.post("/login", (req, res) => {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  console.log(req.body)
  
  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
  if(req.body.username === "test_user" && req.body.password === "PassworD") {
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true
    
    // since login was successful, send the user to the main content
    // use redirect to avoid authentication problems when refreshing
    // the page or using the back button, for details see:
    // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
    res.redirect("main.html")
  } else {
    // cancel session login in case it was previously set to true
    req.session.login = false
    // password incorrect, send back to login page
    res.render("index", {msg:"login failed, please try again", layout:false})
  }
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use((req, res, next) => {
  if( req.session.login === true )
    next()
  else
    res.render("index", { msg:"login failed, please try again", layout:false })
})

app.get("/main.html", (req, res) => {
  res.render( "main", { msg:"welcome, user!", layout:false })
})

const mongodb = require("mongodb")
const { MongoClient, ServerApiVersion } = require('mongodb');

// get uri from database credentials
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const uri = "mongodb+srv://test_user:PassworD@cs4241.ds0anz6.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
let collection = null

const connect = async (error) => {
  // try to connect
  await client.connect()
  const collection = await client.db("dbtest").collection("test")

  // find {} will return all entries/objects in collection
  const results = await collection.find({}).toArray()
  console.log("error:", error) // we want undefined
  console.log(results)
}

connect()

// check connection worked
app.use((req, res, next) => {
  if (collection !== null) {
    next()
  } else {
    res.status(503).send()
  }
})

// route to get all docs
app.get( "/", async (req, res) => {
  // res.render("index", {msg:"", layout:false})
  if (collection !== null) {
    const results = await collection.find({}).toArray()
    res.json(results)
  }
})


// insert 1 given value to collection
app.post("/insert", async (req, res) => {
  const result = await(collection.insertOne(req.body))
  console.log(res.json(results))
})

// find _id in collection and update value to given value
app.post("/update", async (req, res) => {
  const result = await(collection.updateOne(
    { _id: mongodb.ObjectId(req.body._id), 
    $set:{value: req.body.value}}
  ))
  console.log(res.json(results))
})

// find _id in collection and delete entry
app.post("/remove", async (req, res) => {
  const result = await(collection.deleteOne({ _id: mongodb.ObjectId(req.body._id)}))
  console.log(res.json(results))
})

app.listen( 3000 )
