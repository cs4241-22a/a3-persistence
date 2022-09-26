// server.js
// where your node app starts

// init project
const express = require( 'express' ),
      session = require(  'express-session'),
      MongoDBStore = require('connect-mongodb-session')(session),
      cookie  = require( 'cookie-session' ),
      hbs     = require( 'express-handlebars' ).engine,
      mongodb = require( 'mongodb' );

const app = express();  

const APP_PORT = 3000//listener.address().port

app.use( express.json() )

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const MONGOURI = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST


//-----------------------------------------------------BEGIN LOGGER-----------------------------------------------------

const logger = (req,res,next) => {
  //console.log( 'url:', req.url )
  next()
}

app.use( logger )

//-----------------------------------------------------ESTABLISH MONGODB CONNECTION-----------------------------------------------------

const client = new mongodb.MongoClient( MONGOURI, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'AlfieDB' ).collection( 'AlfieVoting' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

  //Check connection
  app.use( (req,res,next) => {
    if( collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
  })

//-----------------------------------------------------MIDDLEWARE AND POST ROUTES-----------------------------------------------------------------
// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )

// cookie middleware! The keys are used for encryption and should be
// changed
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.post( '/login', (req,res)=> {
  // assumes only one object to insert
  let dataString = ''

  req.on( 'data', function( data ) {
    dataString += data;
  })
  
  req.on( 'end', function() {
    const json = JSON.parse( dataString );

    //find if user exists
    collection.find({username: json.username, password: json.password}, {$exists: true}).toArray(function(err, docs) {     
      if(docs.length > 0) //if exists
      {
          console.log("Valid Login"); // print out what it sends back
          req.session.login = true
          req.session.username = json.username
          res.statusMessage = "Current password does match";
          res.redirect('/');
          res.end();
      }
      else // if it does not 
      {
          req.session.login = false
          console.log("Invalid Login");
          res.statusMessage = "Current password does not match";
          res.end();
      }
    });
  })
})

app.post( '/create-user', (req,res)=> {
  // assumes only one object to insert
  let dataString = ''

  req.on( 'data', function( data ) {
    dataString += data;
  })
  
  req.on( 'end', function() {
    const json = JSON.parse( dataString );

    //find if user exists
    collection.find({username: json.username, password: json.password}, {$exists: true}).toArray(function(err, docs) {     
      if(docs.length > 0) //if exists
      {
          req.session.login = false
          console.log("User Exists"); // print out what it sends back
          res.redirect('/');
          res.end();
      }
      else // if it does not 
      {
          console.log("New User");
          req.session.login = true;
          req.session.username = json.username
          collection.insertOne(json)
          res.redirect('/');
      }
    });
  })
})

//-----------------------------------------------------ESTABLISH MONGODB CRUD ROUTES-----------------------------------------------------
  
app.get( '/getdata', (req,res) => {
  // assumes only one object to insert
  collection.find({username: req.session.username, ALFIEVOTE: true}, {$exists: true}).toArray(function(err, docs) {     
    res.json(docs)
  });
})

  //Add a route to add an Alfie Vote
  app.post( '/add', (req,res) => {
    // assumes only one object to insert
    let dataString = ''

    req.on( 'data', function( data ) {
      dataString += data 
    })

    req.on( 'end', function() {
      const json = JSON.parse( dataString )
      json['username'] = req.session.username
      json['ALFIEVOTE'] = true
      
      // add a 'json' field to our request object
      // this field will be available in any additional
      // routes or middleware.
      //req.json = JSON.stringify( dreams )
      collection.insertOne( json).then( result => res.json( result ) )
    })
  })

  //Add a route to remove from DB
  app.post( '/remove', (req,res) => {
    collection
      .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
      .then( result => res.json( result ) )
  })

  //Add route to update from DB
  app.post( '/update', (req,res) => {
    collection
      .updateOne(
        { _id:mongodb.ObjectId( req.body._id ) },
        { $set:{ name:req.body.name } }
      )
      .then( result => res.json( result ) )
  })

//-----------------------------------------------------ESTABLISH GET ROUTES AND PUBLIC ACCESS-----------------------------------------------------

// http://expressjs.com/en/starter/basic-routing.html
app.use(express.static("public"));

app.get("/", function(request, response) {
  if( request.session.login === true ){
    console.log("Logged In Attempt at /")
    response.sendFile( __dirname + '/views/index.html' );  
  } else{
    console.log("Logged Out Attempt at /")
    response.redirect('/login') 
  }                                                  
});

app.get("/view-response-history", function(request, response) {
  if( request.session.login === true )
    response.sendFile(__dirname + "/views/view-response-history.html");
  else{
    response.redirect('/login') 
  }
});

app.get("/create-user", function(request, response) {
  response.sendFile( __dirname + '/views/create-user.html' );
});

app.get("/login", function(request, response) {
  response.sendFile( __dirname + '/views/login.html' );
});

//-----------------------------------------------------BEGIN SERVER LISTENING-----------------------------------------------------
// listen for requests :)
const listener = app.listen(APP_PORT, function() {
  console.log("Your app is listening on port " + APP_PORT);
});

