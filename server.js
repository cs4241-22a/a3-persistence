
const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    cookie  = require( 'cookie-session' ),
    hbs     = require( 'express-handlebars' ).engine,
    mongodb = require('mongodb'),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")


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
        collection.insertOne(newUser)
        req.session.usr = req.body.usr
        req.session.login = true
        res.json({login: true})
      }
    })
})



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

app.post( '/submit', bodyparser.json(), function( req, res )  {
    console.log('recieving data...')
  
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