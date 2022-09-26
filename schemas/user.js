const mongoose = require("mongoose");

/**
 * Mongoose schema for User.
 */
module.exports = new mongoose.Schema({
  username: String,
  github_id: String,
});
