// Express
const express = require( 'express' )
const app = express()

app.use( express.static( 'public' ) )

app.listen( process.env.PORT || 3000 )

// Database
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
//const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'A3-Database' ).collection( 'A3-Test' )
  })
  .then( collection => {
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )