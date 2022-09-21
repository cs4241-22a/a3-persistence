const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  user_id: String,
  title: String,
  description: String,
  priority: String,
  type: String,
  creation_date: Date,
  deadline_date: Date,
});
