const mongoose = require("mongoose");

/**
 * Mongoose schema for Task.
 */
module.exports = new mongoose.Schema({
  user: String,
  title: String,
  description: String,
  priority: String,
  type: String,
  creation_date: Date,
  deadline_date: Date,
});
