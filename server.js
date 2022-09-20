const express = require("express")
const app = express()
const mongodb = require('mongodb')
require('dotenv').config()


app.use(express.static('public'))
app.use(express.static('views'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//MONGO DB
const uri = 'mongodb+srv://'+process.env.ADMIN+':'+process.env.PASS+'@'+process.env.HOST
const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'XXXtest' ).collection( 'XXXtodos' )
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

//check connection
app.use( (req,res,next) => {
    if( collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
  })

//
app.listen(3000)