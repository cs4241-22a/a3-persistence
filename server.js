const { request, response } = require('express');
const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      cookie  = require( 'cookie-session' ),
      port = 3000,
      cookieParser = require('cookie-parser');

const app = express();

const { create } = require("domain");
const {MongoClient} = require("mongodb");

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/views/login.html'));
})

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
})

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/css/style.css'));
})

app.get('/scripts.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/js/scripts.js'));
})

app.post('/login', (req, res) => {
  res.json(req.body);
})

const uri = "mongodb+srv://tiatmehta:AAJIiuFYop9o1LhQ@cluster0.wdwrlpg.mongodb.net/?retryWrites=true&w=majority";
  
const client = new MongoClient(uri);

const databaseCollection = client.db("sample_a3").collection("characters");

app.get('/', (request, response) => {
  if (databaseCollection !== null) {
    databaseCollection.find([]).toArray().then(result => response.json(result));
    response.sendFile(__dirname + '/public/index.html');
  }
});

app.post('/add', (request, response) => {
  let data = request.body;
  createData(client, data);
})

app.post('/update', (request, response) => {
  let data = request.body;
  databaseCollection.findOneAndUpdate(
    {}
  )
})

app.post('/delete', (request, response) => {
  let data = request.body
  deleteChar(client, data)
})

async function main() {  
  try {
    await client.connect();

    await createData(client, {
      name: "Childe",
      weapon: "Bow",
      element: "Hydro",
      level: 90
    });

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function createData(client, newData) {
  const result = await client.db("sample_a3").collection("characters").insertOne(newData);

  console.log(`New character created with the following id: ${result.insertedID}`);
}

async function createUser(client, newUser) {
  const result = await client.db("sample_a3_2").collection("users").insertOne(newUser);
}

async function updateChar(client, charName, updatedChar) {
  const result = await client.db("sample_a3").collection("characters").updateOne(
    {name : charName}, {$set : updatedChar});

}

async function deleteChar(client, charName) {
  const result = await client.db("sample_a3").collection("characters").deleteOne({name : charName});

}



// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();
//   console.log("Databases:");
//   databasesList.databases.forEach(db => {
//     console.log(`- ${db.name}`)
//   })
// }

app.listen(process.env.PORT || port);