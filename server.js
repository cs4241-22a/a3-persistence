const express = require("express"),
  mongodb = require("mongodb"),
  hbs = require("express-handlebars").engine,
  dotenv = require("dotenv").config(),
  path = require("path");
app = express();

app.use(express.urlencoded({ extended: true }));

/* ------------------- HANDLEBARS  ------------------- */

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/app"));

/* ------------------- MONGODB  ------------------- */

/* Construct URI connection to MongoDB */
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let collection;

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db(process.env.DB).collection(process.env.USERS);
  })
  .then((__collection) => {
    // store reference to collection
    collection = __collection;
    // blank query returns all documents
    return collection;
  })
  .then(console.log);

/* ------------------- EXPRESS  ------------------- */

/* Sets up routers for index.html */
app.use("/", require("./app/app.routes"));

/* Serves files in the directory named 'app' */
app.use(express.static(path.join(__dirname + "/app")));

/* Parses incoming JSON request and puts the parsed data in req obj */
app.use(express.json());

/* Listens for any connection on the given port */
app.listen(process.env.DEV_PORT);

/* Check if the connection has been set  */
app.use((req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    res.status(503).send();
  }
});

/* Get all the current entries */
app.get("/init", (req, res) => {
  if (collection !== null) {
    collection
      .find({})
      .toArray()
      .then((result) => res.json(result));
  }
});

/* Add an entry to the collection */
app.post("/add", (req, res) => {
  collection.insertOne(req.body).then((result) => res.json(result));
});

/* Remove entry from collection */
app.post("/remove", (req, res) => {
  collection
    .deleteOne({ _id: mongodb.ObjectId(req.body._id) })
    .then((result) => res.json(result));
});

/* Update an entry in the collection */
app.post("/update", (req, res) => {
  collection
    .updateOne(
      { _id: mongodb.ObjectId(req.body._id) },
      { $set: { name: req.body.name } }
    )
    .then((result) => res.json(result));
});

/* ------------------- LOGIN  ------------------- */
app.post("/login", (req, res) => {
  console.log(req.body);

  const user = req.body.email;

  // if the user exist in the database, check the password against it

  if (false) {
    res.redirect("views/task.html");
  } else {
    res.render("index", {
      msg: "login failed, please try again",
      layout: false,
    });
  }

  //res.render("index", { msg: "login failed, please try again", layout: false });
});

app.get("/", (req, res) => {
  res.render("index", { msg: "", layout: false });
});
