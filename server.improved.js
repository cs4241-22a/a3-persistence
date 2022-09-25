const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  express = require( 'express' ),
  session = require('express-session'),
  passport = require('passport'),
  mongodb = require('mongodb'),
  app = express(),
  path = require('path'),
      compression = require('compression'),
      serveStatic = require('serve-static'),

  port = 3000;

require('./passport')
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize({}))
app.use(passport.session({}))
app.use(serveStatic(path.join(__dirname, '/public')))

app.use( express.json() )
app.use(compression())

// Connect to mongodb
const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })

let collection = null
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    collection = client.db( 'todoData' ).collection( 'a3' )
  })



app.get('/login', (req, res) => {  
    res.sendFile("login.html", {user: req.user, root: __dirname + '/public'})
})

app.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}), (req, res) => {
    // This is redirected, so will not be called
})

app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    // If successful, redirect to homepage
    res.redirect('/')
})

app.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect('/')
    })
})

// route to get all docs
app.get('/table', ensureAuthenticated, (req, res) => {
  collection.find({github_id: req.user.id}).toArray().then( result => res.json( result ) )
     // res.sendFile("/public/index.html", { root: __dirname });
})

app.get('/table/:id', ensureAuthenticated,(req, res) => {
    collection.findOne({_id: mongodb.ObjectId(req.params.id)}).then(result => res.json(result))
})

app.post('/table', ensureAuthenticated,(req, res) => {
    let task = req.body
    task.github_id = req.user.id
    task.priority = priority(req.body.due)
    collection.insertOne(req.body).then(result => res.json(result))
})

app.delete('/table/:id',ensureAuthenticated, (req, res) => {
    collection.findOne({_id: mongodb.ObjectId(req.params.id)}).then(result => {
        // If a different user tries to delete a task, return 403 Forbidden
      console.log(result)
        if (req.user.id !== result.github_id) {
            res.status(403).send()
        } else {
            collection
                .deleteOne({_id: mongodb.ObjectId(req.params.id)})
                .then(result => res.json(result))
        }
    })
})

app.patch('/table/:id', ensureAuthenticated, (req, res) => {
  console.log(req.body.todo)
  console.log(req.params.id)
    collection.findOne({_id: mongodb.ObjectId(req.params.id)}).then(result => {
        console.log(result)
            collection
                .updateOne({_id: mongodb.ObjectId(req.params.id)}, {
                    $set: {
                        todo: req.body.todo,
                        due: req.body.due,
                        priority: priority(req.body.due)
                    }
                }).then(result => res.json(result))
        }
    )
})


const priority = function (duedate) {
  const today = Date.now();
  const due = new Date(duedate);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isNaN(diffDays)) {
    return "N/A";
  } else if (diffDays <= 1) {
    return "RED";
  } else if (diffDays <= 3) {
    return "YELLOW";
  } else {
    return "GREEN";
  }
};

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    console.log('redirect')

    res.redirect('/login')
  
}


app.listen(process.env.PORT || port);
