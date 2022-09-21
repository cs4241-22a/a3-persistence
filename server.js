require("dotenv").config();
const express = require("express"),
  app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const hbs = require("express-handlebars").engine;
const path = require("path");
const passport = require("passport");

const appRouter = require("./app/routes/app.routes");

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
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");
app.set("views", dir);

app.use("/", appRouter);
app.use(express.static(dir));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.DEV_PORT);
