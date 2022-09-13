const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    name: {
        first: String,
        last: String
    }
})