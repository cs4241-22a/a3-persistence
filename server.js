const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      app = express()

app.use( express.static('public') )
app.use( express.json() )

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let collection = null

// const connect = async function() {
//   await client.connect()
//   const collection = await client.db("groceries").collection("devices")
//   const results = await collection.find({}).toArray()
//   console.log(results)
// }

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'groceries' ).collection( 'devices' )
  })
  .then( collection => {
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

// app.use( (req,res,next) => {
//   if( collection !== null ) {
//     next()
//   }else{
//     res.status( 503 ).send()
//   }
// })

// app.post( '/add', (req,res) => {
//   // assumes only one object to insert
//   collection.insertOne( req.body ).then( result => res.json( result ) )
// })

// // assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
// app.post( '/remove', (req,res) => {
//   collection
//     .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
//     .then( result => res.json( result ) )
// })

// app.post( '/update', (req,res) => {
//   collection
//     .updateOne(
//       { _id:mongodb.ObjectId( req.body._id ) },
//       { $set:{ name:req.body.name } }
//     )
//     .then( result => res.json( result ) )
// })

app.listen( 3000 )