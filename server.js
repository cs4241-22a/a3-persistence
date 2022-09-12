require('dotenv').config()
const express = require('express'), path = require('path'), passport = require('passport'),
    session = require('express-session')
require('./passport')

const app = express()
app.use(session({secret: 'secret?', resave: false, saveUninitialized: false}))
app.use(passport.initialize({}))
app.use(passport.session({}))
app.use(logger)
app.use(connectionChecker)
app.use(ensureAuthenticated)
app.use(express.json())
app.use(express.static(__dirname + '/public'))

function logger(req, res, next) {
    console.log('URL:', req.path)
    return next()
}

function connectionChecker(req, res, next) {
    if (collection !== undefined) return next()
    else res.status(503).send()
}

// Allow the user to continue if they are going to an allowed page OR if they are authenticated
const allowed = ['/login', '/auth/github', '/auth/github/callback']

function ensureAuthenticated(req, res, next) {
    if (allowed.includes(req.path) || req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

// DATABASE INITIALIZATION
let collection = undefined;
const mongodb = require('mongodb')
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/?retryWrites=true&w=majority`
const client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})

client.connect().then(() => {
    return client.db('data').collection('todos')
}).then(_collection => {
    collection = _collection
    return collection.find({}).toArray()
}).then(console.log)

// AUTHENTICATION

app.get('/login', (req, res) => {
    res.sendFile('login.html', {user: req.user, root: path.join(__dirname, 'public')})
})

// noinspection JSCheckFunctionSignatures
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


// DB ACTIONS

app.get('/todos', ensureAuthenticated, (req, res) => {
    // TODO make sure it only gets ones for that given user
    collection.find({}).toArray().then(result => res.json(result))
})

app.put('/submit', ensureAuthenticated, (req, res) => { // TODO update path
    collection.insertOne(req.body).then(result => res.json(result))
})

app.delete('/delete', ensureAuthenticated, (req, res) => { // TODO update path
    collection
        .deleteOne({_id: mongodb.ObjectId(req.body._id)})
        .then(result => res.json(result))
})

app.patch('/update', ensureAuthenticated, (req, res) => { // TODO update path
    collection
        .updateOne({_id: mongodb.ObjectId(req.body._id)}, {$set: {name: req.body.name}})
        .then(result => res.json(result))
})

app.listen(process.env.PORT || 3000)