const express = require("express");
const { User, Task } = require("../models");

const router = express.Router();

/**
 * Get all the task with a given user id
 */
router.get("/", async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.send(tasks);
});

module.exports = router;
