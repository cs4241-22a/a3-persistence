const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("index.ejs");
})

router.post("/logout", (req, res) => {
	req.session = null;
	res.redirect("/login")
})

module.exports = router