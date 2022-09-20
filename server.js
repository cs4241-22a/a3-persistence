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
  if (collection !== null) {
    // get array and pass to res.json
    collection.find({}).toArray().then(result => res.json(result))
  }
})

app.post('/login', (req, res) => {
  const name = req.body.username
  const pw = req.body.password
  console.log(name + pw)
  //collection.insertOne(req.body).then( result => res.json( result ) )
  res.redirect('/')
})





//MONGO DB
const uri = 'mongodb+srv://' + process.env.ADMIN + ':' + process.env.PASS + '@' + process.env.HOST
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let collection = null

client.connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db('XXXtest').collection('XXXtodos')
  })
  .then(__collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({}).toArray()
  })
  .then(console.log)



//check connection
app.use((req, res, next) => {
  if (collection !== null) {
    next()
  } else {
    res.status(503).send()
  }
})

