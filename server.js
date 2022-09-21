const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      ServerApiVersion = require('mongodb'),
      app = express(),
      errorhandler = require('errorhandler'),
      favicon = require('serve-favicon'),
      path = require('path'),
      serveIndex = require('serve-index'),
      serveStatic = require('serve-static'),
      morgan = require('morgan'),
      timeout = require('connect-timeout'),
      bodyParser = require('body-parser')


app.use( express.static('public') )
app.use( express.json() )


// <-- Express Middleware --> //
app.use(bodyParser.json())
app.use( serveStatic( 'views'  ) )
app.use(timeout('5s'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.URL}`;

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1 })
let collection = null
let usercollection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'trip' ).collection( 'test' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  //.then( console.log )

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'trip' ).collection( 'users' )
  })
  .then( __usercollection => {
    // store reference to collection
    usercollection = __usercollection
    // blank query returns all documents
    return usercollection.find({ }).toArray()
  })
  //.then( console.log )


  
// route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})
  


const dreams = []



/*app.use( (req,res,next) => {
  console.log( 'url:', req.url )
  next()
})*/


 

//get request for data from mongo, to update table
app.post( '/submit', (req, res) => {
  collection.insertOne( req.body ).then( result => res.json( result ) )
  //res.writeHead( 200, { 'Content-Type': 'application/json' })
})

app.post( '/delete', (req, res) => {
  collection
    .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
    .then( result => res.json( result ) )
    //.then(console.log(req.body))
})

app.post("/get",(req,res,next)=>{
   if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ username:req.body.user }).toArray().then( result => res.json( result ) )
  }
})

app.post("/login",(req,res,next)=>{
   if( collection !== null ) {
    // get array and pass to res.json
    usercollection.find({ username:req.body.username }).toArray().then( result => res.json(result[0].password == req.body.password))
  }
})

app.post("/register",(req,res,next)=>{
   if( collection !== null ) {
    // get array and pass to res.json
    usercollection.find({ username:req.body.username }).toArray().then( result => {
      if(result.length == 0)  usercollection.insertOne( req.body )
      res.json(result.length == 0)
    })
  }
})

app.post( '/update', (req,res) => {
  //console.log(req.body)
  
  collection
    .updateOne(
      { _id:mongodb.ObjectId( req.body._id ) },
      { $set:{ dest:req.body.dest,miles:req.body.miles,avg:req.body.avg,time:req.body.time } }
    )
    .then( result => res.json( result ) )
})


app.get( '/', ( req, res ) => res.send( 'Hello World!' ) )

app.listen( 3000 )
