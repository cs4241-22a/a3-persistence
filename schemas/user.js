const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  username: String,
  github_id: String,
});
