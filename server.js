

const express = require( 'express' ),
      mongodb = require( 'mongodb' )
      cookie = require ( 'cookie-session' ),
      favicon = require('serve-favicon'),
      app = express()

require('dotenv').config()

app.use(express.static('public'))
app.use(express.json())
app.use(favicon(__dirname + '/public/favicon.ico'))

const uri = 'mongodb+srv://'+process.env.USER_NAME+':'+process.env.PASSWORD+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null
let loggedIn = false
let loggedInUser = ""
let objectId = ""
let itemId = 0
let newUser = false

client.connect()
  .then( () => {
    return client.db( 'Test' ).collection( 'DataTest' )
  })
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
  })

app.use(express.urlencoded({extended:true}))

app.use( cookie({
  name: 'session',
  keys: ['key32423432543', 'key32429932543']
}))

app.post( '/login', (req,res)=> {
  let seen = false

  client.db( 'Test' ).collection( 'DataTest' ).find().forEach(element => {
    if (element.username === req.body.username && element.password === req.body.password) {
      //if the account exists and username and password are correct, redirect to main.html
      seen = true
      loggedIn = true
      newUser = false
      loggedInUser = element.username
      objectId = element._id
      element.data.forEach(item => {
        if (item.id >= itemId) itemId = item.id + 1
      })
      res.redirect( 'main.html' )
    } else if (element.username === req.body.username && element.password !== req.body.password) {
      //if the username matches an existing account but the password is wrong, send back to login screen
      seen = true
      // password incorrect, redirect back to login page
      res.sendFile( __dirname + '/public/index.html' )
    }
  })
  .then( function( e ) {
    if (!seen) {
      //if the username is not recognized in the database, a new account with that 
      //username and password will be created
      req.body.data = []
      collection.insertOne( req.body ).then (result => objectId = result.insertedId)
      .then (function (e) {
        loggedIn = true
        newUser = true
        loggedInUser = req.body.username
        res.redirect( 'main.html' )
      }) 
    }
  })
})

// route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

app.use((err, req, res, next) => {
  app.use(errorhandler(err))
})

function compare( a, b ) {
  if ( a.date < b.date ){
    return -1;
  }
  if ( a.date > b.date ){
    return 1;
  }
  return 0;
}

app.post( '/', express.json(), ( req, res ) => {
  let userdata = []
  client.db( 'Test' ).collection( 'DataTest' ).find().forEach(element => {
    if (element.username === loggedInUser) {
      userdata = element.data
    }
  })
  .then (function (e) {
    userdata.push(newUser)
    newUser = false
    res.writeHead( 200, { 'Content-Type': 'application/json'})
    res.end( JSON.stringify(userdata) )

  })
})

app.post( '/submit', express.json(), ( req, res ) => {
  let userdata = []
  client.db( 'Test' ).collection( 'DataTest' ).find().forEach(element => {
    if (element.username === loggedInUser) {
      userdata = element.data
    }
  })
  .then (function (e) {
    req.body.id = itemId
    itemId++

    userdata.push(req.body)
    
    userdata.sort( compare );
  
    //update collection
    collection.updateOne({ _id:mongodb.ObjectId( objectId ) }, { $set:{ data:userdata } })
    .then (function (e) {
      res.writeHead( 200, { 'Content-Type': 'application/json'})
      res.end( JSON.stringify(userdata) )
    })
  })
})

app.post( '/save', express.json(), ( req, res ) => {
  let userdata = []
  client.db( 'Test' ).collection( 'DataTest' ).find().forEach(element => {
    if (element.username === loggedInUser) {
      userdata = element.data
    }
  })
  .then (function (e) {
    userdata.forEach( (item, i) => {
      if (item.id === req.body.id) {
        item.item = req.body.item
        item.date = req.body.date
        item.priority = req.body.priority
      }
    })
    userdata.sort( compare );
    //update collection
    collection.updateOne({ _id:mongodb.ObjectId( objectId ) }, { $set:{ data:userdata } })
    .then (function (e) {
      res.writeHead( 200, { 'Content-Type': 'application/json'})
      res.end( JSON.stringify(userdata) )
    })
  })
})

app.post( '/delete', ( req, res ) => {
  let userdata = []
  client.db( 'Test' ).collection( 'DataTest' ).find().forEach(element => {
    if (element.username === loggedInUser) {
      userdata = element.data
    }
  })
  .then (function (e) {
    userdata.forEach( (item, i) => {
      if (item.id === req.body.id) {
        userdata.splice(i, 1)
      }
    })
    //update collection
    collection.updateOne({ _id:mongodb.ObjectId( objectId ) }, { $set:{ data:userdata } })
    .then (function (e) {
      res.writeHead( 200, { 'Content-Type': 'application/json'})
      res.end( JSON.stringify(userdata) )
    })
  })
})

app.listen( process.env.PORT || 3000 )
