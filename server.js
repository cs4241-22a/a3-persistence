const express = require("express")
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cookie = require('cookie-session')
const hbs = require( 'express-handlebars' ).engine
require('dotenv').config()

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

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

//middleware
app.use(express.static("public"))
app.use(express.json())
app.use( cookie({
    name: 'session',
    keys: [process.env.KEY1, process.env.KEY2]
}))
app.use( (req,res,next) => {
    if( collection !== null ) {
        next()
    }else{
        res.status( 503 ).send()
    }
})
app.use( express.urlencoded({ extended:true }) )
app.use( function( req,res,next) {
    if( req.session.login === true )
        next()
    else
        res.render('login', { msg:'', layout:false })
})

async function createUser(user, password) {
    let user_login = {
        username: user,
        password: password
    }
    await collection.insertOne( user_login )
    return true
}

//login area
app.post( '/login', (req,res)=> {
    const user = req.body.username
    const password = req.body.password
    //check database for user
    collection.find({ $and: [ { password: { $exists: true } }, { username: user } ] }).toArray()
        .then( result => {
            if(result.length === 0) {
                //if not found create new user and login
                createUser(user, password)
                    .then( function() {
                            req.session.login = true
                            //set the username that was successful
                            req.session.username = req.body.username
                            res.redirect( 'index' )
                    })
            } else if(password === result[0].password) { //only one user/password combo should exist for each user
                //good login
                req.session.login = true
                //set the username that was successful
                req.session.username = req.body.username
                res.redirect( 'index' )
            } else {
                //bad login attempt
                // cancel session login in case it was previously set to true
                req.session.login = false
                // password incorrect, send back to login page
                res.render('login', { msg:'login failed, please try again', layout:false })
            }
        })
})

app.get( '/index', ( req, res) => {
    res.render( 'index', {layout:false})
})

app.get( '/', (req,res) => {
    res.render( 'login', { msg:'', layout:false })
})

//db interaction

app.post( '/submit', express.json(), (req, res) => {
    const data = req.body
    //add new data to db if not a clear or update call
    //add the username of the current session user to this data
    data.username = req.session.username
    collection.insertOne( req.body )
        .then( result => res.json( result ) )
})

app.post( '/update', express.json(), (req, res) => {
    //simply do nothing; server just sends back the data it has for a given user
    const user = req.session.username
    collection.find({ $and: [ { name: { $exists: true } }, { username: user } ] }).toArray()
        .then( result => res.json( result ) )
})

app.post( '/clear', express.json(), (req,res) => {
    // assumes only one object to insert
    const user = req.session.username
    collection.deleteMany({ $and: [ { name: { $exists: true } }, { username: user } ] })
        .then( result => res.json( result ) )
})

app.listen(process.env.PORT || 3000)
