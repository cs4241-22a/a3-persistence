require("dotenv").config();
const crypto = require("crypto");
const { randomBytes } = require("crypto");
//const { dirname } = require("path");
const { MongoClient } = require("mongodb");
const { request } = require("http");
//const { nextTick } = require("process");
//GitHub OAuth
const passport = require("passport");
const GitHubStrategy = require("passport-github2");

const express = require("express"),
  session = require("express-session"),
  handlebars = require("express-handlebars").engine;

const mongoURI =
  "mongodb+srv://" +
  process.env.DBUSER +
  ":" +
  process.env.DBPASS +
  "@" +
  process.env.DBHOST;

const monogOptions = {
  keepAlive: true,
  keepAliveInitialDelay: 6000,
};
console.log(mongoURI);
const dbClient = new MongoClient(mongoURI, monogOptions);

const app = express();
const port = 3000;

app.use(
  session({
    secret: "process.env.SESSIONSECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
      name: "session",
      keys: ["randomBytes(16)", "yesIKnowTheFunctionDoesntWorkLikeThat"],
      httpOnly: true,
      secure: false,
      maxAge: 3 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));

// we're going to use handlebars, but really all the template
// engines are equally painful. choose your own poison at:
// http://expressjs.com/en/guide/using-template-engines.html

app.engine(
  "handlebars",
  handlebars({
    extname: "handlebars",
    defaultLayout: "index",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views/layouts");

app.get("/", (req, res) => {
  res.render("index", { msg: "", layout: false });
});

app.get("/login", (req, res) => {
  if (
    req.session.user === undefined &&
    req.session.passport === undefined
  ) {
    res.render("login", { msg: "", layout: false });
  } else {
    res.redirect("/accountPage");
  }
});

app.post("/login", (req, res) => {
  if (
    req.session.user === undefined &&
    req.session.passport === undefined
  ) {
    req.on("data", (data) => {
      console.log("DATA: " + data);
      const userData = JSON.parse(data);
      userData.password = crypto
        .createHash("sha256")
        .update(userData.password)
        .digest("hex");
      //console.log(crypto.createHash('sha256').update(userData.password).digest('hex'))
      checkUser(userData, res).then((record) => {
        console.log("\n\n" + record + "\t" + record.length);
        if (record.length > 0) {
          console.log("rendering");
          req.session.user = { id: record._id, fName: record[0].fName, lName: record[0].lName };
          console.log(req.session.user);
          res.redirect("/accountPage");
        }
        else{

        }
      });
    });
  } else {
    res.redirect("/accountPage");
  }
});

app.get("/accountPage", (req, res) => {
  if (req.session.user !== undefined)
    res.render("accountPage", {
      userName: req.session.user.fName,
      layout: false,
    });
  else {
    res.render("accountPage", {
      userName: req.session.passport.user.displayName,
      layout: false,
    });
  }
});

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("start up");
});

//Database Code
async function checkUser(credJSON) {
  const record = await dbClient
    .connect()
    .then(() => {
      console.log("request data");
      return dbClient.db("UserCreds").collection("usercreds");
    })
    .then((__collection) => {
      return (userRec = __collection.find(credJSON).toArray());
    })
    .then((userRec) => {
      console.log(userRec);
      return userRec;
    });
  return record;
}
async function insertUser(userCreds) {
  try {
    const database = dbClient.db("UserCreds");
    const userCredsColl = database.collection("usercreds");
    // create a document to insert
    const result = await userCredsColl.insertOne(userCreds);
    console.log("A document was inserted with the _id: ${result.insertedId}");
  } finally {
    await dbClient.close();
  }
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: "73d93ea80973ea5b6bce",
      clientSecret: "13ae4a573c8e6f06afeccdedb888e744c7236184",
      callbackURL: "/auth/GitHub/return",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      cb(null, profile);
    }
  )
);

app.get(
  "/auth/GitHub",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/GitHub/return",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log("Github login: " + req.session.passport.user._json.login);
    const userCreds = {
      type: "GitHub",
      login: req.session.passport.user._json.login,
      GitHubId: req.session.passport.user._json.id,
      GitHubDisplayName: req.session.passport.user.displayName,
    };
    const userExists = await checkUser(userCreds);
    if (userExists.length > 0) {
      console.log("USER DOES EXIST");
    } else {
      console.log("USER DOES NOT EXIST");
      await insertUser(userCreds);
    }

    res.render("accountPage", {
      userName: req.session.passport.user.displayName,
      layout: false,
    });
  }
);
