const express = require( 'express' ),
    session = require('express-session'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github2').Strategy,
    favicon = require('serve-favicon'),
    path = require('path'),
    app = express()

var util= require('util');
var encoder = new util.TextEncoder('utf-8');

require('dotenv').config()

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

let appdata = [];


let GITHUB_CLIENT_ID = `${process.env.GITHUB_CLIENT_ID}`;
let GITHUB_CLIENT_SECRET = `${process.env.GITHUB_CLIENT_SECRET}`;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
));

// ---
// Middleware
// ---

// 1. user defined-middleware :: logs current route
app.use( (req,res,next) => {
  console.log( 'url:', req.url )
  next()
})

// 2. express-static middleware
app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) )

// 3. express-json, parse incoming JSONs
app.use( express.json() )

// 4+5. passportjs + express-session middleware
app.use(session({ secret: 'fjwiofjeqorfjqepir', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// 6. favicon middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))



// ---
// ROUTES
// ---
// app.get('/', function(req, res){
//   res.render('index', { user: req.user });
// });

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});
// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){
      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login?github-auth-failed' }),
    function(req, res) {
      res.redirect('/');
    });

// TODO broken...
// app.post('/logout', function(req, res, next) {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });

// todo handle GET?
// app.get( '/', ( req, res ) => res.send( 'Hello World!' ) )

// handle POST
// todo, make definitive routes for /submit and /edit
app.post( '/*', (req, res) => {
  handlePost(req, res)
})


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


// todo DB stuff
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://rvrx:<password>@cluster0.6tugoyu.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

console.log("SERVER.IMPROVED.JS Connecting to DB")
client.connect()
    .then( () => {
      // will only create collection if it doesn't exist
      return client.db( 'db0' ).collection( 'collection1' )
    })
    .then( collection => {
      // blank query returns all documents
      return collection.find({ }).toArray()
    })
    .then( sync_appdata_with_db )

/**
 * Uses DB as source of truth to sync user data
 * @param db_array
 */
function sync_appdata_with_db(db_array) {
  console.warn(db_array)
  appdata = db_array
}


function sync_appdata_with_db_and_send(user) {
  connect_to_db_and_run_on_collection_for_given_user(function (collection) {
    appdata = collection.find({ }).toArray()
  }, user)
}


/**
 * Helper function for any DB operations
 * @param func function to call on the collection
 * @param user the DB "collection"
 */
function connect_to_db_and_run_on_collection_for_given_user(func, user = 'collection1') {
  client.connect()
      .then( () => {
        // will only create collection if it doesn't exist
        return client.db( 'db0' ).collection( user )
      })
      .then( collection => {
        func(collection)
      }).then(

  )
}

app.listen( process.env.PORT || 3000 )

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  function extracted() {
    response.writeHead(200, {'Content-Type': 'application/json'})
    if (typeof request.user !== "undefined") {
      client.connect()
          .then(() => {
            // will only create collection if it doesn't exist
            console.log(request.user)
            console.log("foobar")
            console.log("foobar")
            console.log("foobar")
            console.log("foobar")
            console.log(typeof request.user)
            return client.db('db0').collection(request.user.username || 'collection1')
          })
          .then(collection => {
            return collection.find({}).toArray()
          }).then(db_array => {
        response.end(JSON.stringify(db_array));
      })
    } else {
      console.log("\t\t\t\t\t\teripfhqefheufhequiovqeniuovnqeiovnqoivn\nienfenv\n\n\n\n\ndfdffd")
      response.end(null)
    }

  }

  request.on("end", function () {
    console.log(JSON.parse(dataString));

    // ... do something with the data here!!!
    const parsedDataString = JSON.parse(dataString);

    if (parsedDataString["action"] === "new") {
      console.log("[server]: NEW REQ");
      function guidGenerator() {
        const S4 = function () {
          return (((1 + Math.random()) * 0x10000) | 0)
            .toString(16)
            .substring(1);
        };
        return (
          S4() +
          S4() +
          "-" +
          S4() +
          "-" +
          S4() +
          "-" +
          S4() +
          "-" +
          S4() +
          S4() +
          S4()
        );
      }
      const due_date = new Date();
      due_date.setDate(due_date.getDate() + parseInt(parsedDataString["days_to_complete"]))
      const new_task = {
        task: parsedDataString["task"],
        status: 0,
        other: due_date,
        guid: guidGenerator(),
      }
      appdata.push(new_task);
      // push to DB
      connect_to_db_and_run_on_collection_for_given_user(function (collection) {
        collection.insertOne(new_task).then(console.log).then(extracted)
      }, request.user.username)
    } else if (parsedDataString["action"] === "edit") {
      // swap status for this GUID
      console.log("[server]: MODIFY REQ");
      const isSameGUID = (element) =>
        element["guid"] === parsedDataString["task_guid"];
      const foundTaskIndex = appdata.findIndex(isSameGUID); // find appdata with same guid
      appdata[foundTaskIndex]["status"] = 1 - appdata[foundTaskIndex]["status"]; // flip status
      // flip status in DB
      connect_to_db_and_run_on_collection_for_given_user(function (collection) {
        collection.updateOne(
            { guid: parsedDataString["task_guid"] },
            { $set: { 'status': appdata[foundTaskIndex]["status"] } }
        ).then(extracted)
      }, request.user.username)
    } else if (parsedDataString["action"] === "delete") {
      console.log("[server] DEL REQ");
      appdata = appdata.filter(
        (item) => item["guid"] !== parsedDataString["task_guid"]
      );
      // delete from DB
      connect_to_db_and_run_on_collection_for_given_user(function (collection) {
        collection.deleteOne({ guid: parsedDataString["task_guid"] }).then(sync_appdata_with_db).then(extracted)
      }, request.user.username)
    } else {
      console.error("[server]: Unknown action type");
      extracted()
    }

    console.warn("current appdata:");
    console.warn(appdata);

    // extracted();
    // response.end(JSON.stringify(appdata));
  });
};
