const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userID: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('Users', dataSchema)
