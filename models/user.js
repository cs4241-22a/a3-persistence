const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	userName:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	registeredDate:{
		type: Date,
		required: true,
		default: Date.now
	},
	basket:{
		type: [String],
		required: false,
	}
})

module.exports = mongoose.model('User', userSchema)