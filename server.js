var md5 = require('md5');
var randToken = require('rand-token');

const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://users:users@main-cluster.ck9ebum.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect().then(err => {
  console.error(err);
  /*
  const collection = client.db("users").collection("users");
  console.log(collection);
  collection.insertOne({
    user: 'Feathercrown',
    password: '',
    favorites: ['H']
  }).then((err,res)=>{
    console.log(err, res);
    //client.close();
  });
  collection.findOne({user:'Feathercrown'}).then(console.log);
  */
});


//////////

const activeUsers = {};

const appdata = {
  Feathercrown: {
    favorites: [
      {
        key: 'Pizza',
        value: 'Pepperoni',
        category: 'Foods',
        description: 'It\'s the simplest meat topping there is'
      }
    ]
  }
};

app.use(logRequests);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('/public/index.html', {root: __dirname});
});

app.get('/api/users/*', (req, res) => {
  console.log(req.url.slice(11));
  console.log(req.query);
  res.send(JSON.stringify(appdata['Feathercrown']));
});

app.post('/api/login', (req, res) => {
  console.log(req.body);
  const collection = client.db("users").collection("users");
  collection.findOne({user:req.body.username}).then(user => {
    if(user == null){
      collection.insertOne({
        user: req.body.username,
        password: req.body.password,
        favorites: []
      });
      var token = randToken.generate(16);
      activeUsers[token] = req.body.username;
      console.log('Active users:', activeUsers);
      res.send(JSON.stringify({
        login: 'newUser',
        token: token
      }));
    } else {
      if(user.password == req.body.password){
        var token = randToken.generate(16);
        activeUsers[token] = req.body.username;
        console.log('Active users:', activeUsers);
        res.send(JSON.stringify({
          login: 'success',
          token: randToken.generate(16)
        }));
      } else {
        res.send(JSON.stringify({
          login: 'failure',
          token: null
        }));
      }
    }
    //res.sendFile('/public/index.html', {root: __dirname});
  }).catch(err => {
    console.error(err);
  });
});

app.listen(port, () => {
  console.log(`Favoritizer listening on port ${port}`);
});

//Custom middleware
function logRequests(req, res, next){
  //console.log(req); //TODO: Improve
  next();
}
