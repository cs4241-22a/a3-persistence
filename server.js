//  http://localhost:3000/ 
// you can use npm start to also start the server
const express = require( 'express' ),
      mongodb = require('mongodb'),
      
      app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

console.log(process.env.HOST);
app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) )
app.use( express.json() )

// logger function
  // const logger = (req,res,next) => {
  //   console.log( 'url:', req.url )
  //   next()
    
  // }
  // app.use( logger )

  // app.get( '/', ( req, res ) => res.send( 'Hello World!' ) )

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let collection = null // collection declaration
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'datatest5' ).collection( 'test' )
  })
  .then( __collection => { //_collection is an alis for what the previous .then function returned
    collection = __collection // set collection variable with the  data from last .then 
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )



  // route to get all docs for MongoDB
app.get( '/', (req,res) => {
  console.log("handling / ")
  if( collection !== null ) {
    // get array and pass to res.json
    let cData = JSON.stringify(collection.find({ }).toArray())
    response.end(cData)

    // .then( result => res.json( result ) )
  }
})

app.post('/results', (req,res)=>{
    let filler = req.body; 
    collection.find({ }).toArray().then(result => res.json(result))
})

app.post( '/add', (req,res) => {
  // console.log("handling /add")
  // assumes only one object to insert
  collection.insertOne( req.body ).then( result => res.json( result ) )
})

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post( '/remove', (req,res) => {

  console.log(req.body._id)
  
  collection
    .deleteOne({ _id:mongodb.ObjectId( req.body._id ) }) // ._id parameter is from our JSON
    .then( result => res.json( result ) )
})

app.post( '/update', (req,res) => {
  collection
    .updateOne(
      { _id:mongodb.ObjectId( req.body._id ) },
      {$set:{json:req.body}}
    )
    .then( result => res.json( result ) )
})


const cookie  = require( 'cookie-session' );
const { response } = require('express');
// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )

// cookie middleware! The keys are used for encryption and should be
// changed
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.post( '/login', (req,res)=> {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  console.log( req.body )
  
  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
  if( req.body.password === 'test' ) {
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true
    
    // since login was successful, send the user to the main content
    // use redirect to avoid authentication problems when refreshing
    // the page or using the back button, for details see:
    // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
    res.redirect( 'main.html' )
  }else{
    console.log(" wrong passowrd")
    // password incorrect, redirect back to login page
    // res.sendFile( __dirname + '/views/index.html' )
    res.sendFile( __dirname + '/index.html' )
  }
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    // res.sendFile( __dirname + '/views/index.html' )
    res.sendFile( __dirname + '/index.html' )
})

app.listen( process.env.PORT || 3000 )