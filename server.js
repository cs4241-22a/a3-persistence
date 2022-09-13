const express    = require('express'),
      app        = express(),
      workouts   = []
const serveStatic = require('serve-static')
const timeout = require('connect-timeout')
const cookieSession = require('cookie-session')
const responseTime = require('response-time')
const compression = require('compression')

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.LINK}`;
const uri = "mongodb+srv://Dillon:ba11islife@the-jim.u7npayt.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
debugger
client.connect()
.then( () => {
  const collection = client.db("TheJim").collection("Push Day");
  console.log(collection)
  return collection
})

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(compression())
app.use(responseTime())
app.use( serveStatic( 'public' ) )
app.use( serveStatic( 'views'  ) )
app.use( express.json() )
app.use(timeout('5s'))

app.post( '/submit', (req, res) => {
  workouts.push( req.body.newLift )
  res.writeHead( 200, { 'Content-Type': 'application/json' })
  res.end( JSON.stringify( workouts ) )
})

app.listen( process.env.PORT || 3000)