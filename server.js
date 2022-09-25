const express = require("express"),
cookie = require("cookie-session"),
app = express(),
mongodb = require("mongodb")

// get uri from database credentials
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`

const uri = "mongodb+srv://test_user:PassworD@cs4241.ds0anz6.mongodb.net/?retryWrites=true&w=majority"
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb.ServerApiVersion.v1 })
let collection = null

// use express.urlencoded to get data sent by defaut form actions or GET requests
app.use(express.urlencoded({extended:true}) )
app.use(express.static("./public"))
app.use(express.static("./views"))

// cookie middleware! The keys are used for encryption and should be changed
app.use(cookie({
  name: "session",
  keys: ["asdf", "127ev%*Wbbf*WS"]
}))

app.post("/login", (req, res) => {  
  // simple authentication
  if(req.body.username === "test_user" && req.body.password === "PassworD") {
    // variable to be used in middleware
    req.session.login = true
    
    // login success, redirect 
    // for reload issues: https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
    res.redirect("main.html")
  } else {
    // express.urlencoded will put your key value pairs 
    // into an object, where the key is the name of each
    // form field and the value is whatever the user entered
    console.log(req.body)
    
    // cancel session login in case it was previously set to true
    req.session.login = false
    
    console.log("login failed")
  }
})


// add some middleware that always sends unauthenicaetd users to the login page
app.use((req, res, next) => {
  if( req.session.login === true )
    next()
  // else
  // res.render( "index", { msg:"login failed, please try again", layout:false })
})



// middleware to check if connection worked
app.use((req, res, next) => {
  if (collection !== null) {
    next()
  } else {
    res.status(503).send()
  }
})
  
// route to get all docs
app.get( '/', (req,res) => {
  client.connect()
    .then( () => client.db( 'dbtest' ).collection( 'test' ) )
    .then( _collection => {
      // get all entries in db
      collection = collection.find({ }).toArray()
    
      if( collection !== null ) {
        res.json(collection)
      } else {
        return "could not connect"
      }
    })
    .then( result => {
      console.log(result) 
    })
  
  
})



// route to get all docs
app.get( "/main.html", async (req, res) => {
  if (collection !== null) {
    const results = await collection.find({}).toArray()
    res.json(results)
  }
})


// insert entry into collection
app.post("/add", async (req, res) => {
  const result = await(collection.insertOne(req.body))
  res.json(result)
})

// find _id in collection and update value to given value
app.put("/update", async (req, res) => {
  const result = await(collection.updateOne(
    { _id: mongodb.ObjectId(req.body._id), 
    $set:{value: req.body.value}}
  ))
  console.log(res.json(result))
})

// find _id in collection and delete entry
app.delete("/remove", async (req, res) => {
  const result = await(collection.deleteOne({ _id: mongodb.ObjectId(req.body._id)}))
  console.log(res.json(result))
})

app.listen( process.env.PORT || 3000 )
