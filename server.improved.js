const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const port = 3000;
const dir  = 'public/';
const path = require('path');

const express = require('express');
const app = express();
const cookie = require("cookie-session");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongodb = require("mongodb");

let users = []
const dbUser = 'movielist';
const dbPass = 'cs4241a3';

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.afow29j.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const refreshDB = () => {
  return client
    .connect()
    .then(() => {
      return client.db("movielist").collection("users");
    })
    .then((collection) => {
      users = collection;
      return users.find({}).toArray();
    });
};
refreshDB().then((appdata) => {
  console.log('Loaded db:');
  console.log(appdata);
});

app.use(
  cookie({
    name: "session",
    keys: [
      "2iMAwLWcViIKX5kAXuted14Jejr5Nwd4",
      "8ihbYfca2GFjh3eTvL1zpaWbgY0fZGWh",
    ],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, dir)));

app.post('/login', (req, res) => {
  req.session.id = undefined;
  req.session.logged = false;

  let username = req.body.username;
  let password = req.body.password;

  refreshDB().then((appdata) => {
    let user = appdata.find(user =>
      user.name === username
    );

    if (user && password === user.password) {
      req.session.id = user._id;
      req.session.logged = true;
      
      res.send({ valid: true });
    } else {
      res.send({ valid: false });
    }
  })
});

app.post('/register', (req, res) => {
  req.session.id = undefined;
  req.session.logged = false;

  let username = req.body.username;
  let password = req.body.password;

  refreshDB().then((appdata) => {
    let user = appdata.find(user =>
      user.name === username
    );

    if (!user) {      
      users.insertOne({
        name: username,
        password: password,
        movielist: []
      });

      refreshDB().then((appdata) => {
        user = appdata.find(user =>
          user.name === username
        );
        
        req.session.id = user._id;
        req.session.logged = true;

        res.send({ valid: true });
      });

    } else {
      res.send({ valid: false });
    }
  })
});

app.post('/logout', (req, res) => {
  req.session.id = undefined;
  req.session.logged = false;
});

app.get('/list', (req, res) => {
  if (req.session.logged) {
    refreshDB().then((appdata) => {
      let user = appdata.find(user =>
        user._id == req.session.id
      );
      
      res.send({ list: JSON.stringify(user.movielist),
                 user: user.name 
                });
    });
  }
});

app.post('/search', (req, res) => {
  movieStr = req.body.title.trim().replace(/ /g, '+');
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=60b6c6a4&s=${movieStr}&plot=short&r=json`)
    .then((response) => response.json())
    .then((data) => {
      res.send(JSON.stringify({
        type: "queryResp",
               data: data
      }));
      console.log("Sent response");
    });
});

app.post('/edit', (req, res) => {
  if (req.session.logged) {
    refreshDB().then((appdata) => {
      let user = appdata.find(user =>
        user._id == req.session.id
      );
      
      const entry = req.body.entry;
      const movielist = user.movielist;
      const idx = findTitle(entry, movielist);

      switch (req.body.type) {
        case 'add':
          entry['URL'] = `https://www.imdb.com/title/${entry['imdbID']}/`;
              
          if (idx === -1)
            movielist.push(entry);
          break;
    
        case 'rmv':
          if (idx !== -1)
            movielist.splice(idx, 1);
          break;
        
        case 'movup':
          if (idx > 0) {
            temp = movielist[idx - 1];
            movielist[idx - 1] = movielist[idx];
            movielist[idx] = temp;
          }
          break;
        
        case 'movdn':
          if (idx < movielist.length - 1) {
            temp = movielist[idx + 1];
            movielist[idx + 1] = movielist[idx];
            movielist[idx] = temp;
          }
          break;
        
        default:
          res.sendStatus(400);
          return;
        }

        users.updateOne(
          { _id: user._id },
          { $set: {
              movielist: movielist
            },
          }
        );
    
        res.sendStatus(200);
    });
  }
});

const findTitle = function (obj, lst) {
  let idx = -1
  for (i = 0; i < lst.length; i++) {
    if (obj["imdbID"] === lst[i]["imdbID"]) {
      idx = i;
    }
  }

  return idx;
}

app.listen(process.env.PORT || port, (error) =>{
  if(!error)
      console.log("Server is Successfully Running,and App is listening on port "+ port);
  else 
      console.log("Error occurred, server can't start", error);
  }
);

