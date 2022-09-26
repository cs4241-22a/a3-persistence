const express = require('express');
const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
const app = express();
const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const cookie = require( 'cookie-session' );
const k1 = "kdjkjdakask";
const k2 = "dsjfjsfrifw";

const { MongoClient, ServerApiVersion } = require('mongodb');
const muri = "mongodb+srv://"+process.env.MONGO_USER+":"+ process.env.MONGO_PASSWORD+"@a3cluster.oip0htf.mongodb.net/?retryWrites=true&w=majority";
const mClient = new MongoClient(muri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let collection = null

mClient.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return mClient.db( 'a3Accounts' ).collection( 'users' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

  if( collection !== null ){
    console.log("here")
    //collection.find({ }).toArray().then( result => res.json( result ) )
  }

/* appdata structure example*/
/*
   { 'abc@abc.com': {
      'name': 'John Smith',
      'working': true,
      'password': '',
      'cars': [
          { 'model': 'ford',
            'year': 2000,
            'milage': 205
          }
      ]
   }
 
const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mileage': 205724},
  { 'model': 'dodge', 'year': 2004, 'mileage': 172057 },
  { 'model': 'ford', 'year': 1987, 'mileage': 299690} 
];
*/
var appdata = {};
// add url encoding
app.use( express.urlencoded({ extended:true }) )
// activate cookie handeling: session
app.use( cookie({
  name: 'session',
  keys: [process.env.SESSION_k1, process.env.SESSION_k2]
}))
// serve all static pages as we need CSS. etc
app.use(serveStatic(dir, { index: ['login.html', 'login.htm'] }));
// login call before session validation
app.post("/login",(request,response) => handlePostL( request, response ));
app.post('/signup',(request,response,next) => handlePostSignUp( request, response, next ));
// start validation session and cookie data
// we send people to login when they do not have login flag set
// problem we also ned to 
app.use( function( req,res,next) {
  console.log(req.session)
  if( req.session.login === true ){
    console.log(req.session)
    next()
  } else {
    if( 'body' in req ) {
      console.log(req.body)
      console.log(req.path)
    }
    console.log("sending ... login.html")
    app.get('/signup',(request,response,next) => handleSignUp( request, response, next ));
    res.sendFile( __dirname +"/" + dir + '/login.html' )
  }
})
// update profile goes after cookie validation
app.get('/userupdate',(request,response,next) => sendUpdatePage( request, response, next ));
app.post('/userupdate',(request,response,next) => handlePostUpdate( request, response, next ));
app.get('/userfetch',(request,response,next) => handleGetUserUpdate( request, response, next ));
// signput comes after cookie validation
app.get('/signout',(request,response,next) => handleSignOut( request, response, next ));
app.use(bodyParser.json({type: 'text/plain'}));
app.post('/submit',(request,response) => handlePostJ( request, response ));
app.get('/showuser',(request,response) => handleGetJ( request, response ));

/*
 * 
 */

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/'  || request.url === "/?" ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    // ... do something with the data here!!!
    var inD =  JSON.parse( dataString );
    console.log("getting args ...");
    console.log(inD)
    if(inD.action === "add"){
      nC = {model: inD.model, year: inD.year, mileage: inD.mileage}
      appdata.push(nC)
    }
    console.log(appdata)
    if(inD.action === "delete"){
      const trashBin = appdata.splice(inD.index, 1)
    }
    theYear = new Date().getFullYear()
    for(k = 0; k<appdata.length; k++){
      appdata[k].milesPerYear = parseInt(appdata[k].mileage / (theYear - appdata[k].year))
    }
    console.log(appdata)
    var rb = JSON.stringify(appdata)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(rb)
  })
}

async function handlePostJ( request, response ) {
  var inD =  request.body;
  console.log("handlePostJ geting args ... ")
  console.log(inD)
  var email = request.session.email;
  console.log(email)
  // do we have user
  var user = await getUser(email);
  if(user !== null){
    if( inD.action === "add" ){
      // create new car
      var nC = {model: inD.model, year: inD.year, mileage: inD.mileage}
      // add car to cars array of user
      user['cars'].push(nC)
    }
    console.log(user)
    if(inD.action === "delete"){
      const trashBin = user['cars'].splice(inD.index, 1)
    }
    // copy of the user
    userCopy = user;
    theYear = new Date().getFullYear()
    for(k = 0; k<userCopy.cars.length; k++){
      userCopy['cars'][k].milesPerYear = parseInt(userCopy['cars'][k].mileage / (theYear - userCopy['cars'][k].year))
    }
    console.log(user)
    // update user record
    await updateCarData(user)
    // send json data to the client
    var rb = JSON.stringify(userCopy['cars'])
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(rb)
  }
}

// handeles post login call
async function handlePostL( request, response ) {
  console.log("handlePostL geting args ... ");
  console.log(request.body );
  // see if we have email
  if( 'password' in request.body && 'email' in request.body ){
    // check password
    var user = await getUser(request.body.email);
    if( user !== null) {
      // we have user
      console.log(user)
      if( user.password === request.body.password ){
        // we are good
        // set cookie
        request.session.login = true;
        request.session.email = request.body.email;
        response.redirect( 'main.html' )
      } 
    } 
  }
  // ask user again
  response.sendFile( __dirname +"/" + dir + '/login.html' );
}

