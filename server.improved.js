const express = require("express"),
  mongodb = require("mongodb"),
  passport = require("passport"),
  expressSession = require("express-session"),
  mongoose = require("mongoose"),
  { Schema } = mongoose,
  connectEnsureLogin = require("connect-ensure-login"),
  app = express();

//app.get('/', (req, res) => res.send('Hello Wordld!'))
app.listen(3000, () => console.log("Example app listening on port 3000!"));

app.use(express.static("public"));
app.use(express.json());

const UserSchema = new Schema ({
  username: String,
  _id: String,
  name: String,
  ratName: String,
})

const User = mongoose.model("User", UserSchema);


mongoose.connect("mongodb+srv://"+process.env.USER+":"+process.env.PASS+"@cluster0."+process.env.HOST+".mongodb.net/?retryWrites=true&w=majority")


app.use(
  expressSession({
    secret: "test",
    cookie: {
    },
    resave: false,
    saveUninitialized: false,
  })
);


const GitHubStrategy = require("passport-github").Strategy;
passport.use(
  new GitHubStrategy(
    {
      clientID: "7f4acfd096a00ff5d677",
      clientSecret: process.env.GITCRET,
      callbackURL: "https://a3-charlie-snow.glitch.me/main",
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


app.post("/submit", async (request, response) => {
  const user = await User.findById(request.user._id)
  user.name = request.body.name
  user.ratName = request.body.ratName
  await user.save()
  response.end()
})

app.get("/data", async (request, response) => {
  const allUsers = await User.find()
  response.json(allUsers.filter(u => u.name !== "" && u.ratName !== ""))
})

app.use(express.static("public"));


app.get("/main",(request, response) => {
  passport.authenticate("github"),
  response.sendFile(__dirname + "/public/main.html");
});

app.get("/", connectEnsureLogin.ensureLoggedOut(), (request, response) => {
  response.sendFile(__dirname + "/public/login.html");
});
app.get("/login", connectEnsureLogin.ensureLoggedOut(), (request, response) => {
  response.sendFile(__dirname + "/public/login.html");
});