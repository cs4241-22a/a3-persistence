const express = require("express"),
  path = require("path"),
  mongodb = require("mongodb"),
  dotenv = require("dotenv"),
  passport = require("passport"),
  compression = require("compression"),
  helmet = require("helmet"),
  session = require("express-session"),
  GitHubStrategy = require("passport-github").Strategy,
  app = express();

require("dotenv").config();

//=========DATABASE===========
const uri = process.env.DB_URI;
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let collection = null;

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db("Users").collection("user");
  })
  .then((__collection) => {
    // store reference to collection
    collection = __collection;
    // blank query returns all documents
    return collection.find({}).toArray();
  })
  .then(console.log);

//========COOKIES============
app.use(express.urlencoded({ extended: true }));

//=======MIDDLEWARE=========
//To check connection
app.use((req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    res.status(503).send();
  }
});

//To serve static files and serve json
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

//To check if the user is authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login.html");
  }
};

app.use(compression());
app.use(helmet());

//=========AUTHENTICATION==========

//Passport stuff
let gitId = null;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: true, maxAge: 60 * 1000 },
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

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.ID,
      clientSecret: process.env.SECRET,
      callbackURL: "https://a3-arman-saduakas.glitch.me/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login.html" }),
  function (req, res) {
    gitId = req.user.id;
    res.redirect("/main.html");
  }
);

//Routes
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/main", checkAuthenticated, function (req, res) {
  res.sendFile("main.html");
});

app.get("/logout", function (req, res) {
  res.redirect("/");
});

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
      category: req.body.category,
      partNumber: req.body.partNumber,
      partName: req.body.partName,
      installed: req.body.installed,
      price: req.body.price,
    })
    .then(() => collection.find({ user: gitId }).toArray())
    .then((result) => res.json(result));
});

app.post('/delete', express.json(), function (req, res) {
  collection
    .deleteOne({ _id: mongodb.ObjectId(req.body.id) })
    .then(() => {
      return collection.find({ creator: gitId }).toArray()
    })
    .then((result) => res.json(result));
})

app.post("/edit", express.json(), function (req, res) {
  collection
    .updateOne(
      { _id: mongodb.ObjectId(req.body.id) },
      {
        $set: {
          user: gitId,
          category: req.body.category,
          partNumber: req.body.partNumber,
          partName: req.body.partName,
          installed: req.body.installed,
          price: req.body.price,
        },
      }
    )
    .then(() => collection.find({ user: gitId }).toArray())
    .then((result) => res.json(result));
});


app.listen(process.env.PORT || 3000);
