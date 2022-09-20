require('dotenv').config()
const express = require( 'express' ),
    cookie  = require( 'cookie-session' ),
    engine = require('express-handlebars'),
    mongodb = require( 'mongodb' ),
    app = express()

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )

app.use( express.json() )

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null
let appdata = []
let userdata = null

client.connect()
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

// cookie middleware! The keys are used for encryption and should be
// changed
app.use( cookie({
  name: 'session',
  keys: ['2iMAwLWcViIKX5kAXuted14Jejr5Nwd4', '8ihbYfca2GFjh3eTvL1zpaWbgY0fZGWh']
}))

app.engine('handlebars', engine.engine());
app.set('view engine', 'handlebars');

app.post( '/login', (req,res)=> {
    // express.urlencoded will put your key value pairs 
    // into an object, where the key is the name of each
    // form field and the value is whatever the user entered
    console.log( req.body )
    let password = null;
    appdata.then( (_appdata) => {
        for(let i = 0; i < _appdata.length; i++){
          if(req.body.username === _appdata[i].username){
            password = _appdata[i].password
            break
          }
        }
        if( req.body.password === password ) {
          // define a variable that we can check in other middleware
          // the session object is added to our requests by the cookie-session middleware
          req.session.login = true
          res.redirect( 'main' )
        }else{
          // password incorrect, redirect back to login page
          res.sendFile( __dirname + '/views/index.html' )
          //maybe add a wrong password message
        }
      }
    )
  })

app.post( '/logout', (req,res)=> {
      req.session.login = false
      res.sendFile( __dirname + '/views/index.html' )
  }) 

app.get( '/main', ( req, res) => {
    if( req.session.login === true )
        
        res.render(__dirname +"/views/layouts/main.handlebars",
          {
            task: [
              "one task",
              "two task",
              "red task",
              "blue task"
            ]
          } 
        )
    else{
        res.sendFile( __dirname + '/views/index.html' )
    }
})

app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) ) 

app.listen( process.env.PORT || 3000 )