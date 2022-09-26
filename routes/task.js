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

router.post("/", express.json(), async (req, res) => {
  const newTask = new Task({
    user: req.user,
    ...req.body,
  });

  console.log(newTask);

  Task.findOneAndUpdate({ _id: newTask._id }, newTask, {
    new: true,
    upsert: true,
  })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
