const dotenv = require("dotenv");

dotenv.config();

const express = require('express'),
	cookie  = require('cookie-session'),
	mongoose = require('mongoose'),
	app = express()


//DATABASE
mongoose.connect("mongodb+srv://admin:admin2023@cluster0.kbjoelc.mongodb.net/?retryWrites=true&w=majority")
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

//MIDDLEWARE
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('views')) 

//COOKIES
app.use(express.urlencoded({extended:true}))

app.use(cookie({
	name: 'session',
	keys: ['key1', 'key2']
}))


//AUTHENTICATION
app.post('/login', (req, res) => {
	console.log(req.body)
});

app.post('/signUp', (req, res) => {
	if(req.body.uname != "" && req.body.pword != ""){
		router.post()
	}
});

app.use(function(req,res,next){
	if(req.session.login == true)
		next()
	else
		res.sendFile('index.html')
})



app.listen(3000, () => console.log('Server started succesfully!'))

