const express = require("express"),
  mongodb = require("mongodb"),
  cookie = require("cookie-session"),
  dotenv = require("dotenv"),
  helmet = require("helmet"),
  passport = require("passport"),
  session = require("express-session"),
  GitHubStrategy = require("passport-github").Strategy,
  app = express();

dotenv.config();

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

app.use(
  cookie({
    name: "session",
    keys: ["key1", "key2"],
  })
);

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
app.use(express.static("public"));
app.use(express.static("views"));

//To check if the user is authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login.html')
  }
}

//=========AUTHENTICATION==========
//Passport stuff
let gitId = null
app.use(helmet())

app.use(
  session({secret: 'secret', resave: false, saveUninitialized: false, cookie: {httpOnly: true, secure: true, maxAge: 60 * 1000,},})
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, callback) {
  callback(null, user.id);
})

passport.deserializeUser(function (id, callback) {
  callback(null, id);
})

passport.use(
  new GitHubStrategy({
      clientID: process.env.ID,
      clientSecret: process.env.SECRET,
      callbackURL: 'https://a3-arman-saduakas.glitch.me/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
)

app.get('/auth/github', passport.authenticate('github'));
app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login.html' }),
    function (req, res) {
      githubid = req.user.id;
      res.redirect('/main.html')
  }
)

//Routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/login.html')
})

app.get('/main', checkAuthenticated, function (req, res) {
  res.sendFile(__dirname + '/views/main.html')
})

app.get('/logout', function (req, res) {
  res.redirect('/')
})

// //Add a user
// app.post("/signUp", (req, res) => {
// 	console.log(req.body);
// 	collection.insertOne(req.body).then((result) => res.json(result));
//   });

// //Remove a user
// app.post("/delete", (req, res) => {
//   collection
//     .deleteOne({ _id: mongodb.ObjectId(req.body._id) })
//     .then((result) => res.json(result));
// });

//Update a user
// app.post("/update", (req, res) => {
//   collection
//     .updateOne(
//       { _id: mongodb.ObjectId(req.body._id) },
//       { $set: { name: req.body.name } }
//     )
//     .then((result) => res.json(result));
// });

app.use(function(req,res,next){
	if(req.session.login === true)
		next()
	else
		res.sendFile( __dirname + '/views/login.html')
})

app.listen(3000, () => console.log("Server started succesfully!"));
