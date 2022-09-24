const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

client.connect();
const birthdayDB = client.db("Birthdays"); //Database where user specific collections store their entered birthdays

router.get("/", (req, res) => {
	res.render("index.ejs", { name: req.session.name });
});

router.get("/login", (req, res) => {
	if (req.session.login === true) {
		res.render("index.ejs", { name: req.session.name });
	} else {
		res.render("login.ejs", { error: "" });
	}
});

router.post("/logout", (req, res) => {
	req.session = null;
	res.redirect("/login");
});

router.post("/newBirthday", (req, res) => {
	let newBirthday = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		relationship: req.body.relationship,
		birthday: req.body.birthday,
		giftidea: req.body.giftidea,
		submitTime: Date.now(), //acts as UID for each birthday
	};
	birthdayDB.collection(req.session.user).insertOne(newBirthday);
	res.redirect("/");
});

router.get("/birthdays", async (req, res) => {
	let birthdays = await birthdayDB
		.collection(req.session.user)
		.find({})
		.toArray();
	res.json(birthdays);
});

router.post("/removeBirthday", async (req, res) => {
	let timeID = Number(req.body.submitTime);
	birthdayDB.collection(req.session.user).deleteOne({ submitTime: timeID });
	res.redirect("/");
});

router.post("/editBirthday", async (req, res) => {
	let body = req.body;
	let timeID = Number(body.submitTime);
	filter = { submitTime: timeID };
	let birthToEdit = await birthdayDB
		.collection(req.session.user)
		.findOne(filter);
	res.json(birthToEdit);
});

router.post("/updateBirthday", async (req, res) => {
	let updateBirthday = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		relationship: req.body.relationship,
		birthday: req.body.birthday,
		giftidea: req.body.giftidea,
		submitTime: Number(req.body.submitTime),
	};
	let filter = { submitTime: updateBirthday.submitTime };
	let birthToEdit = await birthdayDB
		.collection(req.session.user)
		.findOne(filter);
	delete birthToEdit._id;
	let diff = compareBirthdays(birthToEdit, updateBirthday);
	let update = {
		$set: diff,
	};
	await birthdayDB.collection(req.session.user).updateOne(filter, update);
	res.redirect("/");
});

//Function to compare update birthday object with stored object to determine which fields differ
function compareBirthdays(dbBirthday, newUpdate) {
	if (Object.keys(dbBirthday).length == 0 && Object.keys(newUpdate).length > 0)
		return newUpdate;

	let diff = {};
	for (const key in dbBirthday) {
		if (newUpdate[key] && dbBirthday[key] != newUpdate[key]) {
			diff[key] = newUpdate[key];
		}
	}
	if (Object.keys(diff).length > 0) return diff;

	return dbBirthday;
}

module.exports = router;
