const http = require( 'http' ),
      fs   = require( 'fs' ),
      express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      cookie = require( 'cookie-session' ),
      hbs   = require( 'express-handlebars' ).engine,
      app = express(),
      mime = require( 'mime' ),
      dir  = 'public/'

app.use( express.static('public') )
app.use( express.static('views') )
app.use( express.json() )

app.use( express.urlencoded({ extended:true }) )

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})


//---------------------------------- create middleware -----------------------------------

// cookie middleware! The keys are used for encryption and should be changed
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.post( '/login', (req,res)=> { 
  //console.log( req.body )
  
  if( req.body.password === 'test') {
    // define a variable that we can check in other middleware
    req.session.login = true
    
    res.redirect( 'main.html' )
  }else{
    // cancel session login in case it was previously set to true
    req.session.login = false
    // password incorrect, send back to login page
    res.sendFile( __dirname + '/public/index.html' )  //just added may have error
    res.render('index', { msg:'login failed, please try again', layout:false })
  }
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


//--------------- set up mongodb -----------------

//const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
const uri = "mongodb+srv://cs4241a2:XcncWk@cluster0.xdwkoc5.mongodb.net/?retryWrites=true&w=majority";

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => client.db( 'database1' ).collection( 'a3Music' ) )
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
  })
  .then( console.log )

//route to get all docs DELETE THIS
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

//add item
app.post( '/add', (req,res) => {
  // assumes only one object to insert
  //console.log("in add function: ", req.body)
  collection.insertOne( req.body )
})

//delete item
app.post( '/delete', (req,res) => {
  console.log("id: ", mongodb.ObjectId( req.body._id ))
  collection
    .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
})

app.listen( 3000 )
