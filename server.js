require("dotenv").config();
const express = require("express"),
  app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const hbs = require("express-handlebars").engine;
const path = require("path");
const passport = require("passport");

const { router: authRouter, checkAuthentication } = require("./routes/auth");

const dir = path.join(__dirname + "/app");

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected!");
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static(dir));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");
app.set("views", dir);

app.use("/login", authRouter);
app.use("/css", express.static("app/css"));
app.use("/img", express.static("app/img"));
app.use("/", checkAuthentication, express.static("app"));

app.listen(process.env.DEV_PORT);
