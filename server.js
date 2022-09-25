require("dotenv").config();
const express = require("express"),
  app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const passport = require("passport");
const fetch = require("node-fetch");

const { router: authRouter, checkAuthentication } = require("./routes/auth");
const { User, Task } = require("./models");
const taskRouter = require("./routes/task");

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected!");
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ------------- HANDLEBARS AND PARTIALS CONFIG ------------- */

debugger;

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    partialsDir: __dirname + "/app/partials/",
  })
);
app.set("view engine", ".hbs");
app.set("views", __dirname + "/app/views/task_manager");

/* ------------- REDIRECTS AND ROUTER CONFIG ------------- */

app.use("/login", authRouter);
app.use("/logout", (req, res) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

app.use("/css", express.static("app/css"));
app.use("/img", express.static("app/img"));
app.use("/js", express.static("app/js"));
app.use("/task", checkAuthentication, taskRouter);
app.use(["/", "/load"], checkAuthentication, async (req, res) => {
  const data = await Task.find({ user: req.user }).lean();
  res.render("index", { data, layout: false });
});

app.listen(process.env.DEV_PORT);
