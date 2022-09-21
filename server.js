const express = require("express")
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

app.use(express.static("public"))
app.use(express.json())

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+'/?retryWrites=true&w=majority'

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
let collection = null

//connect to the db
client.connect()
    .then( () => {
        // will only create collection if it doesn't exist
        return client.db( 'a3' ).collection( 'main' )
    })
    .then( __collection => {
        // store reference to collection
        collection = __collection
        // blank query returns all documents
    })

app.use( (req,res,next) => {
    if( collection !== null ) {
        next()
    }else{
        res.status( 503 ).send()
    }
})


app.post( '/submit', express.json(), (req, res) => {
    const data = req.body
        //add new data to db if not a clear or update call
    collection.insertOne( req.body )
        .then( result => res.json( result ) )
})

app.post( '/update', express.json(), (req, res) => {
    //simply do nothing; server just sends back the data it has
    collection.find({ name: { $exists: true } }).toArray()
        .then( result => res.json( result ) )
})

app.post( '/clear', express.json(), (req,res) => {
    // assumes only one object to insert
    collection.deleteMany({ name: { $exists: true } })
        .then( result => res.json( result ) )
})


app.listen(process.env.PORT || 3000)
