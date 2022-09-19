console.log("Starting Server...")
require('dotenv').config()

const express = require('express'),
  app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');

console.log("Connecting to mongoDB...")
//const uri = "mongodb+srv://tester:raXPCkrqlKpjrG7l@cluster0.iv5etnh.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    const collection = client.db("test").collection("devices");
    if(err)
      console.log('error:', err)
    else
      console.log("Connected to mongoDB successfully!")
    // perform actions on the collection object
    client.close();
  });
  
app.use(express.static('public'))
app.use(express.static('views'))
app.use(express.json())

/**
 * When new data is submitted
 */
app.post('/submit', (req, res) => {

})

app.listen(process.env.PORT || 3000)