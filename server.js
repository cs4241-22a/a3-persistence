const express = require("express")
const app = express()
const cookie = require("cookie-session")
const mongodb = require("mongodb")

// use express.urlencoded to get data sent by defaut form actions or GET requests
app.use(express.urlencoded({extended:true}) )
app.use(express.static("./public"))
app.use(express.static("./views"))

// NEED TO FIX
const uri = "mongodb+srv://test_user:PassworD@cs4241.ds0anz6.mongodb.net/?retryWrites=true&w=majority"
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb.ServerApiVersion.v1 })
let groceryList = null
let users = null

client.connect()
.then(() => {
  groceryList = client.db("a3").collection("groceries")
  users = client.db("users").collection("users")
  return groceryList
})
.then((_groceryList) => {
  return _groceryList.find({}).toArray()
})
// .then(console.log)

// cookie middleware! The keys are used for encryption and should be changed
app.use(cookie({
  name: "session",
  keys: ["asdf", "127ev%*Wbbf*WS"]
}))

app.post("/login", async (req, res) => {
  // check if credentials exist already
  validUser = await users.findOne({
    username: req.body.username, 
    password: req.body.password
  })
  if(validUser !== null) {
    req.session.login = true
    res.redirect("main.html")
    res.status(200).send()
  } else {
    req.session.login = false
    res.redirect("/account.html")
  }
})

app.post("/createAccount", async (req, res) => {
  const newAcct = {
    username: req.body.username,
    password: req.body.password
  }

  let stat = 200
  const tryToFind = await users.findOne(newAcct)
  if (tryToFind === null) {
    users.insertOne(newAcct)
    stat = 201
  }
  res.redirect("/main.html")
  res.status(stat).send()
})

// middleware: check that groceryList data was found
app.use((req, res, next) => {
  if (groceryList !== null) {
    next()
  } else {
    res.status(503).send()
  }
})

// middleware: check that new account credentials were created
app.use((req, res, next) => {
  const results = users.findOne({
    username: req.body.username,
    password: req.body.password
  })
  if (results !== null) {
    next()
  } else {
    res.status(503).send()
  }
})

// get all entries
app.get("/groceries", async (req, res) => {
  // if (groceryList !== null) {
    await groceryList.find({}).toArray()
      .then((result) => {
        res.json(result)
      })
  // }
})

// insert entry into groceryList
app.post("/add", async (req, res) => {
  const newEntry = {
    quantity: req.body.quantity,
    itemName: req.body.itemName,
    priority: req.body.priority,
    entryId: Math.round(Math.random() * 100000) // unique id to easily ref later
  }
  
  const result = await(groceryList.insertOne(newEntry))
  res.redirect("/main.html")
  // res.json(result)
})

// find groceryId in db and update value to given value
app.put("/update", async (req, res) => {
  const updatedEntry = {
    quantity: req.body.quantity,
    itemName: req.body.itemName,
    priority: req.body.priority
  }
  const result = await(groceryList.updateOne({
    groceryId: req.body.groceryId, 
    $set: updatedEntry
  }))
  res.redirect("/main.html")
  // res.json(result)
})

// find _id in groceryList and delete entry
app.post("/remove", async (req, res) => {
  const result = await(groceryList.deleteOne({
    groceryId: req.body.groceryId
  }))
  res.redirect("/main.html")
  // res.json(result)
})

app.listen( process.env.PORT || 3000 )
