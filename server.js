const express = require('express'),
  cookie = require('cookie-session'),
  mongodb = require('mongodb'),
  dotenv = require('dotenv'),
  app = express(),
  test = []

// url logger
const logger = (req, res, next) => {
  console.log('url:', req.url)
  next()
}

// --- GLOBAL ---
// must-have middleware functions 
dotenv.config()
app.set('view-engine', ejs)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'))
app.use(express.json())
app.use(logger)
app.use(cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

//#region Post-Handling example
// app.post( '/submit', (req, res) => {
//   test.push( req.body.newdream )
//   res.writeHead( 200, { 'Content-Type': 'application/json' })
//   res.end( JSON.stringify( test ) )
// })
//#endregion

//#region handle login
// TODO: message the user when login fail
app.post('/login', (req, res) => {

  // DEBUG: checking input
  console.log(req.body)

  // TODO: check the username and password in database
  if (req.body.password === 'test') {

    req.session.login = true

    res.redirect('game.html')
  } else {

    res.sendFile(__dirname + '/views/index.html')
  }
})

app.use(function (req, res, next) {
  if (req.session.login === true)
    next()
  else
    res.sendFile(__dirname + '/views/index.html')
})
//#endregion


//#region handle database
const uri = 'mongodb+srv://' + process.env.USER + ':' + process.env.PASS + '@' + process.env.HOST

const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let collection = null

client.connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db('RPS').collection('Player')
  })
  .then(__collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({}).toArray()
  })
  .then(console.log)

// route to get all docs
app.get('/', (req, res) => {
  if (collection !== null) {
    // get array and pass to res.json
    collection.find({}).toArray().then(result => res.json(result))
  }
})

// check connection
app.use((req, res, next) => {
  if (collection !== null) {
    next()
  } else {
    res.status(503).send()
  }
})

// register
app.post('/register', (req, res) => {
  const new_username = req.body.new_username
  const new_password = req.body.new_password
  const new_win = 0
  const new_loss = 0
  const new_winrate = 0
  // assumes only one object to insert
  collection.insertOne({username: new_username, password: new_password, win: new_win, loss: new_loss, winrate: new_winrate}).then(result => res.json(result))
})

// deleting
app.post('/remove', (req, res) => {
  collection
    .deleteOne({ _id: mongodb.ObjectId(req.body._id) })
    .then(result => res.json(result))
})

// updating
app.post('/update', (req, res) => {
  collection
    .updateOne(
      { _id: mongodb.ObjectId(req.body._id) },
      { $set: { name: req.body.name } }
    )
    .then(result => res.json(result))
})

//#endregion


app.listen(process.env.PORT || 3000)