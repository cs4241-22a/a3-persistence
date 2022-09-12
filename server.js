require('dotenv').config()
const express = require('express'),
    path = require('path'),
    passport = require('passport'),
    session = require('express-session')
require('./passport') // Initialize passport

const app = express()
app.use(session({secret: 'secret?', resave: false, saveUninitialized: false}))
app.use(passport.initialize({}))
app.use(passport.session({}))
app.use(logger)
app.use(ensureAuthenticated)
app.use(express.static(__dirname + '/public'))

const allowed = ['/login', '/auth/github', '/auth/github/callback']

function logger(req, res, next) {
    console.log('URL:', req.path)
    return next()
}

// Allow the user to continue if they are going to an allowed page OR if they are authenticated
function ensureAuthenticated(req, res, next) {
    if (allowed.includes(req.path) || req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

// Login page
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

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect('/')
    })
})

app.listen(process.env.PORT || 3000)