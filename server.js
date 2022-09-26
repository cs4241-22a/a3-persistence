require("dotenv").config();
const crypto = require("crypto");
const { randomBytes } = require("crypto");
const { MongoClient } = require("mongodb");
const { request } = require("http");
const errorHandler = require("errorhandler");

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

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
  if (req.session.user === undefined) {
    res.render("login", { msg: "", layout: false });
  } else {
    res.redirect("/accountPage");
  }
});

app.post("/login", (req, res) => {
  if (req.session.user === undefined) {
    req.on("data", (data) => {
      const userData = JSON.parse(data);
      userData.password = crypto
        .createHash("sha256")
        .update(userData.password)
        .digest("hex");
      checkUser(userData, res).then((record) => {
        if (record.length > 0) {
          req.session.user = {
            id: record[0]._id,
            name: record[0].fName + " " + record[0].lName,
            admin: record[0].admin,
          };
          res.redirect("/accountPage");
        } else {
        }
      });
    });
  } else {
    res.redirect("/accountPage");
  }
});

app.get("/accountPage", async (req, res) => {
  if (req.session.user !== undefined) {
    if (req.session.user.admin) {
      results = await getAllSurveyResults();
    } else {
      results = await getSurveyResults(req.session.user.id);
    }
    res.render("accountPage", {
      userName: req.session.user.name,
      array: results,
      layout: false,
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/submitResponse", (req, res) => {
  if (req.session.user !== undefined || req.session.passport !== undefined) {
    res.render("perrySurvey", { layout: false });
  } else {
    res.redirect("/login");
  }
});

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || port, () => {
  console.log("start up");
});

//Database Code
async function checkUser(credJSON) {
  const record = await dbClient
    .connect()
    .then(() => {
      return dbClient.db("UserCreds").collection("usercreds");
    })
    .then((__collection) => {
      return (userRec = __collection.find(credJSON).toArray());
    })
    .then((userRec) => {
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
  } finally {
    await dbClient.close();
  }
}

async function getSurveyResults(id) {
  console.log("getSurveyResults: " + id);
  const record = await dbClient
    .connect()
    .then(() => {
      return dbClient
        .db("survAye")
        .collection("surveys")
        .find({ name: "Perry", "userData.user": id })
        .project({ userData: 1 })
        .toArray();
    })
    .then((userRec) => {
      console.log('userRec:\n'+ userRec)
      return userRec;
    });
  return record;
}
async function getAllSurveyResults() {
  const record = await dbClient
    .connect()
    .then(() => {
      return dbClient
        .db("survAye")
        .collection("surveys")
        .find({ name: "Perry" })
        .project({ userData: 1 })
        .toArray();
    })
    .then((userRec) => {
      return userRec;
    });
  return record;
}
async function getSurveyResult(id) {
  const record = await dbClient
    .connect()
    .then(() => {
      return dbClient
        .db("survAye")
        .collection("surveys")
        .find({ name: "Perry", "userData.user": id })
        .project({ userData: 1 })
        .toArray();
    })
    .then((userRec) => {
      if (userRec.length > 0) userRec = userRec[0];
      return userRec;
    });
  console.log("\n\nGET SURVEY " + id + "\n" + record);
  return record;
}

async function deleteResult(id) {
  debugger;
  try {
    const record = await dbClient.connect().then(() => {
      return dbClient
        .db("survAye")
        .collection("surveys")
        .deleteOne({ name: "Perry", "userData.user": id.user });
    });

    return record;
  } catch (err) {
    console.log(err);
  }
}

// Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUBCLIENTID,
      clientSecret: process.env.GITHUBSECRET,
      callbackURL: "https://survaye.herokuapp.com/auth/GitHub/return",
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

app.get(
  "/auth/GitHub",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send(400, "Log Out Failed");
      }
    });
    res.redirect("/");
  } else {
    res.status(401);
    res.send("Not signed in");
  }
});

app.get(
  "/auth/GitHub/return",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    const userCreds = {
      type: "GitHub",
      login: req.session.passport.user._json.login,
      GitHubId: req.session.passport.user._json.id,
      GitHubDisplayName: req.session.passport.user.displayName,
    };
    let userExists = await checkUser(userCreds);
    if (userExists.length > 0) {
      console.log("USER DOES EXIST");
      req.session.user = {
        id: userExists[0]._id,
        name: userExists[0].GitHubDisplayName,
        admin: userExists[0].admin,
      };
    } else {
      console.log("USER DOES NOT EXIST");
      await insertUser(userCreds);
      await (checkUser(userCreds).then((record) => {
        req.session.user = {
          id: record[0]._id,
          name: record[0].GitHubDisplayName,
          admin: record[0].admin,
        };
      }))
    }

    if (req.session.user !== undefined) {
      res.render('GitHubSignInSucc', {user: req.session.user.name, layout: false})
    } else {
      res.redirect("/login");
    }
  }
);

//Survey
app.use(express.json());
app.post("/submitSurvey", (req, res) => {
  req.on("data", (data) => {
    data = JSON.parse(data);
    data = handleMajors(data);

    if (req.session.user !== undefined) {
      data.user = req.session.user.id;
      submitUserData(data).then(res.redirect("/accountPage"));
    } else {
      res.status(401).redirect("/login");
    }
  });
});

function handleMajors(userData) {
  let Majors = [];
  if (userData.hasOwnProperty("majorCS")) {
    Majors.push("majorCS");
    delete userData.majorCS;
  }
  if (userData.hasOwnProperty("majorRBE")) {
    Majors.push("majorRBE");
    delete userData.majorRBE;
  }
  if (userData.hasOwnProperty("majorID")) {
    Majors.push("majorID");
    delete userData.majorID;
  }
  if (userData.hasOwnProperty("majorME")) {
    Majors.push("majorME");
    delete userData.majorME;
  }
  if (userData.hasOwnProperty("majorECE")) {
    Majors.push("majorECE");
    delete userData.majorECE;
  }
  if (userData.hasOwnProperty("majorOther")) {
    Majors.push("majorOther");
    delete userData.majorOther;
  }
  userData = { ...userData, Majors };
  return userData;
}

async function submitUserData(userData) {
  await dbClient.connect().then(() => {
    const database = dbClient.db("survAye").collection("surveys").updateOne(
      { name: "Perry", "userData.user": userData.user },
      {
        $set: { userData },
      },
      {
        upsert: true,
      }
    );
  });
}

app.post("/editEntry", (req, res) => {
  if (req.session.user === undefined) {
    res.redirect("/");
  } else {
    req.on("data", (data) => {
      req.session.edit = new TextDecoder("utf-8").decode(data);
      res.redirect("/edit");
    });
  }
});

app.get("/edit", async (req, res) => {
  getSurveyResult(req.session.edit).then((entry) => {
    res.render("edit", { entry: entry, layout: false });
  });
});

app.post("/submitEdit", (req, res) => {
  if (req.session.user === undefined) {
    res.redirect("/");
  } else {
    req.on("data", (data) => {
      data = JSON.parse(data);
      data = handleMajors(data);
      const reformat = data.user;
      delete data.user;
      data.user = reformat;
      submitUserData(data);
      res.redirect("/accountPage");
    });
  }
});

app.post("/deleteEntry", (req, res) => {
  if (req.session.user === undefined) {
    res.redirect("/");
  } else {
    req.on("data", (data) => {
      data = JSON.parse(data);
      deleteResult(data);
      res.redirect("/accountPage");
    });
  }
});
