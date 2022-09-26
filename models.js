const mongoose = require("mongoose");

const userSchema = require("./schemas/user");
const taskSchema = require("./schemas/task");

const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

module.exports = { User, Task };
