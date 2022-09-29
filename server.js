require("dotenv").config()

const express = require("express"),
      mongodb = require("mongodb"),
      cookie  = require("cookie-session"),
      favicon = require("serve-favicon"),
      app = express()

app.use(favicon(__dirname + "/public/favicon.ico"))
app.use( express.urlencoded({ extended:true }) )
app.use(express.static("public"))
app.use(express.static("views"))
app.use(express.json())

app.use( cookie({
    name: "session",
    keys: ["key-1234", "key-5678"]
}))

const uri = "mongodb+srv://" + process.env.USERNAME + ":" + process.env.PASS + "@" + process.env.HOST

const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let collection = null
let newUser = false

client.connect()
.then(() => {
    // will only create collection if it doesn't exist
    return client.db("a3").collection("data")
})
.then(__collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
})

// route to get all docs
app.post( '/docs', (req, res) => {
    if (collection !== null) {
        // get array and pass to res.json
        collection.find({user: req.session.username}).toArray().then(result => { res.json(result) })
    }
})

app.post( '/user', (req, res) => {
    res.json({username: req.session.username, newUser: newUser})
    if (newUser) {
        newUser = false
    }
})

app.get( '/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.use((req, res, next) => {
    if( collection !== null ) {
        next()
    } else {
        res.status( 503 ).send()
    }
})

app.post( '/add', (req, res) => {
    // assumes only one object to insert
    req.body.user = req.session.username
    collection.insertOne( req.body ).then( result => res.json( result ) )
})

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post( '/remove', (req, res) => {
    collection
    .deleteOne({ _id: mongodb.ObjectId( req.body._id ) })
    .then( result => res.json( result ) )
})

app.post( '/update', (req, res) => {
    collection
    .updateOne(
        { _id: mongodb.ObjectId( req.body._id ) },
        { $set:{ task: req.body.task, category: req.body.category, deadline: req.body.deadline, priority: req.body.priority} }
    )
    .then( result => res.json( result ) )
})

app.post( '/login', (req, res) => {
    collection.find({username: req.body.username})
    .toArray()
    .then(result => {
        req.session.username = req.body.username
        req.session.password = req.body.password
        if (result.length > 0) {
            if (req.body.password === result[0].password) {
                req.session.login = true
                newUser = false
                res.redirect("todo.html")
            } else {
                res.sendFile(__dirname + "/views/index.html")
            }
        } else {
            collection.insertOne( req.body )
            newUser = true
            res.redirect("todo.html")
        }
    })
})

app.listen(process.env.PORT || 3000)
