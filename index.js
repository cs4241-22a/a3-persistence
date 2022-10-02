// server
const express = require('express'),
  cookie = require('cookie-session'),
  mongo = require('mongodb'),
  crc32 = require('crc32'),
  compression = require('compression'),
  rid = require('connect-rid'),
  app = express()

require('dotenv').config()

const uri = 'mongodb+srv://' + process.env.DBUSER + ':' + process.env.DBPASS + '@' + process.env.HOST
const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let collection = null
console.log(uri)
client.connect()
  .then(() => {
    return client.db('a3').collection('a3')
  })
  .then(__collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({}).toArray()
  })
  .then(console.log)

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static('views'))
app.use(cookie({
  name: 'moene-session',
  keys: [process.env.SECRETA, process.env.SECRETB]
}))
app.use(rid({
  headerName: 'X-RID'
}));
app.use(express.json())
app.use(compression({ filter: shouldCompress }))
app.use(function (req, res, next) {
  //Custom middleware to change X-Powered-By
  res.setHeader("X-Powered-By", 'Moene Server v1.1');
  next();
});
app.post('/submit', (req, res) => {
  if (req.session.login != true) {
    res.writeHead(403, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      "Error": "NEED_LOGIN"
    }))
    return;
  }
  console.log(req.body)
  switch (req.body.action) {
    case "new":
      let tempdata = {}
      console.log(req.body)
      tempdata.name = req.session.name
      if (req.body.message != "") {
        tempdata.message = req.body.message
      } else {
        tempdata.message = "Nothing~"
      }
      tempdata.date = formatDate()
      tempdata.mid = parseInt(crc32(tempdata.name + tempdata.message + formatDate() + (Math.random() * 1000)), 16)
      collection.insertOne(tempdata).then(response => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          "RESULT": "NEW_OK"
        }))
      })
      break;
    case "delete":
      let delquery = {
        mid: req.body.mid
      }
      collection
        //The name field is used to enforce the user to only delete their own message on the server side
        .deleteOne({ mid: Number(req.body.mid), name: req.session.name })
        .then(result => {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({
            "RESULT": "DELETE_OK"
          }))
        })
      break;
    case "edit":
      collection
        //The name field is used to enforce the user to only edit their own message on the server side
        .updateOne(
          { mid: Number(req.body.mid), name: req.session.name },
          { $set: { message: req.body.message } }
        )
        .then(result => {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({
            "RESULT": "EDIT_OK"
          }))
        })
      break;
    default:
      res.writeHead(403, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        "RESULT": "UNKNOWN_ACTION"
      }))
      break;
  }
})
app.get('/', (req, res) => {
  if (req.session.login == true) {
    res.render('index', { motd: "Welcome: " + req.session.name, name: req.session.name });
  } else {
    res.redirect('/login');
  }
});
app.get('/login', (req, res) => {
  res.render('login', { client_id: clientID });
});
app.get('/logout', (req, res) => {
  req.session.login = false;
  res.redirect('/login');
});
app.get('/getmsg', (req, res) => {
  if (req.session.login != true) {
    res.writeHead(403, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      "Error": "NEED_LOGIN"
    }))
    return;
  }
  let response = []
  collection.find({}).toArray().then(result => {
    result.forEach(element => {
      response.push({
        "name": element.name,
        "message": element.message,
        "mid": element.mid
      })
    })
    res.json(response)
  }
  )

});
app.get('/ping', (req, res) => {
  res.json(JSON.stringify({
    'Status': 'OK'
  }))
});

//oauth

// Import the axios library, to make HTTP requests
const axios = require('axios')
// This is the client ID and client secret that you obtained
// while registering on github app
const clientID = 'f0e9dfff40fad91865a8'
//replaced by a fresh secret. Old secret is no longer usable
const clientSecret = process.env.GHSECRET

// Declare the callback route
app.get('/github/callback', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code
  console.log("Retrieving data");
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    access_token = response.data.access_token
    if (access_token == undefined) {
      res.end(JSON.stringify({
        "ERROR": "INVALID_CODE"
      }))
      return
    }
    console.log("Got token: " + access_token);
    axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    }).then((response) => {
      req.session.login = true
      req.session.name = response.data.login;
      res.redirect('/');
    })
  })
})

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}
function formatDate(date = new Date()) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('');
}

const listener = app.listen(process.env.PORT || 3000)