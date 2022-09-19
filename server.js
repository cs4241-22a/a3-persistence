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
    res.writeHead(200, {"Content-Type": "application/json"})

    res.end(JSON.stringify(logs))
})





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@a3.edjsrmm.mongodb.net/?retryWrites=true&w=majority";
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


// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });




app.listen( process.env.PORT || 3000 )