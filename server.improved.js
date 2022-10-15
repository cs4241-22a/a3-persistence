const getUser = require('./login');

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ), 
      express = require('express'),
      dotenv = require('dotenv'),
      mongoose = require('mongoose'),
      mongodb = require('mongodb'),
      bodyParser = require("body-parser"),
      cookieParser = require("cookie-parser"),
      session = require("express-session"),
      passport = require("passport"),
      dir  = 'public/',
      port = 3000
     
dotenv.config()

const app = express()


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const auth = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.redirect("/");
  }
};

app.use("/index", express.static("public"));
app.get("/index", auth, (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//app.use(express.static("./",(req, res) => {
//  res.sendFile(path.resolve(__dirname, "/public/login.html"));
//}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});


app.use(cookieParser("" + process.env.COOKIE_SECRET));
app.use(
  session({
    secret: "" + process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      //cookie expires in 30 days
      maxAge: 1000 * 30 * 24 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, { email: user.id });
});

passport.deserializeUser(function (email, cb) {
  cb(null, email);
});

const uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@cluster0.uyte9vz.mongodb.net/test`;
mongoose.connect(uri).catch((err)=>{console.log(err)})
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: mongodb.ServerApiVersion.v1,
});

let collection = null;

client
  .connect()
  .then(() => {
    return client.db("test").collection("users");
  })
  .then((collection) => {
    collection = collection;

    return collection.find({}).toArray();
  })
  .then(console.log);
const appdata = [
  {
    game: "Tetris",
    dateBought: "08-15-01",
    dateCompleted: "08-15-01",

  },
  {
    game: "Tetris",
    dateBought: "08-15-01",
    dateCompleted: "08-15-01",

  },
];


app.get("/get-game", auth, (req, res) => {
  console.log("User: " + req.user);
  console.log(req.user);
  console.log("Session: " + req.session);
  console.log(req.session);
  getUserFoods(req.session.email)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

//getUser.loginUser({email: "bruhh",password: "something"})

app.post("/login", async (req, res) => {
  getUser.loginUser(req.body)
    .then((data, err) => {
      req.session.email = data.email;
      res.status(200);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
});
app.post("/logout", async (req, res) => {
  req.session.destroy();

  res.redirect("/");
});

app.listen(process.env.PORT || port);
