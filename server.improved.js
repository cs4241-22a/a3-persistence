const express = require( 'express' ),
      mongodb = require( 'mongodb' ),
      app = express()

//app.get('/', (req, res) => res.send('Hello Wordld!'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.use( express.static('public') )
app.use( express.json() )

const uri = 'mongodb+srv://csnow99:0w9PUDhNCjhPwJsk@cluster0.vwmaw2f.mongodb.net/test'

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => client.db( 'testdb' ).collection( 'test collection' ) )
  .then( __collection => {
    collection = __collection
    return collection.find({ }).toArray()
  })
  .then( console.log )
  
/*// route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})*/

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});