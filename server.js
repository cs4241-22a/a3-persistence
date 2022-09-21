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
app.get('/', (req, res) => {
  if (req.session.login === true) {
    res.render('./login.ejs')
  } else {
    res.render('./index.ejs')
  }
})

app.post('/edit', async (req, res) => {
  const name = req.body.name
  const oldValue = req.body.oldValue
  const todo = req.body.edited
  console.log("name:"+name)
  console.log("v:"+oldValue)
  console.log("todo:"+todo)


  await todoCollection.updateOne({ name: name, 'new-task-input': oldValue },
    { $set: { name: name, 'new-task-input': todo } })

  let todos = await todoCollection.find({ name: name }).toArray()
  res.render('index.ejs', { name: req.body.name, results: todos })
})

app.get('/login', (req, res) => {
  res.render('./login.ejs')
})

app.post('/login', async (req, res) => {
  const name = req.body.username
  const pw = req.body.password
  const user = await userCollection.findOne({ username: name, password: pw })
  if (user) {
    console.log("found " + user)
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true

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
    });
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
