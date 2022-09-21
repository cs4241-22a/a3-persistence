const express    = require('express'),
      path       = require('path'),
      mongodb    = require('mongodb'),
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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/main', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/main.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.use( express.json() );

app.get('/authenticate', (req, res) => {
    res.end(JSON.stringify("true"));
});

app.post( '/add', (req,res) => {
    // assumes only one object to insert
    // collection.insertOne( req.body ).then( result => res.json( result ) )
});

app.post( '/remove', (req,res) => {
    // collection
    //   .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
    //   .then( result => res.json( result ) )
});

app.post( '/modify', (req,res) => {
    // collection
    //   .updateOne(
    //     { _id:mongodb.ObjectId( req.body._id ) },
    //     { $set:{ name:req.body.name } }
    //   )
    //   .then( result => res.json( result ) )
});

//GET Request (Data) Example
app.get('/table', (req, res) => {
    //Replace test with table from db
    //res.end(JSON.stringify(test))
});

app.listen( process.env.PORT || 3000)