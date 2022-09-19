const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { application } = require("express");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

client.connect();
const Users = client.db("Users").collection("Users"); //Collection where users are stored

//Ruturns user object based on email adress
async function getUserByEmail(email) {
	let user = await Users.findOne({ email: `${email}` });
	return user;
}

router.get("/", (req, res) => {
	if (req.session.login === true) {
		res.render("index.ejs", { name: req.session.name });
	} else {
		res.render("login.ejs", { error: "" });
	}
});

router.get("/login", (req, res) => {
	res.render("login.ejs", { error: "" });
});

router.post("/login", async (req, res) => {
	// Authenticate user and store session cookie
	let email = String(req.body.email);
	let lowEmail = email.toLowerCase();
	let newLogin = await getUserByEmail(lowEmail);
	//Check if email is assosciated with a user
	if (newLogin === null) {
		//If no user assosciated with email, display error message
		res.render("login.ejs", {
			error: "The username or password is incorrect, please try again",
		});
	} else {
		bcrypt.compare(req.body.password, newLogin.password, (err, data) => {
			if (err) {
				//Comparison function fails
				throw err;
			}
			if (data) {
				//Password is a match
				req.session.login = true;
				req.session.user = lowEmail;
				req.session.name = newLogin.name;
				res.redirect("/");
			} else {
				//Passwords do not match
				req.session = null;
				res.render("login.ejs", {
					error: "The username or password is incorrect, please try again",
				});
			}
		});
	}
});

router.get("/register", (req, res) => {
	res.render("register.ejs", { error: "" });
});

router.post("/register", async (req, res) => {
	let user = await getUserByEmail(req.body.email);
	//Check to make sure a user with that email adress doesn't already exist
	if (user === null) {
		//Try creating new user if none exist
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			let email = String(req.body.email);
			let lowEmail = email.toLowerCase();
			const newUser = {
				name: req.body.name,
				email: lowEmail,
				password: hashedPassword,
			};
			Users.insertOne(newUser);
			res.redirect("/login");
		} catch {
			//Return to register page if try new user not created
			res.redirect("register");
		}
	} else {
		//The email address used to register is already attatched to a user, display error
		res.render("register.ejs", {
			error:
				"There is already an account assosciated with this email adress, please try again using a different adress.",
		});
	}
});

module.exports = router;
