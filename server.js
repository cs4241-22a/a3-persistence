require('dotenv').config()
const express = require('express'), path = require('path'), passport = require('passport'),
    session = require('express-session')
require('./passport')

const app = express()
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false}))
app.use(passport.initialize({}))
app.use(passport.session({}))
app.use(logger)
app.use(connectionChecker)
app.use(ensureAuthenticated)
app.use(express.json())
app.use(express.static(__dirname + '/public'))


// DATABASE INITIALIZATION

let collection = undefined
const mongodb = require('mongodb')
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/?retryWrites=true&w=majority`
const client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})

client.connect().then(() => {
    collection = client.db('data').collection('todos')
})


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

// Get all tasks from the given user GitHub id
app.get('/todo', ensureAuthenticated, (req, res) => {
    collection.find({github_id: req.user.id}).toArray().then(result => {
        res.json(result)
    })
})

// Put in a new task but set GitHub ID first
app.put('/todo', ensureAuthenticated, (req, res) => {
    let task = req.body
    task.github_id = req.user.id
    task.priority = determinePriority(req.body.due_date)
    collection.insertOne(req.body).then(result => {
        res.json(result)
    })
})

// Update the task based on the specified ID
app.patch('/todo/:id', ensureAuthenticated, (req, res) => {
    collection.findOne({_id: mongodb.ObjectId(req.params.id)}).then(result => {
        // If a different user tries to delete a task, return 403 Forbidden
        if (req.user.id !== result.github_id) {
            res.status(403).send()
        } else {
            collection
                .updateOne({_id: mongodb.ObjectId(req.params.id)}, {
                    $set: {
                        task: req.body.task,
                        due_date: req.body.due_date,
                        priority: determinePriority(req.body.due_date)
                    }
                }).then(result => res.json(result))
        }
    })
})

// Delete the task based on the specified ID
app.delete('/todo/:id', ensureAuthenticated, (req, res) => {
    collection.findOne({_id: mongodb.ObjectId(req.params.id)}).then(result => {
        // If a different user tries to delete a task, return 403 Forbidden
        if (req.user.id !== result.github_id) {
            res.status(403).send()
        } else {
            collection
                .deleteOne({_id: mongodb.ObjectId(req.params.id)})
                .then(result => res.json(result))
        }
    })
})

// HELPER FUNCTIONS

const determinePriority = function (due_date) {
    const seconds_in_day = 86400
    const end = new Date(due_date)

    const now = Date.now();
    const timeDifference = (end - now) / 1000;

    if (end < now) // If already past due date, then mark as late
        return 'Late'
    else if (timeDifference < seconds_in_day * 3) // Less than 3 days
        return 'High'
    else if (timeDifference < seconds_in_day * 7) // Less than 7 days
        return 'Medium'
    else
        return 'Low'
}

function logger(req, res, next) {
    console.log(req.method, req.path)
    return next()
}

function connectionChecker(req, res, next) {
    if (collection !== undefined) {
        return next()
    } else res.status(503).send()
}

// Allow the user to continue if they are going to an allowed page OR if they are authenticated
const allowed = ['/login', '/auth/github', '/auth/github/callback']

function ensureAuthenticated(req, res, next) {
    if (allowed.includes(req.path) || req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

app.listen(process.env.PORT || 3000)