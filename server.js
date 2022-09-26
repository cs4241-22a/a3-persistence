var md5 = require('md5');
var randToken = require('rand-token');
var path = require('path');
const express = require('express');
const app = express();
const port = 3000;
var morgan = require('morgan');
var favicon = require('serve-favicon')
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

app.use(morgan('dev'));
app.use(logTokenRequests);
//app.use(favicon(path.join(__dirname, 'public', 'favicon-32x32.png')))
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('/public/login.html', {root: __dirname});
});

app.get('/api/favorites', (req, res) => {
  //if(!activeUsers[req.body.token]){res.end();return;}
  //console.log(req.query);
  //console.log(activeUsers);
  const collection = client.db("users").collection("users");
  var username = activeUsers[req.query.token];
  collection.findOne({user:username}).then(userData => {
    try {
      delete userData.password; //No security breaches that easily lmao
    } catch(e){
      //Ignore
    }
    res.send(JSON.stringify(userData));
  });
  
});

app.post('/api/login', (req, res) => {
  //console.log(req.body);
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
          token: token
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


app.post('/api/new', (req, res) => {
  //if(!activeUsers[req.body.token]){res.end();return;}
  console.log(req.body);
  const collection = client.db("users").collection("users");
  collection.findOne({user:activeUsers[req.body.token]}).then(user => {
    console.log(user);
    var newUser = user;
    newUser.favorites.push({
      key: req.body.key,
      value: req.body.value,
      category: req.body.newcategory || req.body.category, //Custom category overrides existing categories
      description: req.body.description
    });
    collection.replaceOne({user:activeUsers[req.body.token]},newUser).then(()=>{
      res.end();
    });
  });
});

app.listen(port, () => {
  console.log(`Favoritizer listening on port ${port}`);
});

//Custom middleware
function logTokenRequests(req, res, next){
  try {
    var token = req.query.token || req.body.token;
    if(token){
      console.log(`\n${req.method} request made by user with token ${token} for url ${req.url}`);
    }
  } catch(e){
    //Ignore
  }
  next();
}
