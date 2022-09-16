const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
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

async function matchPassword (enteredPW, storedHash) {
	return await bcrypt.compare(enteredPW, storedHash)
}

router.get("/", (req, res) => {
    res.render("login.ejs");
})

router.get("/login", (req, res) => {
	res.render("login.ejs");
});

router.post("/login", async (req, res) => {
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

router.get("/register", (req, res) => {
	res.render("register.ejs");
});

router.post("/register", async (req, res) => {
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

module.exports = router