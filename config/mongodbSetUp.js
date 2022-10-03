const { MongoClient, ServerApiVersion } = require('mongodb');
const keys = require("./keys");

const uri = `mongodb+srv://${keys.database.client_ID}:${keys.database.client_Secret}@cluster0.10yvowg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect((err) => {
//   //const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   //client.close();
//   console.log(err);
// });

module.exports = client;