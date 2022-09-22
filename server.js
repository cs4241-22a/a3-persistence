// server.js
// where your node app starts

// init project
require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const mongodb = require("mongodb");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://shaun:" +
  process.env.mongoPW +
  "@cluster0.5hnxfrv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const favicon = require("serve-favicon");
const path = require("path");

require("./passport");

//CUSTOM MIDDLEWARE \/
function loggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
}
//CUSTOM MIDDLEWARE /\

app.use(express.static("public"));
app.use(express.json());

app.use(
  session({
    secret: process.env.clSe,
    resave: false,
    saveUninitialized: true,
    cookie: { path: "/" },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
app.use(favicon(path.join(__dirname, "assets", "favicon-32.ico")));

let collection = null;

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db("ScoreDB").collection("scores");
  })
  .then((__collection) => {
    // store reference to collection
    collection = __collection;
    // blank query returns all documents
    return collection.find({}).toArray();
  })
  .then(console.log);

collection = client.db("ScoreDB").collection("scores");

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/app");
  } else {
    res.sendFile(__dirname + "/views/index.html");
  }
});

app.get("/auth/error", (req, res) => res.send("Unknown Error- Please log in again"));

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/error" }),
  function (req, res) {
    res.redirect("/app");
  }
);

app.get("/app", loggedIn, (req, res) => {
  res.sendFile(__dirname + "/views/main.html");
});

app.get("/manifest.json", (req, res) => {
  res.sendFile(__dirname + "/manifest.json");
});

app.get("/assets/favicon-32.ico", loggedIn, (req, res) => {
  res.sendFile(__dirname + "/assets/favicon-32.ico");
});

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/public/scripts.js", loggedIn, (req, res) => {
  res.sendFile(__dirname + "/public/scripts.js");
});

app.post("/add", (req, res) => {
  // assumes only one object to insert
  client.connect(() => {
    let toMongo = req.body;
    if (parseFloat(toMongo.Clicks) == parseFloat(toMongo.CPS) * 10) {
      toMongo.Rating = rater(toMongo.CPS);
      toMongo.User = req.user;
      collection.findOne({Name: new RegExp(toMongo.Name, 'i')}).then(function(doc){
        if (doc != null) {
          if (parseInt(doc.Clicks, 10) < parseInt(toMongo.Clicks, 10) && parseInt(doc.User, 10) == parseInt(req.user, 10)) {
            collection.deleteOne({Name: new RegExp(toMongo.Name, 'i')}).then(function (temp){
              collection.insertOne(toMongo).then((result) => res.json(result));
            });
          }
        } else {
          collection.insertOne(toMongo).then((result) => res.json(result));
        }
      });
      
    }
  });
});

//remove entry
app.post("/remove", loggedIn, (req, res) => {
  client.connect(() => {
    collection.findOne({Name: new RegExp(req.body.Name, 'i')}).then(function(doc){
        if (doc != null) {
          collection.deleteOne({Name: new RegExp(req.body.Name, 'i')}).then((result) => res.json(result));
        }
    });
      
  });
});

//get UID
app.get("/getuid", loggedIn, (req, res) => {
  res.json({UID: req.user});
});

// route to get all docs
app.get("/getScores", loggedIn, (req, res) => {
  client.connect(() => {
    if (collection !== null) {
      // get array and pass to res.json
      collection
        .find({})
        .toArray()
        //.then((result) => res.json(result));
        .then(function (temp) {
        for (let i = 0; i < temp.length; i++) {
          if (parseInt(temp[i].User) == parseInt(req.user)){
            temp[i].Delete = 1;
          }
        }
        return temp;
      }).then((result) => res.json(result));;
    }
  });
});

app.listen(8000, () => {
  console.log("Server is up and running at the port 8000");
});

function rater(cps) {
  let rating = "Average";
  if (cps < 4) {
    rating = "Below Average";
  } else if (cps > 7) {
    rating = "Above Average";
  }
  return rating;
}
