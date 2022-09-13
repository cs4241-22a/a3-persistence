const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    date: String,
    hits: Number,
    atBats: Number,
    avg: Number,
    owner: String
})