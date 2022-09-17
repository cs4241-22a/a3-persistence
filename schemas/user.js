const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    githubId: String,
    username: String
})