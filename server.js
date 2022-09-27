const express = require( 'express' ),
      cookie  = require( 'cookie-session' ),
      mongodb = require( 'mongodb' ),
      mongoose  = require( 'mongoose' ),
      User    = require('./models/user'),
      ListItem  = require('./models/list-item'),
      app     = express()

// const user = new User({
//   username: 'testuser',
//   password: 'password123'
// })
// user.save()

let user_list = null
let item_list = null

// connect to mongodb using mongoose
const dbURI = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen( 3000 )
    console.log('connected to mongodb and listening for requests')
  })
  .catch((err) => console.log(err))

// using EJS view engine
app.set( 'view engine', 'ejs' )
app.set( 'views',       './views' )

app.use( express.static('public') )
app.use( express.json() )

//const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })


// gets users from database
// client.connect()
//   .then( () => {
//     // will only create collection if it doesn't exist
//     return client.db( 'cs-4241-a3' ).collection( 'users' )
//   })
//   .then( __collection => {
//     // store reference to collection
//     users_collection = __collection
//     // blank query returns all documents
//     //users_array = users_collection.find({ }).toArray()
//     return users_collection.find({ }).toArray()
//   })
//   .then( __array => {
//     // TODO---------- is this necessary
//     users_array = __array
// } )

// // same as above but grabs all the todo list items
// client.connect()
//   .then( () => {
//     return client.db( 'cs-4241-a3' ).collection( 'list-items' )
//   })
//   .then( __collection => {
//     items_collection = __collection
//     return users_collection.find({ }).toArray()
//   })
//   .then( __array => {
//     items_array = __array
// })

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )

// cookie middleware! The keys are used for encryption and should be changed
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use( (res, req, next) => {
  // grab collections from db on page request
  
  
  next()
})

app.post( '/login', (req,res)=> {
  User.find()
      .then((result) => {
        //console.log(result)
        user_list = result
    
    
        // express.urlencoded will put your key value pairs 
        // into an object, where the key is the name of each
        // form field and the value is whatever the user entered
        console.log( req.body )

        user_list.forEach((user) => {
          console.log('inside forEach')
          console.log('checking  against ', user.username)
          if( req.body.username === user.username ) {
            // if the username exists

            console.log('checking  against ', user.password)
            if ( req.body.password === user.password ) {
              // username + password is correct

              // define a variable that we can check in other middleware
              // the session object is added to our requests by the cookie-session middleware
              req.session.login = true
              req.session.username = user.username

              // since login was successful, send the user to the main content
              // use redirect to avoid authentication problems when refreshing
              // the page or using the back button, for details see:
              // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
              res.redirect( 'main' )
            }
            else {
              // username exists, incorrect password

              // cancel session login in case it was previously set to true
              req.session.login = false
              // password incorrect, send back to login page
              res.render('login', { msg:'Password is incorrect'})
            }
          }
          else {
            // if the username doesn't exist
            req.session.login = false
            res.render('login', { msg:'Please enter a valid username'})

            // TODO------- create user in DB
          }
        })

        //req.session.login = true
        //res.redirect( 'main' )
  
    })
})

app.get( '/', (req,res) => {
  res.render( 'login', { msg:''})
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('login', { msg:'Please log in before accessing a list'})
})

// TODO: have this also render all current list items
app.get( '/main', ( req, res) => {
  
  ListItem.find()
      .then((result) => {
        //console.log(result)
        item_list = result
        
        
        const username = req.session.username
        const tasks = item_list
        res.render( 'main', { username, tasks } )
    })
})

