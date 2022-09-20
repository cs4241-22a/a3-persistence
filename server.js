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
    res.sendFile( __dirname + '/public/style.css' )
    //res.sendFile( __dirname + '/public/script.js' )
    res.redirect( 'main.html' )
  }else{
    // cancel session login in case it was previously set to true
    req.session.login = false
    // password incorrect, send back to login page
    res.render('index', { msg:'login failed, please try again', layout:false })
  }
})

app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
  res.render('index', { msg:'login failed, please try again', layout:false })
})

app.get( '/main.html', ( req, res) => {
  res.render( 'main', { msg:'success you have logged in', layout:false })
})

app.listen( 3000 )

// // const express = require( 'express' ),
// //       mongodb = require( 'mongodb' ),
// //       app = express()

// // app.use( express.static('public') )
// // app.use( express.json() )

// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // //const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}%40${process.env.HOST}`
// // const uri = `mongodb+srv://abbyghyde:QJB8YySPahsy794G@cluster0-a3.fy7bqls.mongodb.net`

// // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// // let collection = null

// // // const connect = async function() {
// // //   await client.connect()
// // //   const collection = await client.db("groceries").collection("devices")
// // //   const results = await collection.find({}).toArray()
// // //   console.log(results)
// // // }

// // client.connect()
// //   .then( () => {
// //     // will only create collection if it doesn't exist
// //     return client.db( 'groceries' ).collection( 'devices' )
// //   })
// //   .then( collection => {
// //     // blank query returns all documents
// //     return collection.find({ }).toArray()
// //   })
// //   .then( console.log )
  
// // // route to get all docs
// // app.get( '/', (req,res) => {
// //   if( collection !== null ) {
// //     // get array and pass to res.json
// //     collection.find({ }).toArray().then( result => res.json( result ) )
// //   }
// // })

// // // app.use( (req,res,next) => {
// // //   if( collection !== null ) {
// // //     next()
// // //   }else{
// // //     res.status( 503 ).send()
// // //   }
// // // })

// // // app.post( '/add', (req,res) => {
// // //   // assumes only one object to insert
// // //   collection.insertOne( req.body ).then( result => res.json( result ) )
// // // })

// // // // assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
// // // app.post( '/remove', (req,res) => {
// // //   collection
// // //     .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
// // //     .then( result => res.json( result ) )
// // // })

// // // app.post( '/update', (req,res) => {
// // //   collection
// // //     .updateOne(
// // //       { _id:mongodb.ObjectId( req.body._id ) },
// // //       { $set:{ name:req.body.name } }
// // //     )
// // //     .then( result => res.json( result ) )
// // // })

// // app.listen( 3000 )