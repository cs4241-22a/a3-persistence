const express = require("express"),
  session = require("express-session"),
  ejs = require("ejs"),
  mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  User = require("./models/users"),
  helmet = require("helmet"),
  app = express();

var loggedIn = "cole";

//connect to mongoDB
const dbURI =
  "mongodb+srv://ceoue:root@cluster0.f0fhly8.mongodb.net/userdata?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// MIDDLEWARE
// serve up static files in the directory public
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "securekey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTES
app.post("/add-course", (req, res) => {
  console.log(req)
  const user = { name: loggedIn };

  User.findOneAndUpdate(
    {
      name: loggedIn,
    },
    {
      $push: {
        courses: req.body,
      },
    }
  )
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      User.find({name: loggedIn}, function (err, users) {
        console.log(users[0].assignments);
        res.render("main", {
          courses: users[0].courses,
          assignments: users[0].assignments,
        });
      });
    });
});

app.post("/add-assignment", (req, res) => {
  const user = { name: loggedIn };

  User.findOneAndUpdate(
    {
      name: loggedIn,
    },
    {
      $push: {
        assignments: req.body,
      },
    }
  )
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      User.find({ name: loggedIn }, { _id: 0, assignments: 1 });
    })
    .then((assignments) => {
      User.find({name: loggedIn}, function (err, users) {
        console.log(users[0].assignments);
        res.render("main", {
          courses: users[0].courses,
          assignments: users[0].assignments,
        });
      });
    });
});

app.post("/login", async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);

  User.find({ name: req.body.username }, async function (err, users) {
    if (users[0] == null) {
      console.log("User does not exist. Creating new account");
      const user = new User({
        name: req.body.username,
        password: hashedPass,
        courses: [],
        assignments: [],
      });

      user
        .save()
        .then((result) => {
          res.render("index", {
            message: "New account created. Please log in.",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //User already exists
      try {
        if (await bcrypt.compare(req.body.password, users[0].password)) {
          console.log("passwords match");
          loggedIn = req.body.username;
          User.find({ name: req.body.username }, function (err, users) {
            res.render("main", {
              courses: users[0].courses,
              assignments: users[0].assignments,
            });
          });
        } else {
          res.render("index", { message: "Incorrect password." });
        }
      } catch {
        res.status(500).send();
      }
    }
  });
  //   .toArray().then(result => {
  // if (result.length >= 1) {
  //   console.log("user exists")
  // } else {
  //   console.log("user does not exist")
  // }
  // })

  // const user = { username: req.body.username, password: req.body.password}
  // User.push(user)
  // User.exists({ name: req.body})
});

app.get("/add-user", (req, res) => {
  const user = new User({
    name: "cole",
    password: "root",
    courses: ["Webware"],
    assignments: ["A3"],
  });

  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-users", (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.render("index", { message: "" });
});

app.get("/login", (req, res) => {
  res.render("index", { message: "" });
});
