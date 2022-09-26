"use strict";
const util = require("util");
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

const http = require("http"),
  express = require("express"),
  app = express(),
  MongoClient = require("mongodb").MongoClient,
  bodyparser = require("body-parser"),
  bcrypt = require("bcrypt"),
  favicon = require("serve-favicon"),
  passport = require("passport"),
  expsls = require("express-slash"),
  helmet = require("helmet"),
  path = require("path");

//app.get('/', function(req, res) {res.end('test')})

app.use(bodyparser.json());
app.use(helmet());
app.use(expsls());
app.use(favicon(path.join(__dirname, "public", "SpartanHelm.ico")));

app.use("/home", express.static("public/index.html"));
app.use("/login", express.static("public/login.html"));
app.use("/register", express.static("public/register.html"));
app.use(express.static("public/css"));
app.use(express.static("public/js"));
app.use(express.static(__dirname + "/public"));

const client = new MongoClient(
  "mongodb+srv://Admin:goatwpi@cluster0.inqdrsz.mongodb.net/?retryWrites=true&w=majority"
);
const db = null;
let collection = null;
let users = null;
let name = "";

client.connect(function (err) {
  if (err !== null) console.log("Connected successfully to server");

  collection = client.db("dbdata").collection("Schedule");
  users = client.db("dbdata").collection("UserInfo");

  //client.close();
});

app.post("/register", async (req, res) => {
  try {
    users.count({ username: req.body.username }).then((count) => {
      if (count !== 0) {
        res.status(401).send("UNAUTHORIZED");
      } else {
        bcrypt.hash(req.body.pass, 10, (err, hash) => {
          users.insertOne({ username: req.body.username, pass: hash });
        });
        res.status(200).send("OK");
      }
    });
  } catch (e) {
    console.log("failed to register: " + e);
    res.redirect("/register");
  }
});

app.post("/login", async (request, res) => {
  try {
    let name = request.body.username;
    let pass = request.body.pass;

    users.count({ username: name }).then((count) => {
      if (count === 0) {
        res.status(401).send("UNAUTHORIZED");
      } else {
        users
          .find({ username: name })
          .toArray()
          .then((arr) => {
            bcrypt.compare(pass, arr[0].pass, function (err, valid) {
              if (valid === true) res.status(200).send("OK");
              else res.status(401).send("UNAUTHORIZED");
            });
          });
      }
    });
  } catch (e) {
    console.log(e);
  }
});

app.use(function (req, res, next) {
  //console.log("aaa")
  next();
});

app.get("/", (req, res) => {
  res.redirect("/login");
});

let appdata = [
  {
    eventname: "Lunch",
    location: "Subway",
    day: "mtwrfsu",
    time: 12,
    timeend: 2,
    duration: 2,
    color: "#FFA500",
    details: "yummy",
  }, //,
  //{ 'eventname': '', 'location': '', 'day': , 'time': 2004, 'timeend': 30, 'duration': , 'deatils': },
  //{ 'eventname': '', 'location': '', 'day': , 'time': 1987, 'timeend': 14, 'duration': , 'deatils': }
];


app.post("/new", (req, res) => {
  collection
    .insertOne({
      username: req.body.username,
      eventname: req.body.eventname,
      location: req.body.location,
      day: req.body.day,
      time: req.body.time,
      timeend: req.body.timeend,
      duration: req.body.duration,
      color: req.body.color,
      details: req.body.details,
    })
    .then((x) => {
      res.end();
    });
  //res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
});

app.post("/del", (req, res) => {
  let username = req.body.username;
  let eventname = req.body.eventname;
  collection.deleteMany({ $and: [ { username: username }, { eventname: eventname } ] }).then(x => res.status(200).send("OK"));
  //res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
});

app.post("/clr", (req, res) => {
  let username = req.body.username;
  collection.deleteMany({ username: username}).then(x => res.status(200).send("OK"));
})

app.get("/logout", (req, res) => {
  //name = ""
  res.redirect("/login");
});

app.post("/getsch", (req, res) => {
  let username = req.body.username;
  if (username === "" || username === null)
    res.status(401).send("UNAUTHORIZED");
  else if (collection !== null) {
    collection
      .find({ username: username })
      .toArray()
      .then((ret) => {
        res.json(ret);
      });
  }
});

app.listen(process.env.PORT || 3000);
