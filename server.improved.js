const http = require( 'http' ),
    express = require('express')
    app = express()
	MongoClient = require('mongodb').MongoClient
    bodyparser= require('body-parser')
	bcrypt = require('bcrypt')
	favicon = require('serve-favicon')
	passport = require("passport")
	expsls = require("express-slash")
	helmet = require('helmet')
	path = require('path')
	
	
//app.get('/', function(req, res) {res.end('test')})

app.use(bodyparser.json())
app.use(helmet())
app.use(expsls())
app.use(favicon(path.join(__dirname, 'public', 'SpartanHelm.ico')))

app.use("/home", express.static('public/index.html'))
app.use("/login", express.static('public/login.html'))
app.use("/register", express.static('public/register.html'))
app.use(express.static('public/css'))
app.use(express.static('public/js'))
app.use(express.static(__dirname + '/public'));

const client = new MongoClient("mongodb+srv://Admin:goatwpi@cluster0.inqdrsz.mongodb.net/?retryWrites=true&w=majority")
const db = null
let collection = null
let users = null
let name = ""

client.connect(function(err) {
	if(err !== null)
		console.log("Connected successfully to server");

	collection = client.db("dbdata").collection("Schedule");
    users = client.db("dbdata").collection("UserInfo");
	
	//client.close();
});


app.post("/register", async (req, res) => {

	try{
		users.count({uname:req.body.uname }).then(r =>{
			if(r > 0){
				message = "Fail"
				res.json(message);
			}
			else{
				bcrypt.hash(req.body.pass, 10, (err, hash) => {
					console.log(hash);
					users.insertOne({uname:req.body.uname, password: hash})
				});
				res.status(200).send("OK")
			}
		})
	}
	catch{
		console.log("failed to register")
		response.redirect('/register');
	}
});

//user login check with password hashing 
app.post("/login", async(request,response) => {
	try{
		let uin = request.body.uname;
		let pin = request.body.password;
		console.log(uin)
		console.log(pin)
		//check a user with that uname exist- username are unique 
		users.count({uname: uin}).then(r => {
			if(r > 0){
				console.log(r)
				users.find({uname: uin}).toArray().then(c =>{  
					console.log(c[0].password)
					bcrypt.compare(pin,c[0].password, function(err, res) {
						if(res == true){
							console.log("Autenticated")
							response.json("succes")
							name = uin;
						}
						else{
							let m = "Wrong Password"
							console.log(m)
							response.json(m);
						}
			   
					});
		   
				})
			}
			else{
				let m = "Wrong Username"
				console.log(m)
				response.json(m);
			}
		})
	}
	catch(e){
		console.log(e)
	}
})


app.use(function(req, res, next){
	//console.log("aaa")
	next()
})

app.get("/", (req, res) => {
  res.redirect("/login");
});



let appdata = [
  { 'eventname': 'Lunch', 'location': 'Subway', 'day': "mtwrfsu", 'time': 12, 'timeend': 2, 'duration': 2, 'color': "#FFA500", 'details': "yummy"}//,
  //{ 'eventname': '', 'location': '', 'day': , 'time': 2004, 'timeend': 30, 'duration': , 'deatils': },
  //{ 'eventname': '', 'location': '', 'day': , 'time': 1987, 'timeend': 14, 'duration': , 'deatils': } 
]




app.post("/clr", (req, res) => {
	collection.deleteMany({username:name})
	res.status(200).send("OK")
})

app.post("/new", (req, res) => {
	collection.insertOne({'username': req.body.username, 'eventname': req.body.eventname, 'location': req.body.location, 'day': req.body.day, 'time': req.body.time, 'timeend': req.body.timeend, 'duration': req.body.duration, 'color': req.body.color, 'details': req.body.details}).then(x => {res.end()})
	//res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
	
})

app.post("/del", (req, res) => {
	const data = res.json(req.body)
	let appdata2=[]
			for(let i = 0; i < appdata.length; i++){
				let datastring = data.name.toLowerCase().trim()
				let appastring = Object.values(appdata[i])[0].trim().toLowerCase()
				//console.log("datastring" + "/" + appastring)
				if(datastring !== appastring){
					appdata2.push(appdata[i])
					//console.log("delete")
				}
			}
			appdata = appdata2
	//res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
	res.end()
})

app.get("/logout", (req, res) => {
	//name = ""
	res.redirect("/login")
})

app.post("/getsch", (req, res) => {
	let username = req.body.username
	if(username === "" || username === null)
		res.status(401).send("UNAUTHORIZED")
	else
		if(collection !== null) {
			collection.find({username: username}).toArray().then( ret => { 
			console.log(ret)
			res.json(ret) })
		}
})

app.listen(process.env.PORT || 3000)

