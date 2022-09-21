//installed packages
const express = require("express")
const app = express()
const mongodb = require('mongodb')
const bodyParser = require('body-parser')

require('dotenv').config()

app.set('view-engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('views'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//listen to port
app.listen(3000)




//ROUTES
//
app.get('/', (req, res) => {
  res.render('./index.ejs')
})

app.get('/login', (req, res) => {
  res.render('./login.ejs')
})

// route to get all docs
app.get('/', (req, res) => {

})

app.post('/login', async (req, res) => {
  const name = req.body.username
  const pw = req.body.password
  const user = await userCollection.findOne({ username: name, password: pw })
  if (user) {
    console.log("found " + user)
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
    res.render('login.ejs')
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

