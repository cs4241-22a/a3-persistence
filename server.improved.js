const express = require("express");
const app = express();
const passport = require("passport");
const expressSession = require("express-session");
const connectEnsureLogin = require("connect-ensure-login");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bodyParser = require('body-parser');


app.use(require("cookie-parser")())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const UserSchema = new Schema ({
  username: String,
  _id: String,
  gradYear: String,
  foodChoice: String,
})

const User = mongoose.model("User", UserSchema);

mongoose.connect("mongodb+srv://zsarrett:CiwsGwDSTHN3Js2H@serverlessinstance0.vzpbd.mongodb.net/?retryWrites=true&w=majority")


//app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: "test",
    cookie: {
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const GitHubStrategy = require("passport-github").Strategy;
passport.use(
  new GitHubStrategy(
    {
      clientID: "30bb80c6001c4c66bbe0",
      clientSecret: "6a532651a275db8c1d412daaff22023fd1a6d7db",
      callbackURL: "https://a3-zsarrett.glitch.me/OAuth/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const name = profile.username
      const id = profile.id
      
      const getUser = await User.findById(id)
      if (getUser === null) {
       const newUser = new User({_id:id, username: name})
       await newUser.save()
        return cb(null, newUser)
      } else {
      return cb(null, getUser);
    }
    }
  )
);


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.get("/OAuth/github", passport.authenticate("github"));

app.get(
  "/OAuth/callback",
  passport.authenticate("github", { failureRedirect: "error.html" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.get("/", connectEnsureLogin.ensureLoggedIn(), (request, response) => {
    response.sendFile(__dirname + "/public/main.html");
});

app.get("/login", connectEnsureLogin.ensureLoggedOut(), (request, response) => {
  response.sendFile(__dirname + "/public/login.html");
});

app.get("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


app.post("/submit", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
  const user = await User.findById(request.user._id)
  user.gradYear = request.body.yourgradyear
  user.foodChoice = request.body.food
  await user.save()
  response.end()
})

app.get("/data", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
  const allUsers = await User.find()
  response.json(allUsers.filter(u => u.foodChoice!=="" && u.gradYear!== ""))
})

app.post("/delete", connectEnsureLogin.ensureLoggedIn(), async (request, response) => {
  console.log("Deltee")
  const user = await User.findById(request.user._id)
  user.gradYear = ""
  user.foodChoice = ""
  await user.save()
  response.end()
})

app.use(express.static("public"));

app.listen(process.env.PORT || 3000);

















/*
    let newTableData = JSON.parse(dataString);
    if (newTableData.yourgradyear == 2023) {
      newTableData.class = "Senior";
    } else if (newTableData.yourgradyear == 2024) {
      newTableData.class = "Junior";
    } else if (newTableData.yourgradyear == 2025) {
      newTableData.class = "Sophomore";
    } else if (newTableData.yourgradyear == 2026) {
      newTableData.class = "Freshman";
    }

    jsonList.push(newTableData);
    //console.log(jsonList);
*/
