
const express = require('express'),
      favicon = require('serve-favicon'),
      timeout = require('express-timeout'),
      responseTime = require('response-time'),
      cookie = require('cookie-session'),
      serveStatic = require('serve-static'),
      hbs = require('express-handlebars').engine,
      mongodb = require('mongodb'),
      app     = express()
      
let   numbers  = [],
      total = 0,
      User = "",
      allData = ["Username: "+ User, "Total: " + total, "Numbers: " + numbers]
app.engine('handlebars', hbs() )
app.set('view engine', 'handlebars')
app.set('views', './views')

let serve = serveStatic('public')

app.use(express.urlencoded({extended:true}))
app.use( express.static( 'views'  ) )
app.use( express.json() )
app.use(timeout('5s'))
app.use(responseTime(function(req,res,time){
  console.log((req.method + req.url).toLowerCase())
}))

app.use(cookie({
  name: 'session',
  keys:['key1','key2']
}))

const url = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST

const client = new mongodb.MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true})
let collection = null;

const connect = async function(){
  await client.connect()
  collection = await client.db('webware').collection('CounterCollection')
  const results = await collection.find({}).toArray()
  console.log(results)
}

const getLoginDetails = async function(userToFind,passToTest){
  const results = await collection.find({username : userToFind}).toArray()
  console.log(results)
  return results
}

const handleAsync = async function(req,res){
  console.log( req.body )
  if(collection === null){
    await connect()
  }
  let username = ""
  let password = ""
  if( collection !== null ) {
    password = await getLoginDetails(req.body.username, req.body.password)
    if( req.body.password === password[0].password ) {
      req.session.login = true
      if(collection !== null){
        let userData = await collection.find({username:req.body.username}).toArray()
        numbers = userData[0].numbers
        total = Number(userData[0].total)
      }else{
        console.log("Error retrieving data from database")
      }
      //User = req.body.username
      res.redirect( 'main.html' )
    }else{
      req.session.login = false
      res.render('index', { msg:'login failed, please try again', layout:false })
    }
  }
}

const updateNumbers = async function(req,res){
  if(collection !== null){
    await collection.updateOne(
    {username:User},
    {
      $set:{numbers:numbers,total:total}
    }
  )
  console.log("numbers: " + numbers)
  console.log("Total" + total)
  }else{
    console.log("Error retrieving data from database")
  }
  
}

const createNewUser = async function(req,res){
  if(collection === null){
    await connect()
  }
  if(collection !== null){
    await collection.insertOne(
      {username:req.body.username,
      password:req.body.password,
      numbers:[],
      total:0}
    )
  }
}

const deleteAccount = async function(req,res,User){
  if(collection === null){
    await connect()
  }
  if(collection !== null){
    await collection.deleteOne(
      {username:User}
    )
  }
}

app.post( '/login', (req,res)=> {
  User = req.body.username
  handleAsync(req,res)
  //getNumbers(User)
})

app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})

app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('index', { msg:'login failed, please try again', layout:false })
})

app.get( '/main.html', ( req, res) => {
    res.render( 'main', { msg:'success you have logged in', layout:false })
})

app.post( '/submit', (req, res) => {
  //debugger
  console.log(req.body.numToAdd)
  numbers.push(Number(req.body.numToAdd ))
  total += Number(req.body.numToAdd)
  updateNumbers(req,res)
  
  res.writeHead( 200, { 'Content-Type': 'application/json' })
  allData = ["Username: "+ User, "Total: " + total, "Numbers: " + numbers]
  res.end(JSON.stringify(allData))
})

app.post('/createAccount', (req,res) => {
  debugger
  createNewUser(req,res)
  req.session.login = true
  User = req.body.username
  res.redirect( 'main.html' )
})

app.delete( '/remove', (req, res) => {
  console.log(req.body.numToRemove)
  if(Number(req.body.numToRemove) <= numbers.length - 1){
    let numToRemove = numbers[Number(req.body.numToRemove)]
    total -= Number(numToRemove)
    numbers.splice(Number(req.body.numToRemove),1)
    updateNumbers(req,res)
  }
  allData = ["Username: "+ User, "Total: " + total, "Numbers: " + numbers]
  res.end(JSON.stringify(allData))
})

app.post('/deleteAccount',(req,res) => {
  deleteAccount(req,res,User)
  //res.redirect('public/views/index.html')
})

app.listen( process.env.PORT )
