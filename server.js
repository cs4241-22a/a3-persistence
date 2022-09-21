const express = require('express')
const cookie = require('cookie-session')
const session = require('express-session')
const mongodb = require('mongodb')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const initializePassport = require('./passport-config')
const app = express()
const test = []
app.set('view engine', 'ejs')
dotenv.config()

// url logger
const logger = (req, res, next) => {
  console.log('url:', req.url)
  next()
}

// database initialized
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
// app.get('/', (req, res) => {
//   if (collection !== null) {
//     // get array and pass to res.json
//     collection.find({}).toArray().then(result => res.json(result))
//   }
// })

// check connection
app.use((req, res, next) => {
  if (collection !== null) {
    next()
  } else {
    res.status(503).send()
  }
})


// --- GLOBAL ---
// must-have middleware functions 
initializePassport(
  passport,
  username => collection.find({ username: 'oliver' }).toArray()
)
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(express.static('views'))
app.use(express.json())
app.use(logger)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//#region Post-Handling example
// app.post( '/submit', (req, res) => {
//   test.push( req.body.newdream )
//   res.writeHead( 200, { 'Content-Type': 'application/json' })
//   res.end( JSON.stringify( test ) )
// })
//#endregion

//#region ejs get method
app.get('/', (req, res) => {
  console.log(req.session)
  res.render('index.ejs')
})

app.get('/register', (req, res) => {
  res.render('register.ejs')
})
//#endregion

//#region handle login
// TODO: message the user when login fail
app.post('/', passport.authenticate('local', {
  successRedirect: '/game.html',
  failureRedirect: '/',
  failureFlash: true
}))

// notify the user with the failure
// app.use(function (req, res, next) {
//   if (req.session.login === true)
//     next()
//   else
//   req.session.login = false
// })
//#endregion


//#region handle database
// register
// TODO: Don't allow duplicate username
app.post('/register', async (req, res) => {
  try {
    const new_username = req.body.new_username
    const hashedPassword = await bcrypt.hash(req.body.new_password, 10)
    const new_win = 0
    const new_loss = 0
    const new_winrate = 0
    // assumes only one object to insert
    collection.insertOne({ username: new_username, password: hashedPassword, win: new_win, loss: new_loss, winrate: new_winrate })
    // if success, redirect to login page
    res.redirect('/')
  } catch {
    // if fail, redirect to register page
    res.redirect('/register')
  }


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