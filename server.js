const express = require("express"),
  mongodb = require("mongodb"),
  dotenv = require("dotenv").config(),
  app = express();

/* ------------------- EXPRESS  ------------------- */

const router = require("./app/app.routes");

/* Sets up routers for index.html */
app.use("/", router);

/* Serves files in the directory named 'app' */
app.use(express.static("app"));

/* Parses incoming JSON request and puts the parsed data in req obj */
app.use(express.json());

/* Listens for any connection on the given port */
app.listen(process.env.DEV_PORT);

/* ------------------- MONGODB  ------------------- */

/* Construct URI connection to MongoDB */
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db(process.env.DB).collection(process.env.TASK_MANAGER);
  })
  .then((__collection) => {
    // store reference to collection
    collection = __collection;
    // blank query returns all documents
    return collection.find({}).toArray();
  })
  .then(console.log);
