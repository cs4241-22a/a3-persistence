

const express = require( 'express' ),
      mongodb = require( 'mongodb' )
      cookie = require ( 'cookie-session' ),
      app = express()

require('dotenv').config()

app.use(express.static('public'))
app.use(express.json())

const uri = 'mongodb+srv://'+process.env.USER_NAME+':'+process.env.PASSWORD+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    return client.db( 'Test' ).collection( 'DataTest' )
  })
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
  })
  .then( console.log )

app.use(express.urlencoded({extended:true}))

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.post( '/login', (req,res)=> {
  let seen = false
  console.log( req.body )

  client.db( 'Test' ).collection( 'DataTest' ).find().forEach(element => {
    if (element.username === req.body.username && element.password === req.body.password) {
      //if the account exists and username and password are correct, redirect to main.html
      seen = true
      req.session.login = true
      res.redirect( 'main.html' )
    } else if (element.username === req.body.username && element.password !== req.body.password) {
      //if the username matches an existing account but the password is wrong, send back to login screen
      seen = true
      // password incorrect, redirect back to login page
      res.sendFile( __dirname + '/public/index.html' )
    }
  })
  .then( function( e ) {
    if (!seen) {
      //if the username is not recognized in the database, a new account with that 
      //username and password will be created
      req.body.data = []
      collection.insertOne( req.body )
      req.session.login = true
      res.redirect( 'main.html' )
    }
  })
})

// add some middleware that always sends unauthenicated users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.sendFile( __dirname + '/public/index.html' )
})

// const middleware_post = (request, response, next) => {
//   let dataString = ''

//   request.on( 'data', function( data ) {
//       dataString += data 
//   })

//   request.on( 'end', function() {

//     if (request.url === "/submit") {
//       let updatedDataset = calculateDueDate(dataString)
//       let newItem = JSON.parse( updatedDataset ) 
//       appdata.push( newItem )
//       collection.insertOne( newItem ).then( result => request.json = JSON.stringify(result) )
//     } else if (request.url === '/delete') {
//       appdata.forEach( (item, i) => {
//         if (JSON.stringify(item) == dataString) {
//           appdata.splice(i, 1)
//         }
//       })
//     }
//     //request.json = JSON.stringify(appdata)
//     next()
//   })
// }

// //server logic
// function calculateDueDate (dataString) {
//   let obj = JSON.parse(dataString)

//    //creation of derived data field
//    if (obj.priority == 'Yes') {
//     obj.dueDate = '1 day'
//   } else {
//     obj.dueDate = '2 days'
//   }

//   return JSON.stringify(obj)
// }

//app.use(middleware_post)
//app.use(express.json())

// route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})

app.post( '/submit', express.json(), ( req, res ) => {
  //console.log(req.body)
  req.body.dueDate = '1 day'
  collection.insertOne( req.body ).then( result => res.json( result ) )
  // collection.insertOne( req.body )
  // //console.log(req.body)
  // let appdata = []
  // (collection.find({ }).toArray()).forEach(element => {
  //   appdata.push(element)
  // });
  // res.writeHead( 200, { 'Content-Type': 'application/json'})
  // res.end( JSON.stringify(appdata) )

  //collection.insertOne( req.body ).then( result => console.log(result) )
  // our request object now has a 'json' field in it from our previous middleware

})

app.post( '/delete', ( req, res ) => {
  // our request object now has a 'json' field in it from our previous middleware
  res.writeHead( 200, { 'Content-Type': 'application/json'})
  res.end( req.json )
})



//app.get( '/', ( req, res ) => res.sendFile('./public/login.html') )

app.listen( process.env.PORT || 3000 )
