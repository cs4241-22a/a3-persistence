if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const cookie = require("cookie-session");
const favicon = require("serve-favicon");
const path = require("path");
const nAuthedRouter = require("./routers/Nauthed");
const AuthedRouter = require("./routers/authed")
/** 
const bcrypt = require("bcrypt");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

client.connect();
const Users = client.db("Users").collection("Users");
const bithdayDB = client.db("Birthdays");

async function getUserByEmail(email) {
	let user = await Users.findOne({ email: `${email}` });
	return user;
}

async function getUserByID(id) {
	let user = await Users.findOne({ _id: `${id}` });
	return user;
}
*/

async function matchPassword (enteredPW, storedHash) {
	return await bcrypt.compare(enteredPW, storedHash)
}

app.set("view-engine", "ejs");
//app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookie({
	secret: process.env.SESSION_SECRET
}))

function routeDecider (req, res, next) {
	if (req.session.login === true) {
		app.use(AuthedRouter)
		next();
	} else {
		app.use(nAuthedRouter)
		next();
	}
}
app.use(routeDecider)


/**
app.get("/login", (req, res) => {
	res.render("login.ejs");
});

app.post("/login", async (req, res) => {
	// Authenticate user and store session cookie 
	let newLogin = await getUserByEmail(req.body.email);
	//Check if email is assosciated with a user
	if (newLogin === null) {
		//Need to reload page with warning if no account found with email
		//Render with error works but then you can't GET the page if error is undefined
		res.render("login.ejs", {error: "The username or password is incorrect"})
	} else {
		if ( matchPassword(req.body.password, newLogin.password) ) {
			req.session.login = true
			res.redirect("/")
		} else {
			//Need to reload page with warning if no account found with email
			//Render with error works but then you can't GET the page if error is undefined
			req.session = null;
			res.render("login.ejs", {error: "The username or password is incorrect"})
		}
	}	
})

app.get("/register", (req, res) => {
	res.render("register.ejs");
});

app.post("/register", async (req, res) => {
	let user = await getUserByEmail(req.body.email)
	//Check to make sure a user with that email adress doesn't already exist
	if (user === null) {
		//Try creating new user if none exist
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const newUser = {
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
			};
			Users.insertOne(newUser);
			res.redirect("/login");
		} catch {
			res.redirect("register");
		}
	} else {
		//Need to reload page with warning that email is already in use for an account
		//Render with error works but then you can't GET the page if error is undefined 
		res.render("register.ejs", {error: "There is already an account assosciated with this email adress"})
	}
})


app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.post("/logout", (req, res) => {
	req.session = null;
	res.redirect("/login")
})

*/
app.listen(3000);
