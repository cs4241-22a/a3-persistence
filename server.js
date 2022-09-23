const express = require("express"),
  mongodb = require("mongodb"),
  cookie = require("cookie-session"),
  dotenv = require("dotenv"),
  app = express();

dotenv.config();

//=========DATABASE===========
const uri = process.env.DB_URI;
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let collection = null;

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db("Users").collection("user");
  })
  .then((__collection) => {
    // store reference to collection
    collection = __collection;
    // blank query returns all documents
    return collection.find({}).toArray();
  })
  .then(console.log);

//========COOKIES============
app.use(express.urlencoded({ extended: true }));

app.use(
  cookie({
    name: "session",
    keys: ["key1", "key2"],
  })
);

//=======MIDDLEWARE=========
//To check connection
app.use((req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    res.status(503).send();
  }
});

//To serve static files and serve json
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("views"));

//=========AUTHENTICATION==========
app.post("/login", (req, res) => {
	// express.urlencoded will put your key value pairs
	// into an object, where the key is the name of each
	// form field and the value is whatever the user entered
	console.log(req.body);
	const inputUname = req.body.uname
	const inputPword = req.body.uname

	// below is *just a simple authentication example*
	// for A3, you should check username / password combos in your database

	if (req.body.uname === collection.find(req.body.uname)) {
		// define a variable that we can check in other middleware
		// the session object is added to our requests by the cookie-session middleware
		req.session.login = true;

		//res.redirect("main.html");
		console.log("log in successful!")
	} else {
		// password incorrect, redirect back to login page
		res.sendFile(__dirname + "/views/index.html");
	}
});


//Add a user
app.post("/signUp", (req, res) => {
	console.log(req.body);
	collection.insertOne(req.body).then((result) => res.json(result));
  });

//Remove a user
app.post("/delete", (req, res) => {
  collection
    .deleteOne({ _id: mongodb.ObjectId(req.body._id) })
    .then((result) => res.json(result));
});

//Update a user
app.post("/update", (req, res) => {
  collection
    .updateOne(
      { _id: mongodb.ObjectId(req.body._id) },
      { $set: { name: req.body.name } }
    )
    .then((result) => res.json(result));
});

app.use(function(req,res,next){
	if(req.session.login === true)
		next()
	else
		res.sendFile( __dirname + '/views/index.html')
})

app.listen(3000, () => console.log("Server started succesfully!"));
