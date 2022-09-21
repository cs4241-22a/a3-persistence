const express = require('express'),
      mongodb = require('mongodb'),
      app = express()


app.use(express.static("public"))
app.use(express.json())
// app.get( '/', ( req, res ) => res.send( 'test') )


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://test:test@a3-persistence.nraftwq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let collection = null

client.connect()
    .then( () => {
      // will only create collection if it doesn't exist
      return client.db( 'a3-persistence' ).collection( 'table' )
    })
    .then( __collection => {
      // store reference to collection
      collection = __collection
      // blank query returns all documents
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

//add
app.post('/add',(req,res)=>{
    collection.insertOne( req.body ).then( result => res.json( result ) )
})
app.post('/delete',(req,res)=>{

})
app.post('/edit',(req,res)=>{

})



app.listen( 3000 )