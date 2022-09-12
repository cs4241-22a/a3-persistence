const router = require("express").Router();
const bodyParser = require("body-parser");

router.use("/api", bodyParser.json(), require("./api"));

module.exports = router;
