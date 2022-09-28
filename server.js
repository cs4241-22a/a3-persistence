// server.js
// where your node app starts

// init project
const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      dotenv = require('dotenv').config(),
      app = express(),
      admin = express()
     

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.static("views"));
app.use( express.json() );

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null 


client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'Users' ).collection( 'Usernames' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( )//console.log )

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// app.get("/home", function(request, response) {
//   response.sendFile(__dirname + "/views/home.html");
// });

app.get("/signup", function(request, response) {
  response.sendFile(__dirname + "/views/signup.html");
});

app.get("/home/:username", function(request, response) {
  response.sendFile(__dirname + "/views/home.html")
});


app.post( '/login', (req, res) => {
  //collection.insertOne(req.body).then(console.log)
  collection.findOne(req.body).then( (data) => {
    if(data === null){
      res.json({status: "FAILED",
              username: req.body.username})
    }else{
      console.log(data);
      console.log(req.body.password);
      if(data.username === req.body.username){
        console.log("User Passed")
        if(data.password === req.body.password){
          console.log("Password Passed")
          res.json({status: "SUCCESS",
                 username: req.body.username})
        }
      }
    }
    
    
    
  //if (data === null)
  //redirect to login fail
  //else 
  //successfully login
  })
})

app.post( '/signup', (req, res) => {
  console.log("Welcome")
  collection.findOne(req.body).then( (data) => {
    console.log(req.body);
    console.log(data);
    if(data === null){
      collection.insertOne(req.body).then(console.log)
      res.json({status: "SUCCESS",
                msg: "Account Created",
                username: req.body.username})
    }else if(req.body.username === data.username){
      console.log("User Already Exists")
      res.json({status: "FAILED",
                msg: "User Already Exists",
                username: req.body.username})
    }
  })
})

app.post( '/update', (req,res) => {
  collection
    .updateOne(
      { username: req.body.username},
      { $set:{ firstname: req.body.firstname,
               lastname: req.body.lastname,
               discordID: req.body.discordID,
               rank: req.body.rank,
               steamID: req.body.steamID} }
    )
    .then( result => res.json( result ) )
})


app.post('/getData' , (req, res) =>{
  collection.findOne(
      { username: req.body.username}).then( result => res.json( result ))
})


//document.getElementById("floatingInput").value

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
