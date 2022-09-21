const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      cookie  = require( 'cookie-session' ),
      hbs     = require( 'express-handlebars' ).engine,
      app     = express(),
      logins = []

app.use( express.static('public') )
app.use( express.json() )

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']  //change keys?
}))

app.post( '/login', (req,res)=> {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  console.log( req.body )
  
  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
  if( logins.includes(req.body.username)) {
     if (logins[req.body.username] === req.body.password) {
      req.session.login = true
    }
    // since login was successful, send the user to the main content
    // use redirect to avoid authentication problems when refreshing
    // the page or using the back button, for details see:
    // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
    res.redirect( 'main.html' )
  } else {
    // cancel session login in case it was previously set to true
    req.session.login = false
    // password incorrect, send back to login page
    res.render('index', { msg:'login failed, please try again', layout:false })
  }
})

app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('index', { msg:'login failed, please try again', layout:false })
})

app.get( '/main.html', ( req, res) => {
    res.render( 'main', { msg:'success you have logged in', layout:false })
})

const create_account = (req, res) => {
  let dataString = ''
  
  req.on('data', function( data ) {
    dataString += data
  })
  
  req.on('end', function() {
    const json = JSON.parse( dataString )
    logins.push(json)
  })
}

app.get( '/newAccount', (req, res) => {
  res.redirect( 'createNewAccount.html' )
})


const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+'/?retryWrites=true&w=majority'

const client = new MongoClient( uri, { useNewURLParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1 })
let collection = null

client.connect()
  .then( () => {
    return client.db( 'a3-assignment' ).collection( 'library' )
  
  })
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
  })
  .then( console.log )

app.get( '/', (req,res) => {
  if( collection !== null ) {
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

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

app.post( '/remove', (req,res) => {
  collection
    .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
    .then( result => res.json( result ) )
})

app.post( '/update', (req,res) => {
  collection
    .updateOne(
      { _id:mongodb.ObjectId( req.body._id ) },
      { $set:{ title:req.body.title } },
      { $set:{ author:req.body.author } },
      { $set:{ acquriedDate:req.body.acquiredDate } },
      { $set:{ readYet:req.body.readYet } }
    )
    .then( result => res.json( result ) )
})

app.listen( 3000 )