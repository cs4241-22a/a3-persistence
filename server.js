const express=require("express"),
      cookie=require("cookie-session"),
      hbs = require("express-handlebars").engine,
      app = express()
const mongoose = require("mongoose"),
      mongodb = require("mongodb");
const session = require("express-session");
const favicon = require('serve-favicon');
const path = require("path");
app.use(express.urlencoded({extended:true}))
app.engine("handlebars", hbs())
app.set("view engine", "handlebars")
app.set("views", "./views")
app.use(favicon(path.join(__dirname, "public", "favicon.ico")))
app.use(cookie({
  name: "session",
  keys: ["key1", "key2"]
}))

//returns user to login if failed and gives a message
app.post("/login", (req, res)=>{
  console.log(req.body)
  if(req.body.password=='test'){
    console.log("test true")
    req.session.login = true
    res.redirect("/index")
  }else{
    req.session.login = false
    res.render("login", {msg:"login failed, please try again", layout:false})
  }
})

//sends user to login or index
app.get('/', (req, res)=>{
  res.render("login", {msg:'', layout:false})
})
app.get('/index', (req, res)=>{
  res.render('index', {msg:'success you have logged in', layout:false})
})

//sends user to log in if not authenticated
app.use(function(req, res, next){
  if(req.session.login===true){
    next()
  }else{
    res.sendFile( __dirname + '/views/login.handlebars' )
  }
})
app.use(express.static(__dirname + '/public'));

//connection stuff
app.use(express.static('public'))
app.use(express.json())

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then(()=>{
  return client.db("NotesBase").collection("Notes")
})
  .then(__collection=> {
    collection=__collection
    return collection.find({}).toArray()
}).then(console.log)

app.get('/', (req, res)=>{
  if(collection!== null){
    collection.find({}).toArray().then(result=>res.json(result))
  }
})
app.use((req, res, next)=>{
  if(collection!==null){
    next()
  }else{
    res.status(503).send()
  }
})

app.post('/add', (req, res)=>{
  collection.insertOne(req.body).then(result=>res.json(result))
})
app.post('/remove', (req, res)=>{
  collection.deleteOne({_id:mongodb.ObjectId(req.body._id)})
  .then(result=>res.json(result))
})
app.post('/update', (req, res)=>{
  collection
    .updateOne(
    {_id:mongodb.ObjectId(req.body._id) }, 
    {$set:{name:req.body.name}})
    .then(result=>res.json(result))
})
app.listen(3000)
