const router = require("express").Router();
const path = require("path");
const bodyParser = require("body-parser");

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);
router.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/login.html"))
);
router.use("/api", bodyParser.json(), require("./api"));

module.exports = router;
