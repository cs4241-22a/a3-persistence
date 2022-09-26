const { request, response } = require('express');
const express = require('express'),
      mongodb = require('mongodb'),
      bodyParser = require('body-parser'),
      path = require('path'),
      cookie  = require( 'cookie-session' ),
      cookieParser = require('cookie-parser');

const app = express();

//middleware 1 - favicon express
app.use(express.static("public"));
//middleware 2 - bodyParser
app.use(bodyParser.json()) 
app.use(express.json());
app.use(express.urlencoded({extended:true})) 
app.use(cookieParser());
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.set('title', 'hey');

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
const client = new mongodb.MongoClient( uri, {useNewUrlParser: true, useUnifiedTopology: true});

let collection = null;
let users_collection = null;



app.get("/",(req, res) =>{
  res.sendFile(path.join(__dirname+'/views/login.html'));
})


//setting up book database
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'datatest' ).collection( 'test' )
  })
  .then(__collection => {
    // store reference to collection
        collection = __collection;
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

//setting up user database
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'datatest1' ).collection( 'users' )
  })
  .then(__users_collection => {
    // store reference to collection
        users_collection = __users_collection;
    // blank query returns all documents
    return users_collection.find({ }).toArray()
  })
  .then( console.log )
 

//getting stuff from database
app.get("/", (request, response) => {
  if( collection !== null){
      //get array and pass to res.json
      collection.find({ }).toArray().then( result => response.json( result));
      //response.sendFile(__dirname + "/views/index.html")
  }
});


//adding book
app.post( '/add', express.json(), (request, response) => {
    console.log(request.body)
    let entry = request.body
    entry.userID = request.body.userid;
    console.log("UserID" + entry.userID);
    collection.insertOne( entry ).then(response.json(entry));
})


//retrieving books
app.post('/saved', (request, response)=>{
      if(collection !== null){
        let search = request.body;
        search.userID = request.cookies.userid;
        collection.find({}).toArray().then( dataArr =>{
            response.json(dataArr);
        })
    }
})


//deleting books
app.post('/delete', (request, response) => {
    console.log('deleting')
    console.log(request.body)
    collection.deleteOne( request.body ).then(response.json(request.body))
})


//updating books
app.post('/update', (request, response) =>{ 
    let entry = request.body;
    collection.findOneAndUpdate(
        {_id: request.body._id},
        {$set: {bookname: request.body.bookname,
              authorname: request.body.authorname, 
            totalpages: request.body.totalpages, 
            pagesread: request.body.pagesread,
               pagesleft: request.body.pagesleft}}
    ).then(response.json(request.body))

})


//logging in
app.post('/login', (request, response) =>{
    let uName = request.body.username,
        psswd = request.body.password,
        userLogIn = {username: uName, password: psswd};
      
    users_collection.findOne(userLogIn)
    .then(user =>{   
        if(user){
            //login
            response.cookie('login', true)
            response.cookie('userid', user._id)
            request.session.userid = user._id;
            response.cookie('username', user.username)
            response.sendFile(path.join(__dirname+'/views/index.html'));
            console.log("id" + request.session.userid);
        }
        else{
            response.sendFile(path.join(__dirname+'/views/login.html'));
        }
    })
})


//creating account
app.post('/create', (request, response)=>{
    let newUName = request.body.newUser,
        newPsswd = request.body.newPassword,
            entry = {username: newUName, password: newPsswd};
    users_collection.insertOne( entry )
    .then(regRes => users_collection.findOne(regRes.insertedId))
    .then(user=>{
        console.log("--: ", user._id);
        request.body.login = true;
        request.body.userid = user._id;
          console.log("hmmm" +request.body.userid);
       // response.cookie('userid', user._id)
        
       
       // console.log(request.cookie.key1);
        //response.body('userid', user.userid)
        //console.log("hey" + response.user.userid);
        //response.json({"userid": request.body.userid});
     // app.alert("Successfully created account");  
    });
})



app.post('/back', (request, response)=>{
   response.sendFile(path.join(__dirname+'/views/login.html'));
})

app.get("/signup",(req, res) =>{
  res.sendFile(path.join(__dirname+'/views/signup.html'));
})

//port
app.listen(process.env.PORT || 3000)

