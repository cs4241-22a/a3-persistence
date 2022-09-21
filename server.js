const express = require( 'express' ),
    mongodb = require( 'mongodb' ),
    cookie = require('cookie-session'),
    path = require('path'),
    favicon = require('serve-favicon')
    app = express()
require('dotenv').config()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use( express.static('public') )
app.use( express.static('views'))
app.use( express.json() )

const uri = 'mongodb+srv://'+process.env.USERNAME+':'+process.env.PASSWORD+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

app.use( cookie({
    name: 'session',
    keys: ['key1', 'key2']
}))

client.connect()
    .then( () => {
        // will only create collection if it doesn't exist
        return client.db( 'ClimbTracker' ).collection( 'users' )
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

app.listen( 3069 )

app.use( (req,res,next) => {
    if( collection !== null ) {
        next()
    }else{
        res.status( 503 ).send()
    }
})

app.post( '/add', (req,res) => {
    // assumes only one object to insert
    collection.insertOne( req.body ).then( result => res.json( result ) )
})

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post( '/remove', (req,res) => {
    collection
        .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
        .then( result => res.json( result ) )
})

app.post( '/update', (req,res) => {
    collection
        .updateOne(
            { _id:mongodb.ObjectId( req.body._id ) },
            { $set:{ name:req.body.name } }
        )
        .then( result => res.json( result ) )
})

app.post( '/login', (req,res) => {
    console.log(req.body.username)
    collection
        .find({username: req.body.username, password: req.body.password})
        .toArray()
        .then( result => {
            if (result.length < 1) {
                const emptyUser = {
                    username: req.body.username,
                    password: req.body.password,
                    climbs: []
                }
                req.session.username = req.body.username
                req.session.login = true
                collection.insertOne(emptyUser)
            }
        } ).then( result => res.json( result ) )
})

app.post('/addClimb', (req, res) => {
    collection
        .find({username: req.session.user })
        .toArray()
        .then(result => {
            const climbs = result[0].climbs;
            console.log(climbs)
            climbs.push({
                climbName: req.body.climbName,
                grade: req.body.grade,
                height: req.body.height
            });

            //From given update to update the array of climbs
            collection.updateOne(
                {_id:mondgodb.ObjectId(result[0]._id)},
                { $set:{ climbs: climbs } }
            )
            res.json(climbs)
        })
})