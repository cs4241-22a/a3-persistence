const express = require("express");
const session = require('express-session');
const app = express();
const bodyparser = require('body-parser');
const mongodb = require('mongodb');
const cookie = require('cookie-session');
var userName = null;
const ServerApiVersion = require('mongodb');


app.set('trust proxy', 1) 

app.use(cookie({
  user: 'session',
  keys: ['key1', 'key2']
}))

//make all files in public available
app.use(express.static("public"));

app.get('/', (request, response) => {
  response.sendFile(__dirname + "/views/login.html");
});

app.get('/index', (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get('/register', (request, response) => {
  response.sendFile(__dirname + "/views/register.html");
});

app.get('/login', (request, response) => {
  response.sendFile(__dirname + "/views/login.html");
});

app.get('/loginfail', (request, response) => {
  response.sendFile(__dirname + "/views/loginfail.html");
});

//listen for requests
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const MongoClient = mongodb.MongoClient;
//const uri = `mongodb+srv://NadiyahGarris:${process.env.PASS}@nadiyahmongodbcluster.wdz2gqi.mongodb.net/datatest?retryWrites=true&w=majority`;
//const uri = `mongodb+srv://garrisnadiyah:${process.env.PASS}@nadiyahmongodbcluster.wdz2gqi.mongodb.net/datatest?retryWrites=true&w=majority`;
//const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.URL}`;
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
const uri = "mongodb+srv://garrisnadiyah:HopepuzzleChopper75@nadiyahmongodbcluster.wdz2gqi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let collection1 = null
let collection2 = null
let database = null

//collection1 is to store user info
//collection2 is to manipulate the data
/*
client.connect(err => {
  database = client.db("datatest");
  collection1 = database.collection("test");
  collection2 = database.collection("dataset");
});
*/

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'datatest' ).collection( 'test' )
  })
  .then( __collection1 => {
    // store reference to collection
    collection1 = __collection1
    // blank query returns all documents
    return collection1.find({ }).toArray()
  })
  //.then( console.log )

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'datatest' ).collection( 'dataset' )
  })
  .then( __collection2 => {
    // store reference to collection
    collection2 = __collection2
    // blank query returns all documents
    return collection2.find({ }).toArray()
  })


app.post('/getPlayerTable', (req, res) => {
  console.log(req.session.user);
  collection2.find({username: req.session.user}).toArray(function(err, docs) {
    if(err) {
      console.log("Get data failed!")
    } else {
      if(docs.length >= 0) {
        res.json(docs)
      } else {
        console.log("Get data failed!")
      }
    }
  })
})


app.post('/signup', bodyparser.json(), function(req, res) {
  collection1.insertOne(req.body)
  .then(dbresponse => {
    console.log(dbresponse)
    res.json({id:dbresponse.insertedId})

  })
})


app.post('/signin', bodyparser.json(), function(req, res) {
  collection1.find(req.body).toArray(function(err, docs) {
    if(err) {
      res.json({result:"fail"})
    } else {
      if (docs.length > 0) {
        req.session.login = true;
        req.session.user = req.body.name;
        console.log('username will display here:', req.session.user)
        
        res.json({result:"success"})
      } else {
        res.json({result:"fail"})
      }
    }
  })
})


app.post('/addPlayer', bodyparser.json(), function(req, res) {
  const string1 = `{
  "username": "${req.session.user}"
  }`;
  
  const string2 = JSON.stringify(req.body);
  
  const obj1 = JSON.parse(string1);
  const obj2 = JSON.parse(string2);
  
  const mergedObject = {
    ...obj1,
    ...obj2
  };
  
  collection2.insertOne(mergedObject)
  .then(dbresponse => {
    collection2.find({username:req.session.user}).toArray(function(err, docs) {
      if(err) {
        console.log("Adding in data failed!")
      } else {
        if(docs.length > 0) {
          res.json(docs)
        } else {
          console.log("Adding in data failed!")
        }
      }
    })
  })
})


app.post('/deletePlayer', bodyparser.json(), function(req, res) {
  collection2.deleteOne({name:req.body.name, username:req.session.user})
  .then(dbresponse => {
    collection2.find({username:req.session.user}).toArray(function(err, docs) {
      if(err) {
        console.log("Get data failed!")
      } else {
        if(docs.length > 0) {
          res.json (docs)
        } else {
          console.log("Get data failed!")
        }
      }
    })
  })
})

app.post('/update', bodyparser.json(), function(req,res) {
  collection2.updateOne(
  {name:req.body.name, username:req.session.user},
  {$set:{playerName:req.body.playerName, jerseyNumber:req.body.jerseyNumber, position:req.body.position, classYear:req.body.classYear} }
  )
  .then(dbresponse => {
    collection2.find({username:req.session.user}).toArray(function(err, docs) {
      if(err) {
        console.log("Get data failed!")
      } else {
        if(docs.length > 0) {
          res.json(docs)
        } else {
          console.log("Get data failed!")
        }
      }
    })
  })
})

app.use(function(req,res,next) {
  if(req.session.login ===true)
    next()
  else
    res.sendFile(__dirname + '/views/login.html')
})

