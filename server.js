require('dotenv').config()

// Express
const express = require( 'express' ),
  mongodb = require('mongodb'),
  cookieparser  = require( 'cookie-parser' ),
  session  = require( 'express-session' ),
  passport = require('passport'),
  bodyparser = require('body-parser'),
  morgan = require('morgan'),
  responseTime = require('response-time'),
  StatsD = require('node-statsd'),
  hbs     = require( 'express-handlebars' ).engine,
  app = express(),
  stats = new StatsD()


// Stats and Response time usage
stats.socket.on('error', function (error) {
  console.error(error.stack)
})

app.use(responseTime(function (req, res, time) {
  var stat = (req.method + req.url).toLowerCase()
    .replace(/[:.]/g, '')
    .replace(/\//g, '_')
  stats.timing(stat, time)
}))

// serve up static files in the directory public
app.use( '/public' , express.static('public'))

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )
app.use(passport.initialize())
app.use(bodyparser.urlencoded({ extended:true }) )
app.use(morgan('tiny'))
app.use(responseTime())
app.use(cookieparser());

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
app.use(
  session({
    key: "user_id",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

// Check if cookie is still saved in browser
app.use((req, res, next) => {
  if (req.cookies.user_id && !req.session.user) {
    res.clearCookie("user_id");
  }
  next();
});

app.post( '/delete', bodyparser.json(), (req,res)=> {
  console.log("/delete")
  collection.deleteOne({_id:mongodb.ObjectId(req.body._id)})
  .then(result => res.json(result))
})

app.post( '/edit', bodyparser.json(), (req,res)=> {
  console.log("/edit")
  collection.updateOne(
    {_id: mongodb.ObjectId(req.body._id)},
    {$set: {task: req.body.task}}
    )
  .then(result => res.json(result))
})

app.post("/add", bodyparser.json(), function(req,res) {
  console.log("/add" , " : ", req.body)
  // assumes only one object to insert
  collection.insertOne(req.body)
  .then(dbresponse => {
    console.log(`dbresponse: ${dbresponse}`)
    res.json(dbresponse.ops[0])})
})

// Middleware to check connection
app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

// ----------------- LOGIN FORM --------------
//const loginForm = document.getElementById('login-form')
//const username = loginForm.username.value;
//const password = loginForm.password.value;

app.post( '/login', bodyparser.json(), (req,res)=> {
  console.log( req.body )
  let username = req.body.username
  let password = req.body.password
  let pair = {username: username, password: password}
  // for A3, you should check username / password combos in your database
  /*
  if( req.body.password ===  'test1' && req.body.username === "user1"
  || req.body.password ===  'test2' && req.body.username === "user2") {
    */
   /*
  if(userCollection.findOne(pair).toArray()) {
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true
    res.redirect( 'index.handlebars' )
  }else{
    req.session.login = false
    res.render('login', { msg:'login failed, please try again', layout:false })
  }
})
*/
userCollection.find(pair).toArray(function(err, data) {
  if (err) {
    throw err;
  } else if (data.length >= 1) {
    //LOGIN SUCCESS
    req.session.login = true
    res.redirect( 'index.handlebars' )
  } else {
    // USER DOESN'T EXIST YET
    userCollection
      .insertOne({ username: username, password: password})
      .then(req.session.username = username)
      .then(function() {
        req.session.login = false
        res.render('login', { msg:'login failed, please try again', layout:false })
      });
  }
});
});

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

app.listen( 3005 )

const e = require('express')
// ----------------- Database --------------
const { MongoClient, ServerApiVersion, MongoDBNamespace, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
//const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let collection = client.db( 'A3-Database' ).collection( 'A3-Test' );
let userCollection = client.db( 'A3-Database' ).collection( 'Users' );

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'A3-Database' ).collection( 'A3-Test' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({}).toArray()
  })
  .then( console.log )
  // route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})
