//  http://localhost:3000/ 
// you can use npm start to also start the server
const express = require( 'express' ),
      mongodb = require('mongodb')
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
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'datatest5' ).collection( 'test' )
  })
  .then( collection => {
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

  // route to get all docs for MongoDB
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

app.post( '/add', (req,res) => {
  // assumes only one object to insert
  collection.insertOne( req.body ).then( result => res.json( result ) )
})
app.listen( process.env.PORT || 3000 )


