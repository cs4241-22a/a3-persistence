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
    cookie  = require( 'cookie-session' ),
    hbs     = require( 'express-handlebars' ).engine,
    mongodb = require('mongodb')

app.use( express.urlencoded({ extended:true }) )
const bodyparser = require('body-parser')

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



app.post("/add", bodyparser.json(), function(req, res) {
  // assumes only one object to insert
  console.log("body", req.body);
  collection.insertOne(req.body).then(dbresponse => {
    console.log(dbresponse);
    res.json(dbresponse);
  });
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




app.post( '/login', (req,res)=> {
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
    res.redirect( 'playlist.html' )
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

app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('index', { msg:'login failed, please try again', layout:false })
})


app.post("/delete", bodyparser.json(), function(req, res) {
  collection
    .deleteOne({ _id: mongodb.ObjectId(req.body.id) })
    .then(result => res.json(result));
});


// app.get('/playlist.html', function(req, res){res.sendFile("playlist.html")})

app.get( '/playlist.html', ( req, res) => {
    res.render( 'playlist', { msg:'success you have logged in', layout:false })
  
    if(collection !== null)
      {
        collection.find({ }).toArray().then(result => res.json(result))
      }
})

app.post( '/submit', bodyparser.json(), function( req, res )  {
    console.log('recieving data...')
  
    // db.get( 'songs' ).push(req.body.newsong).write()
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.end(JSON.stringify(db.getState()))
  
  collection.insertOne(req.body).then(dbresponse => {
    console.log(dbresponse);
    res.json(dbresponse);
  });
})

//app.listen(3000)
const listener = app.listen( process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port )
})