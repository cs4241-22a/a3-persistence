const express = require("express");
const { User, Task } = require("../models");

const router = express.Router();

/**
 * Get all the task with a given user id
 */
router.delete("/", express.json(), async (req, res) => {
  const query = await Task.findOneAndDelete({ _id: req.body._id });
  if (!query) {
    res.status(404).send("[ERROR] There was an issue with deleting the task.");
  } else {
    res.status(200).send("[SUCCESS] Task has been deleted.");
  }
});

module.exports = router;
