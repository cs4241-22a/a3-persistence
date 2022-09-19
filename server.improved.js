//Define constant vars
require('dotenv').config()
const express = require('express'),
      app = express(),
      compression = require('compression'),
      helmet = require('helmet'),
      mongodb = require('mongodb'),
      MongoClient = mongodb.MongoClient,
      uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/datatest?retryWrites=true&w=majority`,
      client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true,}),
      GitHubStrategy = require('passport-github').Strategy,
      passport = require('passport'),
      session = require('express-session')

let githubid = null
let collection = null

client.connect((err) => {
  collection = client.db('datatest').collection('test');
});

app.use(
    session({secret: 'secret', resave: false, saveUninitialized: false, cookie: {httpOnly: true, secure: true, maxAge: 60 * 1000,},})
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, callback) {
  callback(null, user.id);
})

passport.deserializeUser(function (id, callback) {
  callback(null, id);
})

passport.use(
  new GitHubStrategy({
      clientID: process.env.ID,
      clientSecret: process.env.SECRET,
      callbackURL: 'https://fun-game-stats.herokuapp.com/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
)

app.use((req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    res.status(503).send()
  }
})

app.use(helmet())

app.use(compression())

const checkauthenticated = (request, response, next) => {
  if (request.user) {
    next();
  } else {
    response.redirect('/login.html')
  }
}

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/login.html')
})

app.get('/index', checkauthenticated, function (request, response) {
  response.sendFile(__dirname + '/public/index.html')
})

app.get('/logout', function (request, response) {
  //request.logOut()
  response.redirect('/')
})

app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login.html' }),
  function (req, res) {
    githubid = req.user.id;
    res.redirect('/index.html')
  }
)

const calcKDA = function (kills, assists, deaths) {
  return ((kills + assists) / deaths).toPrecision(3);
}

app.post('/table', express.json(), function (request, response) {
  collection
    .find({ creator: githubid })
    .toArray()
    .then((result) => response.json(result));
})

app.post('/submit', express.json(), function (request, response) {
  const kda = calcKDA(request.body.kills, request.body.assists, request.body.deaths)

  collection
    .insertOne({
      creator: githubid,
      game: request.body.game,
      character: request.body.character,
      kills: request.body.kills,
      assists: request.body.assists,
      deaths: request.body.deaths,
      kda: kda,
    })
    .then(() => collection.find({ creator: githubid }).toArray())
    .then((result) => response.json(result))
})

app.post('/delete', express.json(), function (request, response) {
  collection
    .deleteOne({ _id: mongodb.ObjectId(request.body.id) })
    .then(() => {
      return collection.find({ creator: githubid }).toArray()
    })
    .then((result) => response.json(result));
})

app.post('/edit', express.json(), function (request, response) {
  const kda = calcKDA(request.body.kills, request.body.assists, request.body.deaths)

  collection
    .updateOne(
      { _id: mongodb.ObjectId(request.body.id) },
      {
        $set: {
          creator: githubid,
          game: request.body.game,
          character: request.body.character,
          kills: request.body.kills,
          assists: request.body.assists,
          deaths: request.body.deaths,
          kda: kda,
        },
      }
    )
    .then(() => collection.find({ creator: githubid }).toArray())
    .then((result) => response.json(result))
})

app.use(express.static('public'))

app.listen(process.env.PORT || 3000)