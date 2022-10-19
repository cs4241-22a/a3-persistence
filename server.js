require('dotenv').config()
var bodyParser = require('body-parser')
var responseTime = require('response-time')
var path = require('path');
var timeout = require('connect-timeout')
// https://expressjs.com/en/api.html#req.params

const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      cookie  = require( 'cookie-session' ),
      app = express()

app.use( express.static('public') )
app.use( express.json() )
app.use(responseTime())
var favicon = require('serve-favicon')
app.use(stopOnTimedout)

//collection references the user data
let collection = null
let loginCollection = null

const uri = 'mongodb+srv://testuser:123@cluster0.rutvhl6.mongodb.net/?retryWrites=true&w=majority'

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
app.set('view engine', 'ejs')

client.connect()
  .then( () => {
    return client.db( 'stuffOnWebsite' ).collection( 'collectionOnWebsite' )
  })
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
  })
  .then( result  => {
    console.log(result)
    return client.db( 'userLoginData' ).collection( 'loginCollection' )
  })
  .then(__collection =>{
    loginCollection = __collection
    return loginCollection.find({ }).toArray()
  })
  .then(console.log)

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use( cookie({
  name: 'session',
  httpOnly: false,
  keys: ['2BC8A4CE1F2945C4BAC1A8F4A6F9F', '91A615FD2C1FC96DDEF4DF1DA279F'],
  maxAge: 1000 * 30 * 24 * 60 * 60,
  }))

  app.post( '/login', (req,res)=> {
    console.log("login request:" + req.body.username)

    if(client.db( 'userLoginData' ).collection( 'loginCollection' ).findOne({ username:req.body.username})) {

      req.session.login = true

      res.redirect( 'main' )
    }else{
      res.sendFile( __dirname + '/index.html' )
    }
  })
  


app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
      res.sendFile( __dirname + '/index.html' )
})
  
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

 app.get( '/', (req,res) => {
  if( req.session.login === true )
  res.redirect( 'main' )
  else
    res.sendFile( __dirname + '/index.html' )
 })


app.get( '/main', (req,res) => {
  if( collection !== null ) {
    collection.find({ }).toArray().then( result => res.render('index.ejs', {dataFromMongo: result}) )
  }
})

app.post( '/add', (req,res) => {
    console.log("body:" + JSON.stringify(req.body))
    collection.insertOne( req.body )
    res.redirect( 'main' )
})
  
app.post( '/update', (req,res) => {
  collection
    .updateOne(
      { _id:mongodb.ObjectId( req.body._id ) },
      { $set:{ content:req.body.newContent } }
    )
    res.redirect( 'main' )
})

app.post( '/remove', (req,res) => {
  console.log("body:" + JSON.stringify(req.body))
  collection.deleteOne({ _id:mongodb.ObjectId(req.body._id )});
  res.redirect( 'main' )
})


function stopOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

app.listen( 3000 )






