const express = require("express"),
  cookie = require("cookie-session"),
  hbs = require("express-handlebars").engine,
  app = express(),
  bodyP = require("body-parser"),
  mongodb = require("mongodb");

var http = require('http');
var enforce = require('express-sslify');



//   var fav = require("serve-favicon");
// app.use(fav(""))
const helmet = require("helmet");
app.use(helmet());
app.use(enforce.HTTPS({ trustProtoHeader: true }))
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
const appdata = [];
debugger;
const uri =
  "mongodb+srv://poz123:Y7XKfgrMONl1V8Bz@a3.xtfv8bl.mongodb.net/?retryWrites=true&w=majority";

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let collection = "A3";

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db("A3").collection("a3");
  })
  .then((__collection) => {
    // store reference to collection
    collection = __collection;
    // blank query returns all documents
    return collection.find({}).toArray();
  })
  .then(console.log);

// route to get all docs
// app.get( '/', (req,res) => {
//   if( collection !== null ) {
//     // get array and pass to res.json
//     collection.find({ }).toArray().then( result => res.json( result ) )
//   }
// })

app.use((req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    res.status(503).send();
  }
});

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.

// app.post("/update", (req, res) => {
//   collection
//     .updateOne(
//       { _id: mongodb.ObjectId(req.body._id) },
//       { $set: { data: req.body.data } }
//     )
//     .then((result) => res.json(result));
// });
// we're going to use handlebars, but really all the template
// engines are equally painful. choose your own poison at:
// http://expressjs.com/en/guide/using-template-engines.html
app.engine("handlebars", hbs());
app.set("view engine", "handlebars");
app.set("views", "./views");

// cookie middleware! The keys are used for encryption and should be changed
app.use(
  cookie({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.post("/login", (req, res) => {
  // express.urlencoded will put your key value pairs
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered

  // below is *just a simple authentication example*
  // for A3, you should check username / password combos in your database

  var query = { name: req.body.username, password: req.body.password };

  collection
    .find(query)
    .toArray()

    .then((result) => {
      if (result.length >= 1) {
        req.session.login = true;
        req.session.usr = req.body.username;
        res.render("main", {
          msg: "Hello " + req.body.username,
          layout: false,
        });
      } else {
        // cancel session login in case it was previously set to true
        req.session.login = false;
        // password incorrect, send back to login page
        res.render("index", {
          msg: "login failed, please try again",
          layout: false,
        });
      }
    });
});

app.post("/register", (req, res) => {
  const user = {
    name: req.body.username,
    password: req.body.password,
    data: [],
  };
  req.session.usr = user.name;
  console.log(user);
  collection.insertOne(user);
 
});

app.post("/add", bodyP.json(), (req, res) => {
  collection
    .find({ name: req.session.usr })
    .toArray()
    .then((result) => {
      let data = result[0].data;
      data.push({
        first: req.body.data,
        second: req.body.data2,
      });
      collection.updateOne(
        { _id: mongodb.ObjectId(result[0]._id) },
        { $set: { data: data } }
      );
      res.json(data);
    });
});

// assumes only one object to insert
app.post("/delete", bodyP.json(), (req, res) => {
  collection
    .find({ name: req.session.usr })
    .toArray()
    .then((result) => {
      let data = result[0].data;

      if (data[req.body.index]) {
        data.splice(req.body.index, 1);
      }

      collection.updateOne(
        { _id: mongodb.ObjectId(result[0]._id) },
        { $set: { data: data } }
      );
      res.json(data);
    });
});

app.post("/get", (req, res, next) => {
  if (collection !== null) {
    // get array and pass to res.json
    var query = { name: req.body.username, password: req.body.password };
    collection
      .find(query)
      .toArray()
      .then((result) => res.json(result));
  }
});

app.get("/getRatings", bodyP.json(), (req, res) => {
  collection
    .find({ name: req.session.usr })
    .toArray()
    .then((result) => {
      let data = result[0].data;
      res.json(data);
    });
});
app.post("/update", bodyP.json(), (req, res) => {
  console.log("update entry called!");
  collection
    .find({ name: req.session.usr })
    .toArray()
    .then((result) => {
      let data = result[0].data;

      data[req.body.index].first = req.body.data;
      data[req.body.index].second = req.body.data2;

      collection.updateOne(
        { _id: mongodb.ObjectId(result[0]._id) },
        { $set: { data: data } }
      );

      res.json(data);
    });
});

app.get("/", (req, res) => {
  res.render("index", { msg: "", layout: false });
});

app.get("/login", (req, res) => {
  console.log(req.body.username);
  res.render("main", { msg: "Hello " + req.session.usr, layout: false });
});

// add some middleware that always sends unauthenicaetd users to the login page
app.use(function (req, res, next) {
  if (req.session.login === true) next();
  else
    res.render("index", {
      msg: "login failed, please try again",
      layout: false,
    });
});

app.get("/main.html", (req, res) => {
  res.render("main", { msg: "success you have logged in", layout: false });
});
app.listen(3000);
