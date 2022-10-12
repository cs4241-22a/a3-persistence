const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      cookie  = require( 'cookie-session' ),
      bodyParser  = require( 'body-parser' ),
      timeout  = require( 'connect-timeout' ),
      response  = require( 'response-time' ),
      hbs  = require( 'express-handlebars' ).engine,
      app = express()

app.use( express.static('public') )
app.use(express.static('views'));
app.use( express.json() )
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

require('dotenv').config()

app.use( express.urlencoded({ extended:true }) )

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1 })
let collection = null

client.connect()
  .then( () => client.db( 'Assignment4' ).collection( 'gameHold' ) )
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
  })
  .then( console.log )

  app.use( (req,res,next) => {
    if( collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
  })
  

app.post('/login', async function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  const acceptPassword = await collection.findOne({"username": username})
  if (acceptPassword === password ) {
    req.session.login = true
    res.render('index')
    // res.redirect('index');
  }

  else {
    req.session.login = false
    res.render('form', { msg:'Login failed.', layout:false})
  }
})

// app.post('/form', function(req,res){
//   const username = req.body.username;
//   const useremail = req.body.useremail;
//   const gameTitle = req.body.gameTitle;
//   const gameSystem = req.body.gameSystem;
//   const currentDate = req.body.currentDate;

//   const data = {
//       "name": username,
//       "email": useremail,
//       "gameTitle": gameTitle,
//       "gameSystem": gameSystem,
//       "currentDate": currentDate
//   }

//   db.collection('details').insertOne(data,function(err, collection){
//     if (err) throw err;
//     console.log("Record inserted Successfully");
          
// });

// return res.redirect('index.html');
// })

app.use( cookie({
  name: 'session',
  keys: ['59765', '26438']
}))

//pages
app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})

app.get( '/login', ( req, res) => {
  res.render( 'form', { msg:'', layout:false })
})

app.listen( 3000 )
console.log("server listening at port 3000");