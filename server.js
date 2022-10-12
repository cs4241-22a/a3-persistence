const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      cookie  = require( 'cookie-session' ),
      bodyParser  = require( 'body-parser' ),
      timeout  = require( 'connect-timeout' ),
      response  = require( 'response-time' ),
      hbs  = require( 'express-handlebars' ),
      app = express()

app.use( express.static('public') )
app.use( express.json() )
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('dotenv').config()

app.use( express.urlencoded({ extended:true }) )

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1 })
let collection = null

client.connect()
  .then( () => client.db( 'testdb' ).collection( 'testcollection' ) )
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
  })
  .then( console.log )
  
// route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.post('/form', function(req,res){
  const username = req.body.username;
  const useremail = req.body.useremail;
  const gameTitle = req.body.gameTitle;
  const gameSystem = req.body.gameSystem;
  const currentDate = req.body.currentDate;

  const data = {
      "name": username,
      "email": useremail,
      "gameTitle": gameTitle,
      "gameSystem": gameSystem,
      "currentDate": currentDate
  }

  db.collection('details').insertOne(data,function(err, collection){
    if (err) throw err;
    console.log("Record inserted Successfully");
          
});

return res.redirect('signup_success.html');
})

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

//pages
app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})

app.listen( 3000 )
console.log("server listening at port 3000");