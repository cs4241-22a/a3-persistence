const express = require("express")
const router = express.Router()
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

client.connect();
const birthdayDB = client.db("Birthdays");

router.get("/", (req, res) => {
    res.render("index.ejs");
})

router.get("/login", (req, res) => {
	if (req.session.login === true) {
		res.render("index.ejs")
	} else {
		res.render("login.ejs", {error: ""})
	}
})

router.get("/register", (req, res) => {
	res.render("index.ejs")
})

router.post("/logout", (req, res) => {
	req.session = null;
	res.redirect("/login")
})

router.post("/newBirthday", (req, res) => {
	let newBirthday = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		relationship: req.body.relationship,
		birthday: req.body.birthday,
		giftidea: req.body.giftidea,
		submitTime: Date.now(),
	};
	birthdayDB.collection(req.session.user).insertOne(newBirthday)
	res.redirect("/")
})

router.get("/birthdays", async (req, res) => {
	let birthdays = await birthdayDB.collection(req.session.user).find({}).toArray();
	res.json (birthdays)
})

module.exports = router