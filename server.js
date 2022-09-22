//init 
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const UserRouter = require('./api/User')
const PORT = process.env.PORT

app.set('view engine', 'ejs')

// bodyParser
const bodyParser = require('express').json;
app.use(bodyParser())

// routes
app.get('/', (req, res) => {
    res.render('index', { text: "Hi, I'm Gabe" })
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.use('/user', UserRouter)

//connect to DB
connectDB();

const db = mongoose.connection
db.on('error', (error) => { console.error(error) })
db.once('open', () => {
    console.log("Connected to database");
    app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
})



































