const express = require("express");
const router = express.Router();

router.get("/task", function (req, res) {
  res.sendFile(__dirname + "/views/task.html");
});

module.exports = router;
