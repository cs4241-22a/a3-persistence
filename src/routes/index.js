const router = require("express").Router();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

router.get("/", require("../middleware/is-logged-in"), (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);
router.get("/login", require("../middleware/is-not-logged-in"), (req, res) =>
  res.redirect("/auth/github")
);
router.use("/api", bodyParser.json(), morgan("tiny"), require("./api"));
router.use("/auth", require("./auth"));

module.exports = router;
