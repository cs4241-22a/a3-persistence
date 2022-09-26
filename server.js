const express = require("express"),
  mongodb = require("mongodb"),
  cookie = require("cookie-session"),
  compression = require("compression"),
  helmet = require("helmet"),
  morgan = require('morgan'),
  app = express();

let currName = "";
let currPass = "";

// MongoDB Cloud Database Information
const uri =
  "mongodb+srv://" +
  process.env.USER +
  ":" +
  process.env.PASS +
  "@" +
  process.env.HOST;
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let collection = null;

client
  .connect()
  .then(() => {
    console.log("Finding Collection");
    return client.db("userdata").collection("scores");
  })
  .then((__collection) => {
    // store reference to collection
    collection = __collection;
    // blank query returns all documents
    console.log("Collection found");
    return collection.find({}).toArray();
  })
  .then(console.log);

// Cookies Login
// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use(express.urlencoded({ extended: true }));
// cookie middleware! The keys are used for encryption and should be
// changed
app.use(
  cookie({
    name: "session",
    keys: ["key1", "key2"],
  })
);
// Main Pages
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.json());
// Custom middleware that checks if collection exists
app.use((req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    res.status(503).send();
  }
});
// Compress all responses
app.use(compression());
// Sets various HTTP headers
app.use(helmet());
// HTTP request logger
app.use(morgan('combined'));

/*
 * Post requests
 */
app.post("/register", (req, res) => {
  console.log("Registering User");
  console.log(req.body);

  collection
    .find({ name: req.body.name })
    .toArray()
    .then((result) => {
      if (result.length >= 1) {
        // user already exists, redirect back to login page
        req.session.login = false;
        console.log("User already exists");
        res.sendFile(__dirname + "/views/index.html");
      } else {
        req.session.login = true;
        currName = req.body.name;
        req.session.name = req.body.name;
        currPass = req.body.password;
        req.session.password = req.body.password;
        collection.insertOne(
          JSON.parse(
            '{"name":"' +
              req.session.name +
              '" , "password":"' +
              req.session.password +
              '" , "score": 0, "rock": 0, "paper": 0, "scissors": 0, "most_used": "Rock"}'
          )
        );
        console.log("Successful registration");

        // since login was successful, send the user to the main content
        // use redirect to avoid authentication problems when refreshing
        // the page or using the back button, for details see:
        // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern
        res.redirect("/main.html");
      }
    });
});

app.post("/login", (req, res) => {
  // form field and the value is whatever the user entered
  console.log("User Login");
  console.log(req.body);

  collection
    .find({ name: req.body.name, password: req.body.password })
    .toArray()
    .then((result) => {
      // define a variable that we can check in other middleware
      // the session object is added to our requests by the cookie-session middleware
      if (result.length >= 1) {
        req.session.login = true;
        currName = req.body.name;
        req.session.name = req.body.name;
        currPass = req.body.password;
        req.session.password = req.body.password;
        console.log("Successful login");

        // since login was successful, send the user to the main content
        // use redirect to avoid authentication problems when refreshing
        // the page or using the back button, for details see:
        // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern
        res.redirect("/main.html");
      } else {
        // password incorrect, redirect back to login page
        req.session.login = false;
        console.log("Incorrect username or password");
        res.sendFile(__dirname + "/views/index.html");
      }
    });
});

app.post("/submit", (req, res) => {
  // assumes only one object to insert
  let dataString = "";

  req.on("data", function (data) {
    dataString += data;
  });

  req.on("end", function () {
    let newData = JSON.parse(dataString);
    console.log(JSON.parse(dataString));

    // Set name and password
    newData.name = currName;
    newData.password = currPass;

    // Find most frequently used option and create a derived field with that information
    const mostPlayed = getMostPlayed(
      newData.rock,
      newData.paper,
      newData.scissors
    );
    newData.most_used = mostPlayed;

    collection.insertOne(newData).then((result) => res.json(result));
  });
});

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post("/deleteSubmit", (req, res) => {
  console.log("Deleting submitted data ", req.body);
  collection
    .deleteOne({ _id: mongodb.ObjectId(req.body.id) })
    .then((result) => res.json(result));
});

app.post("/update", (req, res) => {
  console.log("Updating submitted data ", req.body);
  collection
    .updateOne(
      { _id: mongodb.ObjectId(req.body.id) },
      { $set: { most_used: req.body.most_used } }
    )
    .then((result) => res.json(result));
});

/*
 * Get requests
 */
app.get("/getAll", (req, res) => {
  if (collection !== null) {
    // get array and pass to res.json
    console.log("Getting entire collection for user page");
    collection
      .find({ name: currName })
      .toArray()
      .then((result) => res.json(result));
  }
});

function getMostPlayed(totalRock, totalPaper, totalScissors) {
  const vals = [totalRock, totalPaper, totalScissors];

  // j stores the highest value within the array
  let j = 1;
  for (let i = 0; i < vals.length; i++) {
    if (vals[i] > vals[j]) {
      j = i;
    }
  }

  // Sets the correct string value and returns it
  let mostPlayed = "";
  switch (j) {
    case 0:
      return (mostPlayed = "Rock");
      break;
    case 1:
      return (mostPlayed = "Paper");
    case 2:
      return (mostPlayed = "Scissors");
  }
}

app.listen(process.env.PORT);
