// const express = require('express'),
//     app = express()

// const bodyparser = require('body-parser')

// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const db = low( new FileSync( 'data.json'))

// db.defaults({ songs:[] }).write()


// const {MongoClient} = require('mongodb')

// async function main()
// {
//   const uri = "mongodb+srv://rmbrunelle2:<password>@webwarea3.fsoijsj.mongodb.net/?retryWrites=true&w=majority"
//   const client = new MongoClient(uri)
// }



// app.use(express.static('./'))

// console.log('in server')

// // app.use(bodyParser.json())

// // app.use(function(req, res, next)
// // {
// //     console.log(req.url)
// //     next()
// // })

// // app.use(bodyParser.urlencoded({
// //     extended: false
// // }))

// // app.use(express.urlencoded({
// //     extended: true
// // }))


// app.get('/', function(req, res){res.sendFile("index.html")})

// app.post( '/submit', bodyparser.json(), function( req, res )  {
//     console.log('recieving data...')
//     // const testSongName = req.body.testSongName
//     // const songname = req.body.songname
//     // const artistname = req.body.artist
//     // const songduration = req.body.songduration
//     // const albumname = req.body.album
//     // console.log(testSongName)
//     // res.send(testSongName)

//     //res._write(testSongName)
//     db.get( 'songs' ).push(req.body.newsong).write()
//     res.writeHead(200, {'Content-Type': 'application/json'})
//     res.end(JSON.stringify(db.getState()))
// })

// //app.listen(3000)
// const listener = app.listen( process.env.PORT, function() {
//   console.log('Your app is listening on port ' + listener.address().port )
// })






















const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    cookie  = require( 'cookie-session' ),
    hbs     = require( 'express-handlebars' ).engine,
    mongodb = require('mongodb'),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
  //  User = require("../../../models/user")
    
  //  const bootstrap = require('bootstrap')


app.use( express.urlencoded({ extended:true }) )
const bodyParser = require('body-parser')
const bodyparser = require('body-parser')
const { request } = require('express')

app.use(bodyParser.urlencoded({extended: false}))

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const db = low( new FileSync( 'data.json'))

// db.defaults({ songs:[] }).write()



const uri = "mongodb+srv://rmbrunelle2:rmb2001%40cs@webwarea3.fsoijsj.mongodb.net/?retryWrites=true&w=majority"
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null


const init = async function () 
{
  const clientConnection = await client.connect()
  collection = await client.db( 'WebwareA3' ).collection( 'PlaylistData' )
  const data = await collection.find({ }).toArray()
  console.log( data )
}
init()


app.use( (req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    res.status(503).send();
  }
});



app.use(express.static('./'))

console.log('in server')

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './' )

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))




app.post( '/login', bodyParser.json(), (req,res)=> {
  console.log( req.body )

  collection.find({usr: req.body.usr, pwd: req.body.pwd}).toArray()
    .then(result => {
      if(result.length >= 1)
      {
        req.session.usr = req.body.usr
        req.session.login = true
        res.json({login: true})
      }
      else{
        res.json({login: false})
      }
    })
  

  // User.findOne({username: req.query.username}, function(err, user){
  //   if(err) {
  //     console.log(err);
  //   }
  //   var message;
  //   if(user) {
  //     console.log(user)
  //       message = "user exists";
  //       console.log(message)
  //       req.session.login = true
  //       res.redirect( 'playlist.html' )
  //   } else {
  //       message= "user doesn't exist";
  //       console.log(message)
  //       var username = req.body.username
  //   var password = req.body.password
  //   User.register(new User({ username: username }),
  //           password, function (err, user) {
  //       if (err) {
  //           console.log(err);
  //           return res.render("index");
  //       }
 
  //       passport.authenticate("local")(
  //           req, res, function () {
  //           res.render("playlist");
  //       });
  //   });
  //   }
  //   res.json({message: message});
  });




