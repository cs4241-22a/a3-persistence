const express = require('express')
const router = express.Router()
const User = require('../models/user')


//Getting one user
router.get('/:id', getUser, (req, res) => {
	res.json(res.user)
})

//Creating a user
router.post('/', async (req, res) => {
	const user = new User({
		userName: req.body.userName,
		password: req.body.password
	})

	try {
		const newUser = await user.save()
		res.json(201).json(newUser)
	} catch (error) {
		res.status(400).json({message: err.message})
	}
})

//Updating a user
router.patch('/:id', getUser, async (req, res) => {
	if(req.body.name != null){
		res.user.name = req.body.name
	}
	try{
		const updatedUser = await res.user.save()
		res.json(updatedUser)
	}catch(err){
		res.status(400)
	}
})

//Deleting one
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove()
	} catch (error) {
		res.status(500).json({message: err.message})
	}
})

//Middleware for getting a user
async function getUser(req,res,next) {
	let user
	try {
		user = await User.findById(req.params.id)
		if(user == null){
			return res.status(404).json({message: "Cannot find user"})
		}
	} catch (error) {
		return res.status(500).json({message: err.message})
	}

	res.user = user
	next()
}

module.exports = router