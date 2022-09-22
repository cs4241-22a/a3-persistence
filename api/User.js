const express = require('express')
const router = express.Router()


//mongodb user model
const User = require('./../models/User')

// Password handler
const argon2 = require('argon2')

//Routes
// Signup
router.post('/signup', (req, res) => {
    let { username, password, data } = req.body;
    console.log(req.body)
    username = username.trim()
    password = password.trim()
    userData = data
    // Checks for valid user/pass
    if (username == "" || password == "") { //make sure fields aren't empty
        res.json({
            status: "FAILED",
            message: "One or more fields are empty"
        })
    } else if (!/^[0-9a-zA-Z]+$/.test(username)) { //make sure only certain symbols allowed
        res.json({
            status: "FAILED",
            message: "No symbols or spaces allowed in username. Only characters A-Z & numbers"
        })
    } else if (username.length > 32) { //make sure user isn't too long
        res.json({
            status: "FAILED",
            message: "Please keep username under 32 characters"
        })
    } else if (password.length < 8) { //make sure password isn't too short
        res.json({
            status: "FAILED",
            message: "Password too short"
        })
    } else { // User & Pass are ok!!
        User.find({ username }).then(result => { //Check if user already exists
            if (result.length) { // If a result is returned that isn't empty, it means it found the user ie they already exist
                res.json({
                    status: "FAILED",
                    message: "User already exists"
                })
            } else { // Passed all checks, this is a new user
                argon2.hash(password).then(hashedPassword => { // hash the password using argon2
                    const newUser = new User({ //create a new user (mongoose.model)
                        username,
                        password: hashedPassword,
                        userData
                    })

                    newUser.save().then(result => { //saves to database using mongoose
                        res.json({
                            status: "SUCCESS",
                            message: "Signup successful",
                            data: result
                        })
                    }).catch(e => { // error catching
                        res.json({
                            status: "FAILED",
                            message: "Error saving user account"
                        })
                    })
                }).catch(e => { // more error catching
                    res.json({
                        status: "FAILED",
                        message: "Error while hashing password"
                    })
                })
            }
        }).catch(e => { // even more error catching
            console.error(e);
            res.json({
                status: "FAILED",
                message: "Error creating user"
            })
        })
    }
})

// Signin
router.post('/signin', (req, res) => {
    console.log(req.body)
    let { username, password } = req.body;
    username = username.trim()
    password = password.trim()

    if (username == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty user or password field"
        })
    } else {
        User.find({ username })
            .then(data => {
                if (data.length) {
                    //User exists
                    const hashedPassword = data[0].password;
                    argon2.verify(hashedPassword, password)
                        .then(result => {
                            if (result) {
                                res.json({
                                    status: "SUCCESS",
                                    message: "Signin successful",
                                    data: data
                                })
                            } else {
                                console.log("invalid password")
                                res.json({
                                    status: "FAILED",
                                    message: "Invalid password entered!"
                                })
                            }
                        }).catch(e => {
                            console.log("error comparing password")
                            res.json({
                                status: "FAILED",
                                message: "An error occured while comparing passwords"
                            })

                        })
                } else {
                    console.log('invalid credentials')
                    res.json({
                        status: "FAILED",
                        message: "Invalid credentials entered"
                    })
                }
            })
            .catch(e => {
                res.json({
                    status: "FAILED",
                    message: "An error occured while checking for existing user"
                })
            })
    }
})

module.exports = router;