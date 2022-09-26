const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userID: {
        required: true,
        type: String
    },
    task: {
        required: true,
        type: String
    },
    days: {
        required: true,
        type: Number
    },
    startDate:{
        required: true,
        type: Date
    },
    description: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)