// post for register
app.post("/register", bodyParser.json(), (req, res) => {
  collection.find({usr: req.body.usr}).toArray()
    .then(result => {
      if(result.length >= 1)
      {
        res.json({login: false})
      }
      else{
        let newUser = {
          usr: req.body.usr,
          pwd: req.body.pwd,
          entries: []
        }
        collection.insertOne(newUser) // SA has this line twice for some reason
        req.session.usr = req.body.usr
        req.session.login = true
        res.json({login: true})
      }
    })
})




  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
  // if( req.body.password === 'test' ) {
  //   // define a variable that we can check in other middleware
  //   // the session object is added to our requests by the cookie-session middleware
  //   req.session.login = true
    
  //   // since login was successful, send the user to the main content
  //   // use redirect to avoid authentication problems when refreshing
  //   // the page or using the back button, for details see:
  //   // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
  //   res.redirect( 'playlist.html' )
  // }else{
  //   // cancel session login in case it was previously set to true
  //   req.session.login = false
  //   // password incorrect, send back to login page
  //   res.render('index', { msg:'login failed, please try again', layout:false })
  //}
//})




app.get( '/', (req,res) => {
  res.render( 'index', { msg:'', layout:false })
})

app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('index', { msg:'login failed, please try again', layout:false })
})


app.post("/delete", bodyparser.json(), function(req, res) {
  
  console.log("inside delete server")
  console.log(req.body.newsong)

  // collection
  //   .deleteOne({ req.body })
  //   .then(result => res.json(result));

  collection.find({usr: req.session.usr}).toArray()
  .then(result => {
    let entries = result[0].entries

    for(let i = 0; i<entries.length; i++)
    {
      console.log(entries[i].newsong)
      if(JSON.stringify(entries[i].newsong)==JSON.stringify(req.body.newsong))
      {
        console.log("splicing body")
        entries.splice(i, 1)
      }
    }

    collection.updateOne(
      {  _id: mongodb.ObjectId(result[0]._id)},
      {$set: {entries: entries}}
    )
    res.json(entries)
  })

});



app.post("/update", bodyparser.json(), function(req, res) {
  // assumes only one object to insert
  // console.log("body", req.body);
  // collection.insertOne(req.body).then(dbresponse => {
  //   console.log(dbresponse);
  //   res.json(dbresponse);
  // });


  console.log("updating body")
  console.log(req.body)

  collection.find({usr: req.session.usr}).toArray()
  .then(result => {
    let entries = result[0].entries

    console.log(req.body.newsong)

    for(let i = 0; i<entries.length; i++)
    {
      console.log(entries[i].newsong)
      if(i===req.body.rowNum-1)
      {
        console.log("replacing entry body")
        entries[req.body.rowNum-1].newsong = req.body.newsong
      }
    }

    console.log("about to updateOne in update")
    collection.updateOne(
      {  _id: mongodb.ObjectId(result[0]._id)},
      {$set: {entries: entries}}
    )
    res.json(entries)
  })

});


app.get('/playlist', function(req, res){res.sendFile(__dirname+"/playlist.html")})

// app.get( '/playlist.html', ( req, res) => {
//     res.render( 'playlist', { msg:'success you have logged in', layout:false })
  
//     if(collection !== null)
//       {
//         collection.find({ }).toArray().then(result => res.json(result))
//       }
// })

app.post( '/submit', bodyparser.json(), function( req, res )  {
    console.log('recieving data...')
  
    // db.get( 'songs' ).push(req.body.newsong).write()
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.end(JSON.stringify(db.getState()))
  
  collection.find({usr: req.session.usr}).toArray()
    .then(result => {
      let entries = result[0].entries
      entries.push(req.body)

      collection.updateOne(
        {  _id: mongodb.ObjectId(result[0]._id)},
        {$set: {entries: entries}}
      )
      res.json(entries)
    })

  // collection.insertOne(req.body).then(dbresponse => {
  //   console.log(dbresponse);
  //   res.json(dbresponse);
  // });
})


app.get( '/data', function( req, res )  {

  console.log("getting data...")

collection.find({usr: req.session.usr}).toArray()
  .then(result => {
    let entries = result[0].entries
    res.json(entries)
    console.log("just jsoned entries:")
    console.log(entries)
  })
  console.log("ending data getter")
})




//app.listen(3000)
const listener = app.listen( process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port )
})