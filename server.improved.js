const express = require('express'),
    mongodb = require('mongodb'),
    cookie = require('cookie-session'),
    app = express()


app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(express.json())
app.set('trust proxy', 1)
app.use(cookie({
    name: 'session',
    keys:["key1","key2"]
}))
// app.get( '/', ( req, res ) => res.send( 'test') )


const { MongoClient, ServerApiVersion } = require('mongodb');
const {response} = require("express");
const uri = "mongodb+srv://test:test@a3-persistence.nraftwq.mongodb.net/?retryWrites=true&w=majority";
//const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let collection = null
let id
let session

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
app.get( '/currentdb', (req,res) => {
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
    collection.deleteOne(req.body).then(result => res.json(result))
})
app.post('/edit',(req,res)=>{
    collection.findOne(req.body).then(result => {
        const body = res.json(result)
        id = body
    })
})
app.post('/login',(req,res)=>{
    if( req.body.password === 'test' ) {
        session = req.session.login
        // define a variable that we can check in other middleware
        // the session object is added to our requests by the cookie-session middleware
        req.session.login = true
        req.session.name = "user1"
        req.session.keys =["test","test"]


        // since login was successful, send the user to the main content
        // use redirect to avoid authentication problems when refreshing
        // the page or using the back button, for details see:
        // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern
        if(!req.session.name){
            console.log("User soesnt exist")
        }else{
            res.redirect( 'login.html' )
        }

    }else {
        // cancel session login in case it was previously set to true
        session = false
        // password incorrect, send back to login page
        res.sendFile(__dirname + '/public/index.html')
    }
})
app.use( function( req,res,next) {
    if( session === true )
        next()
    else
        res.render('index', { msg:'login failed, please try again', layout:false })
})

app.get( '/main.html', ( req, res) => {
    res.render( 'main', { msg:'success you have logged in', layout:false })
})

// add some middleware that always sends unauthenicaetd users to the login page


    app.post('/save',(req,res)=>{
        console.log(id)
        // collection.updateOne(
        //     {"_id" : id},
        //     {$set: {
        //             Task: req.body.Task,
        //             Date: req.body.Date,
        //             Priority: req.body.Priority
        //         }}
        // )
    })


    app.listen( process.env.HOST || 3000 )