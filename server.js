// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express"),
      mongodb = require( 'mongodb' ),
      bodyParser = require( 'body-parser' ),
      cookie = require('cookie-session'),
      app = express();

// our default array of dreams
// const dreams = [
//   "Find and count some sheep",
//   "Climb a really tall mountain",
//   "Wash the dishes"
// ];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use( express.json() );
app.use( express.urlencoded({ extended:true }) )
app.use(
  cookie({
    name: "session",
    keys: ["cookie1", "cookie2"]
  })
);

const uri = "mongodb+srv://CS4241:Webware@a3cluster.klzdhtp.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'yfaoua' ).collection( 'ChoreLogger' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )


// route to get all docs

app.get( '/entries', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

app.get("/uname", bodyParser.json(), (request, response) => {
  console.log("get username");
  console.log(request.session.login);
  console.log(request.session.uname);
  response.json({ uname: request.session.uname });
});

app.get("/chores", bodyParser.json(), (request, response) => {
  console.log("get chore")
  collection
    .find({ uname: request.session.uname })
    .toArray()
    .then(result => {
      let entries = result[0].entries;
      console.log(result[0]);
      console.log(entries);
      response.json(entries);
    });
});


// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/logger", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.sendFile(__dirname + "/views/logger.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.post("/register", bodyParser.json(), (request, response) => {
  console.log("create new account");

  collection
    .find({ uname: request.body.uname })
    .toArray()
    .then(result => {
      if (result.length >= 1) {
        console.log(result)
        response.json({ login: false });
      } else {
        //user does not exist, create
        let newUser = {
          uname: request.body.uname,
          pwd: request.body.pwd,
          entries: []
        };

        console.log(newUser);
        collection.insertOne(newUser);
        collection.insertOne(newUser);
        console.log("creating new account");
        console.log(request.body.uname);
        request.session.uname = request.body.uname;
        console.log("name:");
        console.log(request.session.uname);
        console.log(request.session.uname);
        request.session.login = true;
        response.json({ login: true });
      }
    });
});

app.post("/login", bodyParser.json(), (request, response) => {
  console.log("login");
  collection
    .find({ uname: request.body.uname, pwd: request.body.pwd })
    .toArray()
    .then(result => {
      if (result.length >= 1) {
        request.session.uname = request.body.uname;
        request.session.login = true;
        console.log("valid login");
        console.log(request.session.uname);
        response.json({ login: true });
      } else {
        console.log("invalid login")
        response.json({ login: false });
        response
      }
    });
});

app.post("/logout", (request, response) => {
  if(request.session.login == true){
    request.session.login = false;
    console.log("logging out")
    response.json({ logout: true });
  }
  else{
    response.json({ logout: false });
  }
});

app.post("/submitEntry", bodyParser.json(), (request, response) => {
  collection
    .find({ uname: request.session.uname })
    .toArray()
    .then(result => {
      let entries = result[0].entries;
      entries.push({
        hours: request.body.hours,
        chore: request.body.chore
      });

      collection.updateOne(
        { _id: mongodb.ObjectId(result[0]._id) },
        { $set: { entries: entries } }
      );
      response.json(entries);
    });
});


app.post("/deleteEntry", bodyParser.json(), (request, response) => {
  collection
    .find({ uname: request.session.uname })
    .toArray()
    .then(result => {
      let entries = result[0].entries;

      if (entries[request.body.index]) {
        entries.splice(request.body.index, 1);
      }

      collection.updateOne(
        { _id: mongodb.ObjectId(result[0]._id) },
        { $set: { entries: entries } }
      );
      response.json(entries);
    });
});

app.post("/modifyEntry", bodyParser.json(), (request, response) => {
  console.log("modify entry")
  collection
    .find({ uname: request.session.uname })
    .toArray()
    .then(result => {
      let entries = result[0].entries;

      
      console.log(request.body);
      let modifiedEntry = {
        hours: request.body.hours,
        chore: request.body.chore,
        index: request.body.index
      };
      
      console.log(modifiedEntry.mmCount);
      if (entries[request.body.index]) {
        entries[request.body.index] = modifiedEntry;
      }

      collection.updateOne(
        { _id: mongodb.ObjectId(result[0]._id) },
        { $set: { entries: entries } }
      );

      response.json(entries);
    });
});
