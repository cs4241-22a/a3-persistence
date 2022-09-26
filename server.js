const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      cookie  = require( 'cookie-session' ),
      hbs     = require( 'express-handlebars' ).engine,
      app     = express()

app.use( express.static('public') )
app.use( express.json() )
require('dotenv').config()

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@'+process.env.HOST+'/?retryWrites=true&w=majority'
console.log(uri)

const client = new MongoClient( uri, { useNewURLParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1 })
let loginsCollection = null
let currentUser = null

//connect to database and grab logins collection
client.connect() 
  .then( () => {
    return client.db( 'a3-assignment' ).collection( 'logins' )
})
  .then( __collection => {
    loginsCollection = __collection
    return loginsCollection.find({ }).toArray()
})


app.use( (req,res,next) => {
  if( loginsCollection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']  //change keys?
}))

//gets for pages
app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})

app.get( '/createNewAccount', ( req, res) => {
  res.render( 'createNewAccount', { msg:'', layout:false })
})


//create new account
app.post( '/createNewAccount', async (req,res) => {
  const avail = await loginsCollection.findOne({"username": {$regex : req.body.username}})
  if (avail === null) { 
    let books = []
    const json = {
      "_id": req.body._id,
      "username": req.body.username,
      "password": req.body.password,
      "books": books,
      "count": 0
    }
    await loginsCollection.insertOne( json )
    console.log(avail)
    res.redirect("/")
  }
  else {
    res.render('createNewAccount', { msg:'That username already exists. Please try again.', layout:false })
  }
})

//login post
app.post( '/login', async (req,res)=> {
  const inputtedPassword = req.body.password
  const acceptablePassword = await loginsCollection.findOne({"username": req.body.username})
  if(acceptablePassword !== null && inputtedPassword === acceptablePassword.password ) {
    req.session.login = true
    currentUser = req.body.username
    res.redirect( 'main' )
  } else {
    // cancel session login in case it was previously set to true
    req.session.login = false
    currentUser = null
    // password incorrect, send back to login page
    res.render('index', { msg:'login failed, please try again', layout:false })
  }
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res, next) {
  if( req.session.login === true)
    next()
  else
    res.render('index', { msg:'login failed, please try again', layout:false })
})

app.get( '/main', async (req,res) => {
  const result = await loginsCollection.findOne({"username": currentUser})
  console.log(result)
  if( result !== null ) { 
    const books = result.books
    console.log(books)
    res.render('main', { array:books, layout:false })
  }
})

// Add to the database!

app.post( '/addBook', async (req,res) => {
  const userInfo = await loginsCollection.findOne({"username": currentUser})
  let bookCount = userInfo.count + 1
  const json = {
    "bookID": bookCount,
    "title": req.body.title, 
    "author": req.body.author, 
    "acquiredDate": req.body.acquiredDate,
    "readYet": req.body.readYet
  }
  let bookArray = userInfo.books
  bookArray.push(json)
  console.log(bookArray)
  await loginsCollection.updateOne(
    {"username": currentUser},
    { $set: {"books": bookArray}},
  )
  await loginsCollection.updateOne(
    {"username": currentUser},
    { $set: {"count": bookCount}}
  )

  const result = await loginsCollection.findOne({"username": currentUser})

  if( result !== null ) { 
    const books = result.books
    res.render('main', { array:books, layout:false })
  }
  })

  // Remove from the database!

app.post( '/removeBook', async (req,res) => {
  const userInfo = await loginsCollection.findOne({"username": currentUser})
  let bookArray = userInfo.books
  let bookCount = userInfo.count - 1
  let newBookArray = []

  bookArray.forEach((elem, index) => {
    if (index+1 === req.body.bookID) {}
    else if (index+1 < req.body.bookID) {
      newBookArray.push(elem)
    }
    else if (index+1 > req.body.bookID) {
      let newID = elem.bookID - 1
      elem.bookID = newID
      newBookArray.push(elem)
    }
  })

  await loginsCollection.updateOne(
    {"username": currentUser}, 
    {$set: {"books": newBookArray}}
  )

  await loginsCollection.updateOne(
    {"username": currentUser},
    { $set: {"count": bookCount}}
  )

  const result = await loginsCollection.findOne({"username": currentUser})

  if( result !== null ) { 
    const books = result.books
    res.render('main', { array:books, layout:false })
  }
})

// Edit the database!

app.post( '/editBook', async (req,res) => {
  const userInfo = await loginsCollection.findOne({"username": currentUser})
  let bookArray = userInfo.books
  let newBookArray = []
  const json = {
    "bookID": req.body.bookID,
    "title": req.body.title,
    "author": req.body.author,
    "acquiredDate": req.body.acquiredDate,
    "readYet": req.body.readYet
  }

  const updatedBook = json
  const requestedID = parseInt(req.body.bookID)

  bookArray.forEach((elem, index) => {
    let elemIDNum = parseInt(elem.bookID)
    if (elemIDNum === requestedID) {
      newBookArray.push(updatedBook)
    }
    else {
      newBookArray.push(elem)
    }
  })

  await loginsCollection.updateOne(
    {"username": currentUser}, 
    {$set: {"books": newBookArray}}
  )

  const result = await loginsCollection.findOne({"username": currentUser})

  if( result !== null ) { 
    const books = result.books
    res.render('main', { array:books, layout:false })
  }
})

app.listen( 3000 )