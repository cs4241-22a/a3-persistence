const express = require( 'express'),
      cookie  = require( 'cookie-session' ),
      bodyParser = require( 'express').json,
      errorhandler = require( 'errorhandler'),
      app = express()
      path= require("path"),
      client = require('./src/database')

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
const questions= require("./src/controllers/questions.js")


if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}

client.connect()
   .then( () => {
     // will only create collection if it doesn't exist
     return client.db( 'government' ).collection( 'unemployment' )
   })
   .then( __collection => {
     // store reference to collection
    
     collection = __collection
     // blank query returns all documents
     return collection.find({ }).toArray()
   })
   .then( console.log )

app.use( express.static('public' ) )
app.use( express.static('views' ) )
app.use( express.json() ) 
// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )
app.use(bodyParser())


// cookie middleware! The keys are used for encryption and should be
// changed
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.post( '/login', (req,res)=> {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  console.log( req.body )

  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database

  //     // blank query returns all documents
  //     return collection.find({ }).toArray()
  console.log('ssn', req.body.ssn)
  collection.findOne({socialSecurity: parseInt(req.body.ssn)}).then(savedUser => {
    console.log('savedUser', savedUser)
    // have to go the query to see if user exists! 
    if(savedUser != null && parseInt(req.body.password) === savedUser.password) {
      // define a variable that we can check in other middleware
      // the session object is added to our requests by the cookie-session middleware
      req.session.login = true
      
      // since login was successful, send the user to the main content
      // use redirect to avoid authentication problems when refreshing
      // the page or using the back button, for details see:
      // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
      res.redirect( '/questions' )
    }else{
      // password incorrect, redirect back to login page
      res.sendFile( __dirname + '/views/index.html' );
    }
  })
})

//reegister function, login function  

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.sendFile( __dirname + '/views/index.html' )
})

// serve up static files in the directory public
app.use( express.static('public') )

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/database", (request, response) => {
  response.sendFile(__dirname + "/views/database.html");
});


app.get("/questions", questions.index )
app.post("/questions", questions.create )
app.post("/questions/:id/delete", questions.destroy )
app.get("/questions/:id/edit", questions.edit )
app.post("/questions/:id/update", questions.update )
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.listen(3000)

