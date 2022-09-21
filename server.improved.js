const express = require('express'),
      mongodb = require('mongodb'),
      cookieSession = require('cookie-session'),
      path = require('path')
      passport = require('passport'),
      app = express(),
      passport = require('passport'),
      GitHubStrategy = require('passport-github2').Strategy,
      port = 3000

require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUBCLIENTID,
    clientSecret: process.env.GITHUBCLIENTSECRET,
    callbackURL: "https://a3-miles-gregg.herokuapp.com/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile)
}))

// setup passport and github OAuth
app.use(cookieSession({
  name: 'github-auth-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('views'))
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.get('/auth/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
})

app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/auth/github', passport.authenticate('github',{ scope: ['user:email'] }));
app.get('/auth/github/callback',
 passport.authenticate('github', { failureRedirect: '/auth/error' }),
 (req, res) => {
  console.log('redirecting to main webpage')
  res.redirect('/');
});

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login')
}

let remindersDB

const connect = async () => {
  const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
  const client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology:true})

  try {
    await client.connect()
    console.log('connected to mongodb server')
  } catch (e) {
    console.error(e)
  }

  remindersDB = client.db("datatest").collection("test")
  console.log(remindersDB)
}

connect()

//////////////////// GET DATA ////////////////////
app.get('/auth/getusername', checkAuth, (req, res) => {
  res.writeHeader( 200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({'username': req.user.username}))
})

app.get('/api/getdata', async (req, res) => {
  const output = await remindersDB.find({ user: req.user.username }).toArray()
  console.log(output)
  res.writeHeader(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(output))
})
//////////////////////////////////////////////////

//////////////////// POST DATA ///////////////////
app.post('/api/newreminder', checkAuth, async (req, res) => {
  req.body["user"] = req.user.username
  await remindersDB.insertMany([req.body])
  res.writeHead(200, "OK", {'Content-Type': 'application/json'})
  res.end()
})

app.post('/api/deletereminder', checkAuth, async (req, res) => {
  console.log('deleteing reminder')
  console.log(req.body)
  const deleteItem = await remindersDB.deleteMany({_id: mongodb.ObjectId(req.body._id)})
  if (deleteItem) {
    res.writeHead(200, "OK", {'Content-Type': 'application/json'})
    res.end()
  } else {
    res.writeHead(404, "id not found", {'Content-Type': 'application/json'})
    res.end()
  }
})

app.post('/api/updatereminder', checkAuth, async (req, res) => {
  console.log('updateing reminder')
  console.log(req.body)
  const updatedItem = await remindersDB.updateOne({_id: mongodb.ObjectId(req.body._id)}, {
    $set: {
      title: req.body.title,
      notes: req.body.notes,
      url: req.body.url,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location
    }
  })
  if (updatedItem) {
    console.log('updated item')
    res.writeHead(200, "OK", {'Content-Type': 'application/json'})
    res.end()
  } else {
    res.writeHead(404, "id not found", {'Content-Type': 'application/json'})
    res.end()
  }
})
//////////////////////////////////////////////////

app.listen(port)