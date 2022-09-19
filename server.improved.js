const express = require('express'),
mongodb = require( 'mongodb' ),
app = express(),
serveStatic = require('serve-static'),
bodyparser = require('body-parser'),
cookieSession = require('cookie-session'),
cookieParser = require('cookie-parser'),
cookie  = require( 'cookie-session' ),
mongoose = require('mongoose'),
GitHubStrategy = require('passport-github2').Strategy,
passport = require('passport'),
MongoClient = mongodb.MongoClient;



require('dotenv').config();

app.use( express.static('public') )
app.use( express.json() )
  app.use(express.urlencoded({ extended:true }))
  app.use(cookieParser())
  app.use(passport.initialize());
  app.use(passport.session());
  app.use( cookie({
    name: 'session',
    keys: [process.env.KEY1, process.env.KEY2]
  }))
  app.use(serveStatic('public', {'index' : ['login.html']}))

let loginCollection = null
const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@' +process.env.HOST;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  loginCollection = client.db("a3database").collection("survey");
});


const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

  passport.serializeUser(function(user, done){
    done(null, user);
  })
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  })
  
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "https://contact-log.herokuapp.com/github/logs"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }))

  
  app.get('/auth/error', (req, res) => res.send('Unknown Error'));
  app.get('/github/logs',passport.authenticate('github', { failureRedirect: '/auth/error' }),
  function(req, res) {
    res.redirect('/route?id=' + req.user.id);
  });


  app.get('/route', (req, res) => {
  
    if(loginCollection!=null){
      loginCollection.insertOne({username:req.query.id})
      .catch(err => console.log(err)) 
      .then(response => {
        req.session.login = true;
        req.session.username = req.query.id;
        res.redirect("response.html");
      });
    }
  })


//post functions:
app.post('/delete', bodyParser.json(), function(request, response) {
  collection
    .deleteOne({ _id:mongodb.ObjectId( request.body.id ) })
    .then( result => response.json( result ) )
})

app.post('/update', bodyParser.json(), function(request, response) {
  collection
    .updateOne(
      { _id:mongodb.ObjectId( request.body.modifyInput ) },
      { $set:{ name:request.body.name,
               gender:request.body.gender,
               year:request.body.year,
               calories:request.body.calories,
               fiber:request.body.fiber,
               favoritefruit:request.body.favoritefruit,
              }}
    )
    .then( result => response.json( result ) )
})

app.post( '/signout', bodyParser.json(), function( request, response ) {
  console.log("In sign out: " + request.session.login)
  request.session.login = false
  console.log("In sign out: " + request.session.login)
  response.sendFile( __dirname + '/public/login.html' )
})

app.post( '/submit', bodyParser.json(), function( request, response ) {
  console.log("In submit");
  request.body.username = request.session.username;
  collection.insertOne( request.body )
    .then( insertResponse => collection.findOne( insertResponse.insertedId ) ) 
    .then( findResponse   => response.json( findResponse ) )
  .catch(err => console.log(err)) 
})

app.post('/getResponse',  bodyParser.json(), function(request, response) {
  if( collection !== null ) {
    collection.findOne( { _id:mongodb.ObjectId( request.body.id ) } )
      .then( result => { response.json( result ) })
  }
})

//get functions:
app.get('/getData', function(request, response) {
  if( collection !== null ) {
    collection.find({ username:request.session.username }).toArray().then( result => { response.json( result ) } )
  }
})

const appdata = [
  {
    responseNum: 1,
    name: "Cather",
    year: "Junior",
    sex: "Female",
    calories: 2500,
    fiber: 35,
    favoritefruit: "Watermelon",
  },
];
const deleteItem = function (jsonData) {
  //console.log(appdata);
  appdata.splice(jsonData["deletingResponse"], 1);
};
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/getResponses") {
    response.writeHeader(200, { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    //console.log(JSON.parse(dataString));
    if (request.url === "/submit") {
      appdata.push(JSON.parse(dataString));
    } else if (request.url === "/delete") {
      console.log(JSON.parse(dataString));
      deleteItem(JSON.parse(dataString));
    }
    //console.log(appdata);
    // ... do something with the data here!!!
    for (let i = 0; i < appdata.length; i++) {
      let response = appdata[i];
      response.fiber = amountFiber(response.calories);
    }
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end();
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


