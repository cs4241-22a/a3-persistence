// const http = require( 'http' ),
//       fs   = require( 'fs' ),
//       mime = require( 'mime' ),
//       dir  = 'public/',
//       port = 3000

// let appdata = []

// const server = http.createServer( function( request,response ) {
//   if( request.method === 'GET' ) {
//     handleGet( request, response )    
//   }else if( request.method === 'POST' ){
//     handlePost( request, response ) 
//   }
//  })

// const handleGet = function( request, response ) {
//   const filename = dir + request.url.slice( 1 ) 

//   if( request.url === '/' ) {
//     sendFile( response, 'public/index.html' )
//   }else{
//     sendFile( response, filename )
//   }
// }

// const handlePost = function( request, response ) {
//   let dataString = ''

//   request.on( 'data', function( data ) {
//       dataString += data 
//   })


//   request.on( 'end', function() {

//     if (request.url === "/submit") {
//       let updatedDataset = calculateDueDate(dataString)
//       let newItem = JSON.parse( updatedDataset ) 
//       appdata.push( newItem )
//       response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
//       response.end(JSON.stringify(appdata))
//     } else if (request.url === '/delete') {
//       appdata.forEach( (item, i) => {
//         if (JSON.stringify(item) == dataString) {
//           appdata.splice(i, 1)
//         }
//       })
//       response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
//       response.end(JSON.stringify(appdata))
//     }

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

// const sendFile = function( response, filename ) {
//    const type = mime.getType( filename ) 

//    fs.readFile( filename, function( err, content ) {

//      // if the error = null, then we've loaded the file successfully
//      if( err === null ) {

//        // status code: https://httpstatuses.com
//        response.writeHeader( 200, { 'Content-Type': type })
//        response.end( content )

//      }else{

//        // file not found, error code 404
//        response.writeHeader( 404 )
//        response.end( '404 Error: File Not Found' )

//      }
//    })
// }

// server.listen( process.env.PORT || port )

const express = require( 'express' ),
      mongodb = require( 'mongodb' )
      cookie = require ( 'cookie-session' ),
      app = express(),
      appdata = []

require('dotenv').config()

app.use(express.static('public'))
//app.use(express.json())

const uri = 'mongodb+srv://'+process.env.USER_NAME+':'+process.env.PASSWORD+'@'+process.env.HOST

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'Test' ).collection( 'DataTest' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

app.use(express.urlencoded({extended:true}))

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

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
    // password incorrect, redirect back to login page
    res.sendFile( __dirname + '/public/index.html' )
  }
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.sendFile( __dirname + '/public/index.html' )
})

const middleware_post = (request, response, next) => {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {

    if (request.url === "/submit") {
      let updatedDataset = calculateDueDate(dataString)
      let newItem = JSON.parse( updatedDataset ) 
      appdata.push( newItem )
    } else if (request.url === '/delete') {
      appdata.forEach( (item, i) => {
        if (JSON.stringify(item) == dataString) {
          appdata.splice(i, 1)
        }
      })
    }
    request.json = JSON.stringify(appdata)
    next()
  })
}

//server logic
function calculateDueDate (dataString) {
  let obj = JSON.parse(dataString)

   //creation of derived data field
   if (obj.priority == 'Yes') {
    obj.dueDate = '1 day'
  } else {
    obj.dueDate = '2 days'
  }

  return JSON.stringify(obj)
}

app.use(middleware_post)

app.post( '/submit', ( req, res ) => {
  // our request object now has a 'json' field in it from our previous middleware
  res.writeHead( 200, { 'Content-Type': 'application/json'})
  res.end( req.json )
})

app.post( '/delete', ( req, res ) => {
  // our request object now has a 'json' field in it from our previous middleware
  res.writeHead( 200, { 'Content-Type': 'application/json'})
  res.end( req.json )
})



//app.get( '/', ( req, res ) => res.sendFile('./public/login.html') )

app.listen( process.env.PORT || 3000 )
