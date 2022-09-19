require('dotenv').config();
const express = require( 'express' ),
      app = express(),
      cookie  = require( 'cookie-session' ),
      hbs = require( 'express-handlebars' ).engine,
      crypto = require("crypto"); 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PWD}@${process.env.HOST}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use( express.urlencoded({ extended:true }) )
//Keys from https://stackoverflow.com/a/69358886
app.use( cookie({
  name: 'AllYourStuff',
  keys: [crypto.randomBytes(64).toString("hex"), crypto.randomBytes(64).toString("hex")]
}))

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views','./public')

app.post( '/login', (req,res)=> {
  console.log( req.body )
  if( req.body.username === process.env.USER && req.body.password === process.env.PWD ) {
    req.session.login = true;
    res.redirect('index.html');
  }else{
    req.session.login = false;
    res.render('login', { msg:'login failed, please try again', layout:false })
  }
})
app.get( '/', (req,res) => {
  res.render( 'login', { msg:'', layout:false })
})
app.use( function( req,res,next) {
  if(req.session.login === true) {
    next();
  } else {
    res.render('login', { msg:'login failed, please try again', layout:false })
  }
})
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.use(express.static('public'));
app.use(express.json());
     
let db = null;
let currCollection = null;

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'AllYourStuff' )
  })
  .then( _db => {
    // store reference to collection
    db = _db;
  });

app.use( (req,res,next) => {
    if( db !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
})

app.post( '/addCollection', (req,res) => {
  if( db !== null ) {
    db.createCollection(req.body.collectionName);
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
      currCollection.find({ }).toArray().then( result => res.json( result ))
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