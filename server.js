const express    = require('express'),
      path       = require('path'),
      mongodb    = require('mongodb'),
      timeout = require('connect-timeout'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      errorHandler = require('errorhandler'),
      app        = express();

const uri = 'mongodb+srv://sean:Marley07@assignment-3.xnqev8q.mongodb.net/?retryWrites=true&w=majority';

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'Assignment-3' ).collection( 'data' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log );
  

app.use( (req,res,next) => {
    if( collection !== null ) {
      next();
    }else{
      res.status( 503 ).send();
    }
});

app.use(timeout('10s'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'my cookie',
    name: 'uniqueSessionID',
    saveUninitialized:false
}));

app.use(bodyParser.json())

app.get('/main', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/main.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.use( express.json() );

app.post('/authenticate', (req, res) => {
    var user = req.body.username;
    collection.find({ username: user}).toArray().then(result => {
        if(typeof result[0] === 'undefined')
        {
            app.use(errorHandler());
        }
        if(result[0].password === req.body.password)
        {
            req.session.username = user;
            req.session.password = req.body.password;
            req.session.loggedIn = true;
            res.end(JSON.stringify("true"));
        }
        else{
            res.end(JSON.stringify("false"));
        }
    });
});

app.post( '/new', (req,res) => {
    // assumes only one object to insert
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var timestamp = Math.floor(Date.now() / 1000)
    var numChars = name.length
    var data = {username:username, password:password, name:name, numChars:numChars, timestamp:timestamp};
    collection.insertOne( data ).then( result => res.json( result ) )
});

app.post( '/add', (req,res) => {
    // assumes only one object to insert
    var name = req.body.name;
    var timestamp = Math.floor(Date.now() / 1000)
    var numChars = name.length
    var data = {username:req.session.username, password:req.session.password, name:name, numChars:numChars, timestamp:timestamp};
    collection.insertOne( data ).then( result => res.json( result ) )
});

app.post( '/remove', (req,res) => {
    var name = req.body.name;
    collection
      .deleteOne({ 'name':name })
      .then( result => res.json( result ) )
});

app.post( '/modify', (req,res) => {
    var oldName = req.body.oldname;
    var newName = req.body.newname;
    var newLen = newName.length;
    collection
      .updateOne(
        { 'name':oldName },
        { $set:{ 'name':newName, 'numChars': newLen, 'timestamp': Math.floor(Date.now() / 1000)} }
      )
      .then( result => res.json( result ) )
});

//GET Request (Data) Example
app.get('/table', (req, res) => {
    collection.find({ username: req.session.username}).toArray().then(result => {
        res.end(JSON.stringify(result));
    });
});

app.listen( process.env.PORT || 3000)