require('dotenv').config()
const express = require( 'express' ),
    cookie  = require( 'cookie-session' ),
    mongodb = require( 'mongodb' ),
    favicon = require('serve-favicon'),
    app = express()

// use express.urlencoded to get data sent by default form actions
// or GET requests
app.use( cookie({
  name: 'session',
  keys: ['2iMAwLWcViIKX5kAXuted14Jejr5Nwd4', '8ihbYfca2GFjh3eTvL1zpaWbgY0fZGWh']
}))

app.use(favicon(__dirname +'/public/favicon.ico'))

app.use(express.urlencoded({ extended:true }) )

app.use( express.json() )

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null
let appdata = []

refreshDB = () => {return client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'TODOs' ).collection( 'usersAndTasks' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    appdata = collection.find({ }).toArray()
  })
}
refreshDB()

app.engine('html', require('hbs').__express);
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');
app.disable('view cache');

app.post( '/login', (req,res)=> {
  req.session.user = undefined
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  appdata.then( (_appdata) => {
      for(let i = 0; i < _appdata.length; i++){
        if(req.body.username === _appdata[i].username){
          req.session.user  = _appdata[i]
          break
        }
      }
      if(typeof req.session.user !== 'undefined'){
        if(req.body.password === req.session.user.password ) {
        // define a variable that we can check in other middleware
        // the session object is added to our requests by the cookie-session middleware
        req.session.login = true
        refreshDB()
        .then(res.redirect( 'main' ))
        }else{
          // password incorrect, redirect back to login page
          req.session.login = false
          res.render("login.html", {message:"Wrong Password"})
        }
      }else {
        req.body.tasks = [];
        req.session.user = req.body
        req.session.login = true
        collection.insertOne( req.body)
        .then(refreshDB())
        .then(res.redirect( 'main' ))
      }
    }
  )
})

app.post( '/logout', (req,res)=> {
  req.session.login = false
  req.session.user = undefined
  res.redirect( '/' )
}) 

app.post( '/checkTODO', (req, res)=>{
  for(let i = 0; i < req.session.user.tasks.length; i++){
    if(req.body.text === req.session.user.tasks[i].text){
      req.session.user.tasks[i].completed = req.body.completed
      collection.updateOne({_id:mongodb.ObjectId(req.session.user._id)}, {$set:{tasks:req.session.user.tasks}})
      break
    }
  } 
  res.status( 200 ).send()
})

app.post('/addTODO', (req, res)=>{
  if(req.body.text !== ""){
    for(let i = 0; i < req.session.user.tasks.length; i++){
      if(req.body.text === req.session.user.tasks[i].text){
        res.redirect( 'main' )
        return
      }
    }
    req.session.user.tasks.push({completed: false, text: req.body.text})
    collection.updateOne({_id:mongodb.ObjectId(req.session.user._id)}, {$set:{tasks:req.session.user.tasks}})
  }
  res.redirect( 'main' )
})

app.post('/deleteTODO', (req, res)=>{
  for(let i = 0; i < req.session.user.tasks.length; i++){
    if(req.body.text === req.session.user.tasks[i].text){
      req.session.user.tasks.splice(i,1)
      collection.updateOne({_id:mongodb.ObjectId(req.session.user._id)}, {$set:{tasks:req.session.user.tasks}})
      break
    }
  }
  res.status( 200 ).send()
})

app.get( '/main', ( req, res) => {
    if( req.session.login === true ){
      res.render("main.html", req.session.user)
    }else {
      res.redirect( '/' )
    }
})

app.get('/', (req, res)=>{res.render("login.html", {message:""})})

app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.use( express.static( 'public' ) )

app.listen( process.env.PORT || 3000 )