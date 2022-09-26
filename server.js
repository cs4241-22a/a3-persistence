//installed packages
const express = require("express"),
  app = express(),
  mongodb = require('mongodb'),
  bodyParser = require('body-parser'),
  cookie = require('cookie-session')

require('dotenv').config()

app.set('view-engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('views'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// cookie middleware! The keys are used for encryption and should be
// changed
app.use(cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))


//listen to port
app.listen(3000)


//ROUTES
//
app.get('/', async (req, res) => {
  if (req.session.login === true) {
    const username = req.session.name
    console.log(req.session)
    console.log(req.session.name)
    let todos = await todoCollection.find({ name: username }).toArray()
    res.render('index.ejs', { name: username, results: todos })
  } else {
    res.render('./login.ejs', { msg: 'user will be created, if it is not found.' })
  }
})

app.post('/edit', async (req, res) => {
  const name = req.body.name
  const oldValue = req.body.oldValue
  const todo = req.body.edited
  const save = req.body.save
  const del = req.body.delete

  if (del === undefined) {
    await todoCollection.updateOne({ name: name, 'new-task-input': oldValue },
      { $set: { name: name, 'new-task-input': todo } })
  } else if (save === undefined) {
    await todoCollection.deleteOne({ name: name, 'new-task-input': oldValue })
  }
  let todos = await todoCollection.find({ name: name }).toArray()
  res.render('index.ejs', { name: name, results: todos })
})

app.get('/login', async (req, res) => {
  if (req.session.login === true) {
    const username = req.session.name
    console.log(req.session)
    console.log(req.session.name)
    let todos = await todoCollection.find({ name: username }).toArray()
    res.render('index.ejs', { name: username, results: todos })
  } else {
    res.render('./login.ejs', { msg: 'user will be created, if it is not found.' })
  }
})

app.post('/login', async (req, res) => {
  const name = req.body.username
  const pw = req.body.password
  const user = await userCollection.findOne({ username: name, password: pw })
  console.log("login: " + user)
  if (user) {
    console.log("found " + user)
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true
    req.session.name = name

    let todos = await todoCollection.find({ name: name }).toArray()
    res.render('index.ejs', { name: name, results: todos })
  } else {
    console.log("not found")
    userCollection.insertOne(req.body, function (error, response) {
      if (error) {
        console.log('Error occurred while inserting');
      } else {
        console.log('inserted record', response);
      }
    })
    res.render('login.ejs', { msg: 'user was created, you can login now!' })
  }
})

app.post('/add', async (req, res) => {
  await todoCollection.insertOne(req.body, function (error, response) {
    if (error) {
      console.log('Error occurred while inserting');
    } else {
      console.log('inserted record', response);

    }
  })
  let todos = await todoCollection.find({ name: req.body.name }).toArray()
  res.render('index.ejs', { name: req.body.name, results: todos })
});




//MONGO DB
const uri = 'mongodb+srv://' + process.env.ADMIN + ':' + process.env.PASS + '@' + process.env.HOST
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let userCollection = null
let todoCollection = null

client.connect()
  .then(() => {
    return client.db('todoApp')
  })
  .then(__database => {
    userCollection = __database.collection('users')
    todoCollection = __database.collection('todos')
  })



//check connection
app.use((req, res, next) => {
  if (userCollection !== null && todoCollection !== null) {
    next()
  } else {
    res.status(503).send()
  }
})
