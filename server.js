const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      serveStatic = require('serve-static'),
      timeout = require('connect-timeout'),
      cookieSession = require('cookie-session'),
      responseTime = require('response-time'),
      compression = require('compression'),
      app = express(),
      workouts = []

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(compression())
app.use(responseTime())
app.use( serveStatic( 'public' ) )
app.use( serveStatic( 'views'  ) )
app.use( express.json() )
app.use(timeout('5s'))

// vvv REMOVE WHEN ADDED TO GLITCH vvv
const USER="Dillon"
const PASS="ba11islife"
const HOST="the-jim.u7npayt.mongodb.net/?retryWrites=true&w=majority"
// ^^^ REMOVE WHEN ADDED TO GLITCH ^^^
const uri = `mongodb+srv://${USER}:${PASS}@${HOST}`

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = client.db( 'TheJim' ).collection( 'Push Day' )

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

  // Alternative way to connect using async and away rather than promises
  // const connect = async function() {
  //   await client.connect()
  //   const collection = await client.db( 'TheJim' ).collection( 'Push Day' )
  //   const results = await collection.find({ }).toArray()
  //   console.log( results )
  // }

app.use( (req,res,next) => {
  console.log(`${req.method} ${req.url}`)
  console.log(collection.find({ }).toArray())
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})
  
const middleware_post = ( req, res, next ) => {
  debugger
  console.log("Middlware post")
  let dataString = ''

  req.on( 'data', function( data ) {
    dataString += data 
  })

  req.on( 'end', function() {
    const json = JSON.parse( dataString )
    workouts.push( json )

    // add a 'json' field to our request object
    // this field will be available in any additional
    // routes or middleware.
    req.json = JSON.stringify( workouts )

    // advance to next middleware or route
    next()
  })
}

// app.use( middleware_post )

const middleware_get = ( res, next) => {
  console.log("Middleware get")
  console.log(client.db( 'TheJim' ).collection( 'Push Day' ))
  return client.db( 'TheJim' ).collection( 'Push Day' )
}

// app.use(middleware_get)
  
// route to get all docs
app.get( '/showWorkouts', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

app.post( '/add', (req,res) => {
  // assumes only one object to insert
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
  
app.listen( 3000 )