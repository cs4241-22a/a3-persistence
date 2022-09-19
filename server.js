const express    = require('express'),
      app        = express(),
      dreams     = []

app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) )
app.use( express.json() )

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://CS4241:<pwd>@a3cluster.klzdhtp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// app.post( '/submit', (req, res) => {
//   dreams.push( req.body.newdream )
//   res.writeHead( 200, { 'Content-Type': 'application/json' })
//   res.end( JSON.stringify( dreams ) )
// })

app.listen( process.env.PORT )