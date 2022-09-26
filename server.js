const express = require( 'express' ),
      cookie  = require( 'cookie-session' ),
      hbs     = require( 'express-handlebars' ).engine,
      mongodb = require( 'mongodb' ),
      app = express()

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )

// implement handlebars
app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

// cookie middleware! The keys are used for encryption and should be changed
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))
// serve up static files in the directory views
app.use( express.static('public') )
app.use( express.static('views') )
app.use( express.json() )

const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}%40${process.env.HOST}`
const uri = `mongodb+srv://abbyghyde:QJB8YySPahsy794G@cluster0-a3.fy7bqls.mongodb.net`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let collection = null

const appdata = [];
const currentUser = "";

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'groceries' ).collection( 'items' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

app.post( '/login', (req,res)=> {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  console.log( req.body )
  
  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
  if( req.body.password === 'test' ) {
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true
    
    // since login was successful, send the user to the main content
    // use redirect to avoid authentication problems when refreshing
    // the page or using the back button, for details see:
    // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
    res.redirect( 'main.html' )
  }else{
    // cancel session login in case it was previously set to true
    req.session.login = false
    // password incorrect, send back to login page
    res.render('index', { msg:'login failed, please try again', layout:false })
  }
  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
//   const findUser = function( user ) {
//        if (req.body.password === user.password && req.body.username === user.username) {
//          currentUser = req.body.username;
//          req.session.login = true;
//          res.redirect( 'main.html' );
//        }
//   }
//   appdata.forEach(findUser);

//   if (req.session.login != true) {
//     // cancel session login in case it was previously set to true
//     req.session.login = true;
//     let json = {
//       username: req.body.username,
//       password: req.body.password
//     };
//     let newUser = JSON.stringify(json);
//     console.log( newUser );
//     appdata.push(newUser);
    
//     // password incorrect, send back to login page
//     res.redirect( 'main.html' );
//   }
})

app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
  // db stuff
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
  res.render('index', { msg:'login failed, please try again', layout:false })
})

app.get( '/main.html', ( req, res) => {
  res.render( 'main', { msg: currentUser, layout:false })
})

// app.use( (req,res,next) => {
//   if( collection !== null ) {
//     next()
//   }else{
//     res.status( 503 ).send()
//   }
// })

app.post( '/submit', (req,res) => {
  // assumes only one object to insert
  console.log( req.body )
  collection.insertOne( req.body ).then(result => res.json( result ) )
})

// app get all data from table fcn
app.get( '/alldata', (req,res) => {
  collection.find({ }).toArray().then( result => res.json( result ) )
  .catch(function(err) {
        console.error("Error in fetching data: ", err);
      })
})

// app.post('/singleentry', (req,res) => {
//   //console.log ( req.body.item );
//   collection.find({ item: req.body.item }).toArray().then( result => res.json( result ) )
//   .catch(function(err) {
//         console.error("Error in fetching data: ", err);
//       })
// })

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post( '/delete', (req,res) => {
  // collection
  //   .findOneAndDelete({ _id:mongodb.ObjectId( req.body._id ) })
  //   .then( result => res.json( result ) )
  collection
    .find({ item: req.body.item })
    .toArray()
    .then(result => {
      collection.deleteOne( { _id: mongodb.ObjectId(result._id) }, { item: req.body.item } );
    }).catch(function(err) {
        console.error("Error in fetching data: ", err);
    });
})

app.post( '/update', (req,res) => {
  console.log ( "hopefully ID: ");
  console.log ( req.body._id );
  collection
    .updateOne(
      { _id:mongodb.ObjectId( req.body._id ) },
      { $set:{ item:req.body.item } }
    )
    .then( result => res.json( result ) )
})

app.listen( 3000 )