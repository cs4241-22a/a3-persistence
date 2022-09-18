//     http://localhost:3000/ 
const express = require( 'express' ),
      mongodb = require('mongodb')
      app = express()

const { MongoClient, ServerApiVersion } = require('mongodb');

require("dotenv").config();


console.log(process.env.HOST);
app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) ) 


// const logger = (req,res,next) => {
//   console.log( 'url:', req.url )
//   next()
  
// }
// app.use( logger )

// app.get( '/', ( req, res ) => res.send( 'Hello World!' ) )



app.use( express.json() )


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'datatest5' ).collection( 'test' )
  })
  .then( collection => {
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

app.listen( process.env.PORT || 3000 )
