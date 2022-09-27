if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require("express")
const app = express()
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const initializePassport = require("./passport-config")
const { redirect } = require('express/lib/response')
const mongoose = require('mongoose')

// Mongoose setup
mongoose.connect('mongodb+srv://shenf:Fangshen0925@cluster0.dbnhrcz.mongodb.net/?retryWrites=true&w=majority')

const User = require('./schema')

async function createUser(){
    const users = await User.find()
    for(let i=0;i<users.length;i++){
        if(users[i].username === 'admin'){
            console.log('user exist')
            return users
        }      
    }
    const user = new User({username: 'admin', password: 'admin', id: 1, fortunes: []})
    user = await user.save()
    console.log('user created')
    return users
}

const users = createUser()

users.then((users) =>{
    initializePassport(passport,
        username => users.find(user => user.username === username),
        id => users.find(user => user.id === id)
    )
})

//setting view engine to ejs
app.set('view-engine','ejs')

// middlewares 
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

//Requests
app.get('/',(req,res) => {
    if(req.isAuthenticated()) {
        res.render('index.ejs',{login: true, user: req.user})
        return
    }
    res.render('index.ejs',{login: false})
})

app.post('/', (req,res) => {
    const user = JSON.stringify(req.user)
    res.end(user)
})

app.post('/delete', (req,res) => {
    req.user.deleteFortune(req.body.num)
})

app.post('/logout', (req,res) => {
    req.logout(function(err) {
        if (err) { console.log(next(err))}
    })
})

app.post('/submit', (req,res) => {
    req.user.addFortune(req.body)
    res.redirect('/')
})

app.get('/login', checkLogin, (req,res) => {
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

function checkLogin(req,res,next){
    if(!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

app.listen(3000)
