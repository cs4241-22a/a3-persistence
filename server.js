// server.js
// where your node app starts

// init project
const express = require("express")
const cookie = require("cookie-session")
const mongodb = require( 'mongodb' )
const hbs     = require( 'express-handlebars' ).engine
const app = express()

// http://expressjs.com/en/starter/static-files.html
app.use("/", express.static("public"))
app.use("/", express.static("views"))
app.use(express.json())

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://kdu1:a3Password123@cluster0.zjyldku.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
client.connect(err => {
  const collection = client.db("test").collection("devices")
  // perform actions on the collection object
  client.close()
});

app.use( express.urlencoded({ extended:true }) )

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

let collection = null
let usern = null
let hasUser = null

app.post( '/login', (req,res)=> {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  //console.log( req.body.password)
  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
      let data = null
      usern = req.body.username

      client.connect()
      .then( () => {
        // will only create collection if it doesn't exist
        return client.db( 'database1' ).collection( 'collection1' )
      })
      .then (__collection => {
        collection = __collection    
        hasUser = collection.find({'username' : req.body.username}).toArray()
        return hasUser
      })
      .then( __hasUser => {
        if(__hasUser.length === 0){
            console.log("Account does not exist. Creating new account.") //TODO: Make visible to user
            //add account
            collection.insertOne( req.body )//.then( result => res.json( result )) 
        
        }
        data = collection.find({ 'password' : req.body.password, 'username' : req.body.username}).toArray()

        return data
      })
      .then( allCollection =>{
        //console.log(allCollection)
        //console.log(req.body.username)
        //console.log(req.body.password)

        if(allCollection.length != 0){
            req.session.login = true
            console.log("logged in")
            // since login was successful, send the user to the main content
            // use redirect to avoid authentication problems when refreshing
            // the page or using the back button, for details see:
            // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
            res.redirect('/views/main.html')
        }
        else{
            req.session.login = false
            console.log("Incorrect password") //TODO: Make visible to user
            res.sendFile( __dirname + '/views/login.html' )
        }
      })

      app.use( (req,res,next) => {
          if( collection !== null ) {
            console.log("not null")
            next()
          }else{
            console.log("login failed")
            res.status( 503 ).send()
      }
      })
    
})


// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    console.log('unauthenticated users to login')
    res.sendFile( __dirname + '/views/login.html' )
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/login.html")
})


// add some middleware that always sends unautheticated users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    console.log("not logged in")
   res.sendFile( __dirname + '/views/login.html' )
})

app.get( '/views/main.html', ( req, res) => {
    console.log("success you have logged in")
    res.sendFile( __dirname + '/views/main.html' )
})

dreams = []


app.post('/delete',  (req, res) => {
    console.log("in delete");
    req.body.username = usern   
    console.log("remove one")
    collection.updateOne({ username:usern }, {$pop: {"data" : -1/*data: req.body*/}})
    dreams = []
    collection.find({"username": usern}).toArray().then( allItems =>
        allItems.forEach(function(item) {
            dreams.push(item['data'])
        })
    )
    res.writeHead( 200, { 'Content-Type': 'application/json' })
    res.end( JSON.stringify( dreams ) )
})

app.post('/modify',  (req, res) => {
    console.log("in modify")
    req.body.username = usern   
    console.log(req.body)
    collection.updateOne({ username:usern }, {$set: {"data.0" : req.body}})
    dreams = []
    collection.find({"username": usern}).toArray().then( allItems =>
        allItems.forEach(function(item) {
            dreams.push(item['data'])
        })
    )
    res.writeHead( 200, { 'Content-Type': 'application/json' })
    res.end( JSON.stringify( dreams ) )
})


app.post( '/submit', (req, res) => {
        req.body.username = usern   

        collection.updateOne(
          { username:usern },
          {$push: {data: req.body} }
        )
       collection.find({"username": usern}).toArray().then( allItems =>
            allItems.forEach(function(item) {
                dreams.push(item['data'])
            })
        )
        res.writeHead( 200, { 'Content-Type': 'application/json' })
        res.end( JSON.stringify( dreams ) )
})
  
// route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({"user": usern }).toArray().then( result => res.json( result ) )
  }
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port)
})

app.listen( 3000 )
