const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

router.get("/data", function (req, res) {
  res.sendFile(__dirname + "/views/data.html");
});

module.exports = router;
