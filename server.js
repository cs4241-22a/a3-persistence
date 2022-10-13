const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      cookie  = require( 'cookie-session' ),
      bodyParser  = require( 'body-parser' ),
      timeout  = require( 'connect-timeout' ),
      response  = require( 'response-time' ),
      hbs  = require( 'express-handlebars' ).engine,
      app = express()

app.use( express.static('public') )
app.use(express.static('views'));
app.use( express.json() )
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

require('dotenv').config()

// app.use( express.urlencoded({ extended:true }) )

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1 })
let collection = null
let curUsername = null

client.connect()
  .then( () => client.db( 'Assignment4' ).collection( 'gameHold' ) )
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
  })
  .then( console.log )

  app.use( (req,res,next) => {
    if( collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
  })

  app.use( cookie({
    name: 'session',
    keys: ['59765', '26438']
  }))

  //pages
app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})
  

app.post('/login', async function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  const acceptPassword = await collection.findOne({"username": username})
  if (acceptPassword.password === password ) {
    req.session.login = true
    curUsername = username
    res.redirect('form');
  }

  else {
    req.session.login = false
    res.render('index', { msg:'Login failed', layout:false})
  }
})

//middleware
app.use( function( req, res, next) {
  if(req.session.login === true)
    next()
  else
    res.render('index', {msg:'Login failed', layout:false})
})

app.get( '/form', async ( req, res) => {
  const result = await collection.findOne({"username": curUsername})

  if( result !== null ) { 
    const games = result.games
    res.render('form', { array:games, layout:false })
  }
})

//add to database
app.post( '/add', async (req,res) => {
  const data = await collection.findOne({"username": curUsername})
  let gameCount = data.count + 1
  const json = {
    "gameCount": gameCount,
    "name": req.body.name,
    "useremail": req.body.useremail,
    "gameTitle": req.body.gameTitle, 
    "gameSystem": req.body.gameSystem, 
    "currentDate": req.body.currentDate,
  } 

  let gameArray = data.games
  gameArray.push(json)
  // console.log(gameArray)
  await collection.updateOne(
    {"username": curUsername},
    { $set: {"games": gameArray}},
  )
  await collection.updateOne(
    {"username": curUsername},
    { $set: {"count": gameCount}}
  )

  const result = await collection.findOne({"username": curUsername})

  if( result !== null ) { 
    const games = result.games
    res.render('form', { array:games, layout:false })
  }
})

//remove from database
app.post( '/remove', async (req,res) => {
  const data = await collection.findOne({"username": curUsername})
  let gameArray = data.games
  let gameCount = data.count - 1
  let updatedArray = []

  for (let i = 0; i < gameArray.length; i++) {
    if (i+1 < req.body.gameID) {
      updatedArray.push(gameArray[i])
    }
    else if (i+1 > req.body.gameID) {
      let id = gameArray[i].gameID - 1
      gameArray[i].gameID = id
      updatedArray.push(gameArray[i])
    }
  }

  await collection.updateOne(
    {"username": curUsername}, 
    {$set: {"games": updatedArray}}
  )

  await collection.updateOne(
    {"username": curUsername},
    { $set: {"count": gameCount}}
  )

  const result = await collection.findOne({"username": curUsername})

  if( result !== null ) { 
    const games = result.games
    res.render('form', { array:games, layout:false })
  }
})

//modify database
app.post( '/modify', async (req,res) => {
  const data = await collection.findOne({"username": curUsername})
  console.log(data)
  let gameArray = data.games
  let updateArray = []
  const json = {
    "gameCount": req.body.gameID,
    "name": req.body.name,
    "useremail": req.body.useremail,
    "gameTitle": req.body.gameTitle, 
    "gameSystem": req.body.gameSystem, 
    "currentDate": req.body.currentDate,
  } 

  const updatedGame = json
  const requestedID = parseInt(req.body.gameID)

  gameArray.forEach((elem, index) => {
    let elemIDNum = parseInt(elem.gameCount)
    if (elemIDNum === requestedID) {
      updateArray.push(updatedGame)
    }
    else {
      updateArray.push(elem)
    }
  })

  await collection.updateOne(
    {"username": curUsername}, 
    {$set: {"games": updateArray}}
  )

  const result = await collection.findOne({"username": curUsername})

  if( result !== null ) { 
    const games = result.games
    res.render('form', { array:games, layout:false })
  }
})


// app.listen( 3000 )
// console.log("server listening at port 3000");