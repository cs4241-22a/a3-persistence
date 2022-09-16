require('dotenv').config()

// Express
const express = require( 'express' ),
  cookie  = require( 'cookie-session' ),
  passport = require('passport'),
  bodyparser = require('body-parser'),
  cookieparser = require('cookie-parser'),
  morgan = require('morgan'),
  hbs     = require( 'express-handlebars' ).engine,
  app = express()

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )
app.use(cookieparser())
app.use(passport.initialize())
app.use(bodyparser.urlencoded({ extended:true }) )
app.use(morgan())

// Handlebars setup
app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

// Used for passport
var GitHubStrategy = require('passport-github').Strategy;
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.callback}auth/github/callback`
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

//Passport Middleware
app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// cookie middleware! The keys are used for encryption and should be
// changed
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.post( '/delete', (req,res)=> {
})

app.post( '/edit', (req,res)=> {
})

app.post( '/login', (req,res)=> {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  console.log( req.body )
  
  // for A3, you should check username / password combos in your database
  if( req.body.password === 'test' ) {
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true
    
    // since login was successful, send the user to the main content
    res.redirect( 'index.handlebars' )
  }else{
    // password incorrect, redirect back to login page
    req.session.login = false
    res.render('login', { msg:'login failed, please try again', layout:false })
  }
})

app.get( '/', (req,res) => {
  res.render( 'login', { msg:'', layout:false })
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('login', { msg:'login failed, please try again', layout:false })
})

app.get( '/index.handlebars', ( req, res) => {
    res.render( 'index', { msg:'success you have logged in', layout:false })
})

// serve up static files in the directory public
app.use( '/public' , express.static('public'))

app.listen( 3005 )

// ----------------- Database --------------
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
//const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'A3-Database' ).collection( 'A3-Test' )
  })
  .then( collection => {
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )