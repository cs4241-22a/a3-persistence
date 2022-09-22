require('dotenv').config();
const express = require( 'express' ),
      app = express(),
      cookie  = require( 'cookie-session' ),
      hbs = require( 'express-handlebars' ).engine,
      crypto = require("crypto"),
      path = require('path'); 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use( express.urlencoded({ extended:true }) )
//Keys from https://stackoverflow.com/a/69358886

const key1 = crypto.randomBytes(64).toString("hex");
const key2 = crypto.randomBytes(64).toString("hex");
app.use( cookie({
  name: 'AllYourStuff',
  keys: [key1, key2]
}))

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views','./public')

let db = null;

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'AllYourStuff' )
  })
  .then( _db => {
    // store reference to collection
    db = _db;
  });

let currUser = null;

app.post( '/login', (req,res)=> {
  db.collection("Admin_Logins").find({ }).toArray()
    .then(result => {
      let loginFound = false;
      for(let login of result) {
        if(login.user === req.body.username && login.pwd === req.body.password) {
          loginFound = true;
        }
      }

      if(loginFound) {
        req.session.login = true;
        res.redirect('index.html');
        currUser = req.body.username;
      }else{
        req.session.login = false;
        res.render('login', { msg:'login failed, please try again', layout:false })
      }
    });
})

app.post( '/register', (req,res)=> {
  db.collection("Admin_Logins").find({ }).toArray()
    .then(result => {
      let userFound = false;
      for(let login of result) {
        if(login.user === req.body.username) {
          userFound = true;
        }
      }

      if(req.body.username === "" || req.body.password === "" || req.body.password === "password") {
        req.session.login = false;
        res.render('login', { msg:'This login is invalid', layout:false })
      } else if(!userFound) {
        // Register new user
        req.session.login = true;
        db.collection("Admin_Logins").insertOne({ user: req.body.username, pwd: req.body.password});
        currUser = req.body.username;
        res.redirect('index.html');
      } else {
        req.session.login = false;
        res.render('login', { msg:'This account already exists', layout:false })
      }
    });
});

app.post('/currentUser', (req, res) => {
  if(currUser == null) {
    res.json({user: "_none_"});
  } else {
    res.json({user: currUser});
  }
})

app.get('/robots.txt', express.static('public'), (req, res) => {
  res.sendFile(__dirname + '/public/robots.txt');
})

app.get( '/', (req,res) => {
    res.render( 'login', { msg:'', layout:false })
})
app.use( function( req,res,next) {
  if(req.session.login) {
    next();
  } else {
    res.render('login', { msg:'login failed, please try again', layout:false })
  }
})
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/logout',  function (req, res)  {
  if (req.session.login) {
    req.session.login = false;
    res.redirect('/');
  }else{
    res.redirect('/');
  }
});

app.use(express.static('public'));
app.use(express.json());

let currCollection = null;

app.use( (req,res,next) => {
    if( db !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
})

app.post( '/addCollection', (req,res) => {
  if( db !== null ) {
    db.createCollection(req.body.collectionName, (err => {
      if(err != null) {
        res.json({error: err.codeName})
      } else {
        res.json({error: "none"});
      }
    }));
  }
});

app.post( '/collNames', (req,res) => {
  if( db !== null ) {
    db.listCollections().toArray().then(result => res.json(result));
  }
})

app.post( '/items', (req,res) => {
    if( db !== null ) {
      currCollection = db.collection(req.body.collectionName);
      // get array and pass to res.json
      currCollection.find({ }).toArray().then( result => res.json(result))
    }
})

app.post( '/additem', (req,res) => {
  // assumes only one object to insert
  currCollection.insertOne( req.body ).then( result => res.json( result ) )
})

app.post( '/deleteitem', (req,res) => {
  currCollection
    .deleteOne({ _id: ObjectId(req.body._id) })
    .then( result => res.json( result ) )
})

app.post( '/updateitem', (req,res) => {
  currCollection
    .updateOne(
      { _id: ObjectId( req.body._id ) },
      { $set:{ name:req.body.name, dateCol:req.body.dateCol, link:req.body.link } }
    )
    .then( result => res.json( result ) )
})

app.listen( process.env.PORT || 3000 )