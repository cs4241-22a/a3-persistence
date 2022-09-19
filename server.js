const express = require("express"),
    app = express(),
    logs = []

const cookie = require("cookie-session")

app.use(express.static("public"))
app.use(express.static("views"))
app.use(express.json())

app.use( cookie({
    name: 'session',
    keys: ['testkey1', 'testkey2']
}))



app.post( '/submit', (req, res) => {

    let newLog = (req.body);
    newLog.user = req.session.user;
    logs.push(req.body)
    console.log(collection);
    client.db("A3").collection("Activity Logs").insertOne(req.body).then(result => res.json(result))

})

app.post('/login', (req, res) => {
    // console.log(collection);
    // collection.insertOne(req.body).then(result => res.json(result));
    client.db("A3").collection("Activity Logs").deleteMany({});
    let query = (req.body);
    console.log(query)
    client.db("A3").collection("accounts").find(query).toArray(function(err, result) {
        if (err) throw err;
        if (result.length > 0){
            // req.session.login = true;
            req.session.user = req.body.user;
            res.redirect("main.html");

        }
        else{
            // req.session.login = false;
            res.redirect("index.html");

        }
    });

})

app.post('/signUp', (req, res) => {
    client.db("A3").collection("accounts").insertOne(req.body)

})

app.get('/starting', (req, res) => {
    // res.writeHead(200, {"Content-Type": "application/json"})
    // res.json();
    // console.log(JSON.stringify(client.db("A3").collection("Activity Logs").find().toArray()))
    (client.db("A3").collection("Activity Logs").find({ }).toArray()).then(result => res.json(result)) //.then(result => res.json(result))
})




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
    // .then( () => {
    //     return client.db('A3').collection('accounts');
    // })
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