//  http://localhost:3000/
// you can use npm start to also start the server
const express = require("express"),
  mongodb = require("mongodb"),
  responseTime = require("response-time"),
   bodyParser = require('body-parser'), // parses incoming request bodies in a middleware before handlers
  axios = require("axios"),
  app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

console.log(process.env.HOST);
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.static("images"));
app.use(express.json());
app.use(responseTime());

// body parser middle ware - do I need to add this?
// parse application/x-www-form-urlencoded

  app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
  app.use(bodyParser.json());

// logger function
// const logger = (req,res,next) => {
//   console.log( 'url:', req.url )
//   next()

// }
// app.use( logger )

// app.get( '/', ( req, res ) => res.send( 'Hello World!' ) )

////////////////////////////// Mongo DB stuff
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let collection = null; // collection declaration
client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db("datatest5").collection("test");
  })
  .then((__collection) => {
    //_collection is an alis for what the previous .then function returned
    collection = __collection; // set collection variable with the  data from last .then
    // blank query returns all documents
    return collection.find({}).toArray();
  });
// .then( console.log ) // outputs all tasks

// route to get all docs for MongoDB
app.get("/", (req, res) => {
  console.log("handling / ");
  if (collection !== null) {
    // get array and pass to res.json
    let cData = JSON.stringify(collection.find({}).toArray());
    response.end(cData);
    // .then( result => res.json( result ) )
  }
});

///////////// methods for sending and receiving MongoDB data
app.post("/results", (req, res) => {
  let usernameVal = req.body.User;
  console.log(usernameVal);
  // usernameVal = 'tester'
  // collection.find({ }).toArray().then(result => res.json(result))
  // {'json.User':'tester'}  https://stackoverflow.com/questions/10320633/mongo-how-to-query-a-nested-json
  collection
    .find({ "json.User": usernameVal })
    .toArray()
    .then((result) => res.json(result));
});

app.post("/add", (req, res) => {
  // assumes only one object to insert
  // collection.insertOne( req.body ).then( result => res.json( result ) )
  collection.insertOne(req.body).then((result) => res.json(result));
});

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post("/remove", (req, res) => {
  console.log(req.body);
  console.log(req.body._id);

  collection
    .deleteOne({ _id: mongodb.ObjectId(req.body._id) }) // ._id parameter is from our JSON
    .then((result) => res.json(result));
});

app.post( '/update', (req,res) => {
  console.log(req.body._id)
  console.log(req.body.json)
  jsonUpdates = req.body.json;
  // collection
  // .deleteOne({ _id: mongodb.ObjectId(req.body._id) })
  // collection.insertOne(req.body)
    collection
    .updateOne(
      { _id: mongodb.ObjectId(req.body._id)},
      
      { $set:{json: jsonUpdates}}
    )
    
    .then(result => res.json(result));
});

///////////////////// methods for basic cookies and login data
const cookie = require("cookie-session");
const { response } = require("express");
// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use(express.urlencoded({ extended: true }));

// cookie middleware! The keys are used for encryption and should be
// changed
app.use(
  cookie({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// this variable represents the authenticated user's username:
app.post("/loginBasic", (req, res) => {
  // express.urlencoded will put your key value pairs
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);

  // below is *just a simple authentication example*
  // checks if the username and password are valid
  if (req.body.username === "tester" && req.body.password === "test") {
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true;
    // req.session.username = req.body.username

    // since login was successful, send the user to the main content
    // use redirect to avoid authentication problems when refreshing
    // the page or using the back button, for details see:
    // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern
    res.redirect("main.html");
  } else {
    // app.use(errorhandler({log:'this password is incorrect'}))
    console.log(" wrong passowrd");
    // password incorrect, redirect back to login page
    // res.sendFile( __dirname + '/views/index.html' )
    res.sendFile(__dirname + "/views/index.html");
  }
});

// add some middleware that always sends unauthenicaetd users to the login page
app.use(function (req, res, next) {
  if (req.session.login === true) next();
  // res.sendFile( __dirname + '/views/index.html' )
  else res.sendFile(__dirname + "/views/index.html");
});

///////////////////// Github Authentication

app.get("/auth", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/oauth-callback", ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  // opts is used for the Accept header
  const opts = { headers: { accept: "application/json" } };

  // axios is a promise based HTTP client ( similar to fetch)
  axios
    .post("https://github.com/login/oauth/access_token", body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      console.log("My token:", token);

      res.redirect(`/?token = ${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

// redirects Github User to main.html
app.post("/loginGitHub", (req, res) => {
  res.redirect("main.html");
});

app.listen(process.env.PORT || 3000);
console.log("listening to port 3000");
