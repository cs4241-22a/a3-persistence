//     http://localhost:3000/ 
const express = require( 'express' ),
      app = express()


app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) ) 


const logger = (req,res,next) => {
  console.log( 'url:', req.url )
  next()
  console.log ("hello")
}
app.use( logger )

app.get( '/', ( req, res ) => res.send( 'Hello World!' ) )

// const port = 3000
// app.listen(port, () =>console.info(`Listening on port ${port}`))
app.listen( process.env.PORT || 3000 )

// const { MongoClient, ServerApiVersion } = require('mongodb');
// //const uri = "mongodb+srv://tester:tester123@cluster0.f9zkh.mongodb.net/?retryWrites=true&w=majority";
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`

// //const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect()
//   .then( () => {
//     // will only create collection if it doesn't exist
//     return client.db( 'datatest5' ).collection( 'test' )
//   })
//   .then( collection => {
//     // blank query returns all documents
//     return collection.find({ }).toArray()
//   })
//   .then( console.log )

