const express = require( 'express' ),
      expression = require( 'express-session' ),
      mongodb = require( 'mongodb' ),
      bodyParser = require( 'body-parser' ),
      passport = require("passport"),
      educationConnection = require("connect-ensure-login"),
      mongoose = require("mongoose"),
        { Schema } = mongoose,
      cookieS = require( 'cookie-session' ),
      cookieP = require( 'cookie-parser' ),
      app = express()

app.use(express.static("public"));

//const loginfo = 'mongodb+srv://'+'OwenPfann:'+process.env.mongodbpw+'@a3webware.2dflc.mongodb.net/?retryWrites=true&w=majority'

//const client = new mongodb.MongoClient(loginfo, { useNewUrlParser: true, useUnifiedTopology: true})

const craftySchema = new Schema ({
  username: String,
  userID: String,
  song: String
})

const user = mongoose.model("user", craftySchema);

mongoose.connect('mongodb+srv://'+'OwenPfann:'+process.env.mongodbpw+'@a3webware.2dflc.mongodb.net/?retryWrites=true&w=majority');

app.use(expression({
  secret: "test",
  cookie: {},
  resave: false,
  saveUninitialized: false,})
);

app.use(passport.initialize());
app.use(passport.session());

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.serializeUser(function (user, done) {
  done(null, user);
});

const gitGoing = require("passport-github").Strategy;
console.log("gitGoing");
passport.use(new gitGoing({
      clientID: "b5313deb87bf738acb5b",
      clientSecret: "96634ee49817f244ed6d91634cfe9a049d881e0c",
      callbackURL: "https://a3-persistence-owenpfann.glitch.me/OAuth/callback",
    },
               
    async function (accessToken, refreshToken, profile, cb) {
      const name = profile.username
      const id = profile.userID
      
      const getUser = await user.findById(id)
      if (getUser === null) {
       const newUser = new user({userID:id, username: name})
       await newUser.save()
        return cb(null, newUser)
      } else {
        return cb(null, getUser);
      }
  }));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/login.html");
  console.log("got")
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/OAuth/github", passport.authenticate("github"));

app.get(
  "/OAuth/callback",
  passport.authenticate("github", { failureRedirect: "error.html" }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("yourspace1");
    res.redirect("/");
  }
);

app.get("/", educationConnection.ensureLoggedOut(), (request, response) => {
  console.log("yourspace");
  response.sendFile(__dirname + "/yourspace.html");
});

app.get("/login", educationConnection.ensureLoggedIn(), (request, response) => {
  console.log("index");
  response.sendFile(__dirname + "/login.html");
});

//app.listen( process.env.PORT || 3000 )