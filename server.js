if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const mongodb = require("mongodb");
const methodOverride = require("method-override");
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

const initializePassport = require("./passportConfig");
initializePassport(passport, getUserByEmail, getUserByID);

app.set("view-engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.get("/login", (req, res) => {
	debugger;
	res.render("login.ejs");
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	})
);

app.get("/register", (req, res) => {
	res.render("register.ejs");
});

app.post("/register", async (req, res) => {
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
		res.redirect("/register");
	}
});

app.delete("/logout", function (req, res, next) {
	req.logOut(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/login");
	});
});

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}

app.listen(3000);
