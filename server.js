const express = require("express"),
    app = express(),
    logs = []
// const path = require("path")

app.use(express.static("public"))
app.use(express.static("views"))
app.use(express.json())



app.post( '/submit', (req, res) => {
    console.log(req.body);
    logs.push(req.body)
    collection.insertOne(req.body).then(result => res.json(result))
    // res.writeHead(200, {"Content-Type": "application/json"})
    //
    // res.end(JSON.stringify(logs))
})

// app.get('/', (req, res) => {
//     const cursor = db.collection('Activity Logs').find()
//
// })




const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST + ".edjsrmm.mongodb.net/?retryWrites=true&w=majority";

const uri = "mongodb+srv://admin:admin@a3.edjsrmm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let collection = null

client.connect()
    .then( () => {
        // will only create collection if it doesn't exist
        return client.db( 'A3' ).collection( 'Activity Logs' )
    })
    .then( __collection => {
        collection = __collection;
        // blank query returns all documents
        return collection.find({ }).toArray()
    })
    .then( console.log )

app.get( '/', (req, res) => {
    if (collection !== null){
        collection.find({ }).toArray().then(result => res.json(result))
    }
})


// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });




app.listen( process.env.PORT || 3000 )