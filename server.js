// server.js
// where your node app starts

//init project
const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      bodyParser = require('body-parser'),
      cookie = require('cookie-session'),
      helmet = require('helmet'),
      favicon = require('serve-favicon'),
      path = require('path'),
      app = express()

//add express middleware
app.use(express.static('public'))
app.use(express.json() )
app.use(
  cookie({
    name: "session",
    keys: ["cookie1", "cookie2"]
  })
)
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)
app.use(favicon(__dirname + '/assets/icon.ico'))

//connect to MongoDB
const {MongoClient, ServerApiVersion} = require('mongodb')

const uri = "mongodb+srv://lsdias:pk83XCWfhnrcqEiG@a3-lenadias.dutncel.mongodb.net/?retryWrites=true&w=majority"
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let collection = null

client.connect()
  .then( () => {
    return client.db('lsdias').collection('todolist')
  })
  .then( __collection => {
    //store collection reference
    collection = __collection
    //blank query returns all documents
    return collection.find({}).toArray()
  })
  .then(console.log("Connected"))

//handle requests
//route to get all docs
app.get( '/', (req,res) => {
  res.sendFile(__dirname + "/views/index.html");
  /*if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }*/
})

app.get( '/form', (req,res) => {
  res.sendFile(__dirname + "/views/form.html");
})

app.get( '/data', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

app.post("/register", bodyParser.json(), (req, res) => {
  collection.find({ username : req.body.username})
  .toArray()
  .then(result => {
    //check if the user exists
    if(result.length >= 1)
      {
        //user already exists
        //console.log("/registry unsuccessful")
        res.json({isLoginSuccessful : false})
      }
    else
      {
        //create user
        let user = {
          username : req.body.username,
          password : req.body.password,
          data : []
        }
        
        //console.log("registering")
        collection.insertOne(user)
        
        //set session variables
        req.session.username = req.body.username
        req.session.isLoginSuccessful = true
        
        //log in
        res.json({ isLoginSuccessful : true})
      }
  })
})

app.post("/login", bodyParser.json(), (req, res) => {
  collection.find({username : req.body.username, password : req.body.password}).toArray()
  .then(result => {
    //check if the user exists
    if(result.length >= 1) 
    {
      //successful login
      req.session.username = req.body.username
      req.session.isLoginSuccessful = true
      res.json({ isLoginSuccessful : true})
      //console.log("login successful")
    }
    else 
    {
      //unsuccessful login
      res.json({isLoginSuccessful : false})
      //console.log("login unsuccessful")
    }
  })
})

app.post('/add', bodyParser.json(), (req, res) => {
  collection.find({username : req.session.username}).toArray()
  .then(result => {
    //get the first collection's data since find can return multiple
    let data = result[0].data
    let timeleft = calculateTimeLeft(req.body.date)
    //update the entire array
    data.push(
      {
        taskname : req.body.taskname,
        date : req.body.date,
        timeleft : timeleft,
      }
    )
    
    //update the actual database data
    collection.updateOne(
      { _id : mongodb.ObjectId(result[0]._id) },
      { $set : {data : data} }
    )
    //for testing
    res.json(data)
  })
})

app.post('/remove', bodyParser.json(), (req, res) => {
  collection.find({username : req.session.username}).toArray()
  .then(result => {
    //get the first collection's data since find can return multiple
    let data = result[0].data
    //update the entire array
    //iterate through the data to find what to remove
    let i=0
    while (i < data.length)
    {
      if((data[i].taskname === req.body.taskname)
        && (data[i].date === req.body.date)
        && (data[i].taskname !== 'Task name'))
      {
        data.splice(i, 1);
      }
      else
      {
        i++;
      }
    }
    
    //update the actual database data
    collection.updateOne(
      { _id : mongodb.ObjectId(result[0]._id) },
      { $set : {data : data} }
    )
    //for testing
    res.json(data)
  })
})

app.get('/getData', (req, res) => {
  collection.find({username : req.session.username}).toArray()
  .then(result => {
    //get the first collection's data since find can return multiple
    let data = result[0].data
    res.json(data)
   })
})

//calculates the time left on a task and returns it
const calculateTimeLeft = function(date)
{
  let taskDate = Date.parse(date)
  let today = new Date()
  let time = ((taskDate - today) / 86400000).toPrecision(3)
  if(time <= 0)
  {
    time = 0
  }
  return time
}

// listen for requests :)
// all our post and get requests here
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
})
