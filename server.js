// server side script

const express = require( 'express' ),
      cookie  = require( 'cookie-session' ),
      mongodb = require( 'mongodb'),
      bodyParser = require( 'body-parser'),
      app     = express()

app.use( express.urlencoded({ extended:true }) )
app.use( express.json() )

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

// connect mongodb
const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'logbook' ).collection( 'log1' )
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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/main", (req, res) => {
  res.sendFile(__dirname + "/views/main.html");
});

app.listen( 3000 )

app.use( (req, res, next) => {
  if (collection !== null) {
    next()
  }
  else {
    res.status (503).send()
  }
})

// POST register
app.post("/register", bodyParser.json(), ( req, res ) => {
  collection
    .find({user: req.body.user})
    .toArray()
    .then(result => {
    if (result.length >= 1) {
      res.json({login: false});
    }
    else {
      let newUser = {
        user: req.body.user,
        password: req.body.password,
        logs: []
      };
      
      collection.insertOne(newUser);
      req.session.user = req.body.user;
      req.session.login = true;
      res.json({login: true});
      res.redirect("main")
    }
  })
})

// POST login
app.post("/login", bodyParser.json(), ( req, res) => {
  collection
    .find({user: req.body.user, password: req.body.password})
    .toArray()
    .then( result => {
      if (result.length >= 1) {
        req.session.user = req.body.user;
        req.session.login = true;
        res.json({login: true});
        res.redirect("main")
      }
      else {
        res.json({login: false});
        res.redirect("/")
      }
  })
})

// POST logout
app.post("/logout", bodyParser.json(), ( req, res ) => {
  if (req.session.login == true) {
    req.session.user = "";
    req.session.login= false;
    res.json({logout: true});
  }
  else {
    res.json({logout: false});
  }
})

// GET getLog
app.get("/getLog", bodyParser.json(), ( req, res ) => {
  collection
    .find({user: req.session.user})
    .toArray()
    .then( result => {
      let logs = result[0].entries;
      res.json(logs);
  })
})

// POST log
app.post("/log", bodyParser.json(), ( req, res) => {
  collection
    .find({user: req.session.user})
    .toArray()
    .then( result => {
      let logs = result[0].entries;
      logs.push({
        date: req.body.date,
        time: req.body.time,
        meters: req.body.meters
      });
    
    collection.updateOne(
    {_id: mongodb.ObjectId(result[0]._id)},
    {$set: {logs: logs}}
    )
    res.json(logs);
  })
})