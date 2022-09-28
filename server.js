// server.js

const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const app = express();
let user_id = "";

app.use(express.static("public"));
app.use(express.json());

//Connect to MongoDB
const uri =
  "mongodb+srv://" +
  process.env.USER +
  ":" +
  process.env.PASS +
  "@" +
  process.env.HOST;

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let collection = null;

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db("webware").collection("dreams");
  })
  .then((__collection) => {
    // store reference to collection
    collection = __collection;
    // blank query returns all documents
    return collection.find({}).toArray();
  })
  .then(console.log);

// route to login
app.get("/", (req, res) => {
  if (collection !== null) {
    // get array and pass to res.json
    res.sendFile(__dirname + "/views/login.html");
    //collection.find({ }).toArray().then( result => res.json( result ) )
  }
});

app.use((req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    res.status(503).send();
  }
});

app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
// app.get("/", (request, response) => {
//   response.sendFile(__dirname + "/views/login.html"); ////EDIT PAGE HERE
// });

app.get("/entries", (request, response) => {
  response.sendFile(__dirname + "/views/index.html"); ////EDIT PAGE HERE
});

// send the default array of dreams to the webpage

app.post("/signup", bodyParser.json(), (request, response) => {
  console.log("signing up!");

  // console.log(request.body.username);
  // console.log(request.body.password);

  collection.findOne({ username: request.body.username }).then((result) => {
    if (result !== null) {
      console.log("user already exists");
      response.json({ code: 1 });
    } else {
      collection
        .insertOne(request.body)
        .then((result) => response.json(result));
      console.log("user added");
    }
  });
});

app.post("/login", bodyParser.json(), (request, response) => {
  // express helps us take JS objects and send them as JSON
  console.log("logging in! server");

  // console.log(request.body.username);
  // console.log(request.body.password);

  collection.findOne({ username: request.body.username }).then((result) => {
    console.log(result);
    if (result !== null) {
      console.log("user exists: checking password");
      console.log(result.password);
      if (request.body.password == result.password) {
        console.log("password correct");
        user_id = request.body.username;
        console.log(user_id);
        response.json({ code: 0 });
      } else {
        console.log("WRONG PASSWORD");
        response.json({ code: 1 });
      }
    } else {
      console.log("user does not exist. Create account. ");
    }
  });
});

app.post("/add", bodyParser.json(), (req, res) => {
  console.log("adding in server");
  req.body.user = user_id; //adding user field to json

  collection.insertOne(req.body).then((result) => {
    res.json({ user: user_id });
    console.log(req.body);
  });
});

app.post("/dreams", bodyParser.json(), (req, res) => {
  console.log("/dreams on server");
  req.body.user = user_id; //adding user field to json

  if( collection !== null ) {
    // get array and pass to res.json
    console.log(collection.find({ user_id }).toArray())
      //.then( result => res.json( result ) )
  }
    //console.log(res.json);
  });

// loading entries on page
// app.get("/dreams", (request, response) => {
//   // express helps us take JS objects and send them as JSON
//   response.json(dreams);
// });

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.static("views"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/login.html"); ////EDIT PAGE HERE
});

app.get("/entries", (request, response) => {
  response.sendFile(__dirname + "/views/index.html"); ////EDIT PAGE HERE
});
