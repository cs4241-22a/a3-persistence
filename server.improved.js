
const http = require("http"),
  fs = require("fs"),
  express = require("express"),
  path = require("path"),
  mongodb = require("mongodb"),
  dotenv = require("dotenv"),
  passport = require("passport"),
  session = require("express-session"),
  serveStatic = require("serve-static"),
  compression = require("compression"),
  helmet = require("helmet"),
  GitHubStrategy = require("passport-github").Strategy,
  app = express();

require("dotenv").config();


const appdata = [
  { task: "do Homework", date: "2022-10-09" },
];

//Mongo
app.use(serveStatic(path.join(__dirname, "/public")));
app.use(express.json())

const uri = "mongodb+srv://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST
console.log(uri)

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })

let collection = null


client.connect()
  .then(() => {
    return client.db("Users").collection("user");
  })
  .then((__collection) => {
    collection = __collection;

    return collection.find({}).toArray();
  })
  .then(console.log);


//middleware
app.use((req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    console.log("Uh Oh")
    res.status(503).send();
  }
});


const login = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("logging in")
    next();
  } else {
    console.log("user doesn't exit")
    res.redirect("/public/html/login.html");
  }
};

//app.use(compression());
//app.use(helmet());

//Authentification with Github
let gitId = null;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function (id, callback) {
  callback(null, id);
});

console.log("github strategy")
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: process.env.HOSTNAME + "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);


app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/public/html/login.html" }),
  function (req, res) {
    console.log("github callback")
    gitId = req.user.id;
    res.redirect("/html/main.html");
  }
);

//Routes login related
app.get("/", function (req, res) {
  console.log("hellooooooooo")
  res.sendFile(__dirname + "/public/html/login.html");
});

app.get("/main", login, function (req, res) {
  res.sendFile(__dirname + "/public/html/main.html");
});

app.get("/logout", function (req, res) {
  res.redirect("/");
});


// Table Related

app.post("/table", express.json(), function (req, res) {
  collection
    .find({ user: gitId })
    .toArray()
    .then((result) => res.json(result));
});

app.post("/submit", express.json(), function (req, res) {
  collection
    .insertOne({
      user: gitId,
      task: req.body.task,
      date: req.body.date,
    })
    .then(() => collection.find({ user: gitId }).toArray())
    .then((result) => res.json(result));
  console.log("submit")
});

app.post('/delete', express.json(), function (req, res) {
  collection
    .deleteOne({ _id: mongodb.ObjectId(req.body.id) })
    .then(() => {
      console.log("delete")
      return collection.find({ creator: gitId }).toArray()
    })
    .then((result) => res.json(result));
});

app.listen(process.env.PORT || 3000);