const handleSignOut = function( request, response, next ) {
  console.log("in signout ... ");
  console.log( request.session );
  if( request.session.login === true ){
    request.session.login = false;
    request.session.email = '';
    response.sendFile( __dirname +"/" + dir + '/login.html' );
  } else {
    // clean up session
    next();
  }
}
const handleSignUp = function( request, response, next ) {
  if( request.body.login === true ){
    next();
  } else {
    response.sendFile( __dirname +"/" + dir + '/signup.html' );
  }
}

async function handlePostSignUp( request, response, next ) {
  console.log("in handlePostSignUp");
  console.log( request.body );

  // perform actions on the collection object 
  // check if we have such a user ...
  if( 'email' in request.body ){
    var email = request.body.email;
    var aduser = false;
    var user = await getUser(email);
    if( user !== null ){
      console.log("handlePostSignUp: user Exists")
    } else {
      console.log("Can create a new user")
      aduser = true;
    }
    if( user !== null ){
      // we have user ... 
      console.log("handlePostSignUp user exists");
      response.sendFile( __dirname +"/" + dir + '/login.html' );
    } else {
      // insert user
      console.log("pusing email "+ email + " into appdata")
      user = {'email': email,'cars': [],'name': '', 'password': ''};
      // check password
      if( 'password' in request.body){
        user['password'] = request.body.password;
      }
      // check name
      if( 'name' in request.body){
        user['name'] = request.body.name;
      }
      console.log("handlePostSignUp: "+user)
      // send user to login page now
      response.sendFile( __dirname +"/" + dir + '/login.html' );
      if( aduser ){
        await addUser(user);
      }
    }
  } else {
    response.sendFile( __dirname +"/" + dir + '/signup.html' );
  }
}

async function handleGetUserUpdate( request, response, next ) {
  console.log("in userupdate  ... ");
  console.log( request.session );
  if( request.session.login === true ){
    // construct Json file to push to the user for rendering
    var email = request.session.email;
    var user = await getUser(email)
    if( user !== null ){
      // I have my my e-mail
      console.log(user)
      var rb = JSON.stringify(user)
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(rb)
    }
  } else {
    // clean up session
    next();
  }
}

const sendUpdatePage = function( request, response, next ) {
  console.log("in sendUpdatePage  ... ");
  console.log( request.session );
  if( request.session.login === true ){
    response.sendFile( __dirname +"/" + dir + '/update.html');
  } else {
    // clean up session
    next();
  }
}
// returns user record (if exists) or null
async function getUser(email){
  var query = {'email': email}
  var ret = null;
  if( collection !== null){
    console.log("getUser: have collection, email: "+email)
    ret = await collection.findOne(query)
    console.log("getUser return: ",ret);
  }
  return ret;
}
// json object for a user
async function addUser(user){
  if( collection !== null){
    console.log("addUser: have collection: "+user);
    var ret = collection.insertOne( user );
    return true;
  } else {
    return false;
  }
}
// update User. we only work on name and password fields
async function updateUser(user){
  if( collection !== null){
    console.log("updateUser: have collection: ");
    try {
      console.log(user)
      await collection.updateOne(
                                {'_id': user._id},
                                { 
                                  $set: {
                                          'name': user.name
                                  }
                                }
            );
      await collection.updateOne(
              {'_id': user._id},
              { 
                $set: {
                        'password': user.password
                }
              }
      );
      return true;
    } catch (e){    
      console.log(e);
      return false;
    }
  } else {
    return false;
  }
}
// update car data for the user
async function updateCarData(user){
  if( collection !== null){
    console.log("updateUser: have collection: ");
    console.log(user)
   
    try {
      await collection.updateOne({'_id': user._id},{ $set: {'cars': user.cars}});
      return true;
    } catch (e){    
      console.log(e);
      return false;
    }
  } else {
    return false;
  }
}

async function handlePostUpdate( request, response, next ) {
  console.log("in handlePostUpdate");
  console.log( request.body );

  // perform actions on the collection object 
  // check if we have such a user ...
  if( 'email' in request.session ){
    var email = request.session.email;
    var aduser = false;
    var user = await getUser(email);
    if( user !== null ){
      console.log("handlePostSignUp: user Exists")
    } else {
      console.log("Can create a new user")
      aduser = true;
    }
    if( user === null ){
      // we have user ... 
      console.log("handlePostSignUp user does not exist");
      response.sendFile( __dirname +"/" + dir + '/signup.html' );
    } else {
      // update user
      // password first
      if( 'password' in request.body){
        user['password'] = request.body.password;
      }
      // check name
      if( 'name' in request.body){
        user['name'] = request.body.name;
      }
      console.log("handlePostUpdate: ")
      console.log(user)
      // send user to login page now
      response.sendFile( __dirname +"/" + dir + '/main.html' );
      var r = await updateUser(user);
      console.log(r)
    }
  } else {
    response.sendFile( __dirname +"/" + dir + '/signup.html' );
  }
}

async function handleGetJ( request, response ) {
  console.log("handleGetJ geting args ... ")
  var email = request.session.email;
  console.log(email)
  // do we have user
  var user = await getUser(email);
  if(user !== null){
    // send json data to the client
    var rb = JSON.stringify(user)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(rb)
  }
}

// start app
app.listen(port || process.env.PORT)