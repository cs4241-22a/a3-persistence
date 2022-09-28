const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      cookie  = require( 'cookie-session' ),
      app = express()

app.use( express.static('public') )
app.use( express.json() )

require('dotenv').config()
app.use( express.urlencoded({ extended:true }) )

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1 })
let collection = null

client.connect()
  .then( () => client.db( 'testdb' ).collection( 'testcollection' ) )
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
  })
  .then( console.log )
  
// route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.post( '/add', (req,res) => {
  // assumes only one object to insert
  collection.insertOne( req.body ).then( result => res.json( result ) )
})

app.post( '/remove', (req,res) => {
  collection
    .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
    .then( result => res.json( result ) )
})

app.post( '/update', (req,res) => {
  collection
    .updateOne(
      { _id:mongodb.ObjectId( req.body._id ) },
      { $set:{ name:req.body.name } }
    )
    .then( result => res.json( result ) )
})

app.listen( 3000 )