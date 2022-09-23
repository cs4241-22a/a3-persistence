const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      serveStatic = require('serve-static'),
      timeout = require('connect-timeout'),
      cookieSession = require('cookie-session'),
      responseTime = require('response-time'),
      compression = require('compression'),
      app = express(),
      workouts = []

app.use( express.urlencoded({ extended:true }) )
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(compression())
app.use(responseTime())
app.use( serveStatic( 'views'  ) )
app.use( express.json() )
app.use(timeout('5s'))

// For avoiding Heroku $PORT error
app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

// vvv REMOVE WHEN ADDED TO GLITCH vvv
const USER="Dillon"
const PASS="ba11islife"
const HOST="the-jim.u7npayt.mongodb.net/?retryWrites=true&w=majority"
// ^^^ REMOVE WHEN ADDED TO GLITCH ^^^
const uri = `mongodb+srv://${USER}:${PASS}@${HOST}`

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = client.db( 'TheJim' ).collection( 'Push Day' )
let collection_users = null

// connect to database
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'TheJim' ).collection( 'Push Day' )
  })
  .then( collection => {
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

  client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'TheJim' ).collection( 'Memberships' )
  })
  .then( __collection_users => {
    collection_users = __collection_users
    // blank query returns all documents
    return collection_users.find({ }).toArray()
  })
  .then( console.log )

app.use( (req,res,next) => {
  console.log(`${req.method} ${req.url}`)
  console.log(collection.find({ }).toArray())
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})
  
// route to get all docs
app.get( '/showWorkouts', (req,res) => {
  debugger
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find( {userId: req.session.userId} ).toArray().then( result => res.json( result ) )
  }
})

app.post( '/add', (req,res) => {
  // assumes only one object to insert
  req.body.userId = req.session.userId
  collection.insertOne( req.body ).then( result => res.json( result ) )
  console.log(req.body)
})

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post( '/remove', (req,res) => {
  collection
    .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
    .then( result => res.json( result ) )
})

app.post( '/update', (req,res) => {
  debugger
  collection
    .updateOne(
        { _id:mongodb.ObjectId( req.body._id ) },
        { $set:{ exercise:req.body.exercise, sets:req.body.sets, reps:req.body.reps, weight:req.body.weight } })
    .then( result => res.json( result ) )
})

app.post( '/login', (req,res) => {
  req.session.login = true
  collection_users.findOne({username: req.body.username,
                            password: req.body.password})
  .then(user => {
    console.log(user)
    if(user == null) {
      // username/password incorrect, redirect back to login page
      res.sendFile( __dirname + '/views/index.html' )
    }
    else {
      req.session.login = true
      req.session.userId = user._id
      console.log(req.session.userId + " has successfully logged in")
      res.redirect("main.html")
    }
  })
})

app.post( '/create', (req,res) => {
  if(req.body.captcha === 'on') {
    collection_users.insertOne({username: req.body.username,
                                password: req.body.password,
                                roles: [ "readWrite" ]})
    .then(user => {
      req.session.login = true
      req.session.userId = user.insertedId
      console.log(req.session.userId + " has successfully logged in")
      res.redirect('main.html')
    })
  }
  else {
    res.sendFile( __dirname + '/views/index.html' )
  }
})

app.get( '/logout', (req,res) => {
  req.session.login = false
  req.session.userId = null
  res.redirect('index.html')
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.sendFile( __dirname + '/views/index.html' )
})


app.use( serveStatic( 'public' ) )
