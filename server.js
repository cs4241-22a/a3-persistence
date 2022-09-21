require("dotenv").config();
const express = require("express"),
  app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const hbs = require("express-handlebars").engine;
const path = require("path");
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

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname + "/app/views/task_manager"));

app.use("/login", authRouter);
app.use("/task", checkAuthentication, taskRouter);
app.use("/css", express.static("app/css"));
app.use("/img", express.static("app/img"));
app.use("/js", express.static("app/js"));
app.use(["/", "/load"], checkAuthentication, async (req, res) => {
  const data = await Task.find({ user: req.user.id }).lean();

  console.log(data);

  res.render("index", { data, layout: false });
});

app.listen(process.env.DEV_PORT);
