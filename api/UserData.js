const express = require('express');
const User = require('../models/User');
const userDataRouter = express.Router()


//Routes
userDataRouter.post('/getTodo', (req, res) => { //put?
    let { username } = req.body;
    User.findOne({ 'username': username }, (err, foundObject) => {
        if (err) {
            console.log(err)
            res.json({
                status: "FAILED",
                message: "Error finding user"
            })
        } else {
            if (!foundObject) {
                res.json({
                    status: "FAILED",
                    message: "Failed"
                })
            } else {
                if (req.body.username) {
                    res.json({
                        status: "SUCCESS",
                        message: "data loaded",
                        data: foundObject.userdata
                    })
                } else {
                    res.json({
                        status: "FAILED",
                        data: foundObject.userdata,
                        message: "did not find the data"
                    })
                }


            }
        }
    })
})

userDataRouter.put('/editTodo', (req, res) => {
    let { title, description, username } = req.body;

    console.log(req.body)

    User.findOne({ 'username': username }, (err, foundObject) => {

        if (err) {
            console.log(err)
            res.json({
                status: "FAILED",
                message: "Error finding user"
            })
        } else {
            if (!foundObject) {
                res.json({
                    status: "FAILED",
                    message: "Failed"
                })
            } else {
                if (req.body.username) {

                    let arr = JSON.parse(foundObject.userdata)
                    let newArr = []
                    for (obj of arr) {
                        if (!(obj.title == title)) {
                            newArr.push(obj)
                        } else {
                            obj.description = description
                            newArr.push(obj)
                        }
                    }
                    foundObject.userdata = JSON.stringify(newArr)
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Error=2"
                    })
                }

                foundObject.save((err, updatedObject) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            status: "FAILED",
                            message: "Error=1"
                        })
                    } else {
                        res.json({
                            status: "SUCCESS",
                            message: "Edited TODO",
                            todoList: updatedObject.userdata
                        })
                    }
                })
            }
        }
    })
})

userDataRouter.put('/deleteTodo', (req, res) => {
    let { title, username } = req.body;

    User.findOne({ 'username': username }, (err, foundObject) => {

        if (err) {
            console.log(err)
            res.json({
                status: "FAILED",
                message: "Error finding user"
            })
        } else {
            if (!foundObject) {
                res.json({
                    status: "FAILED",
                    message: "Failed"
                })
            } else {
                if (req.body.username) {

                    let arr = JSON.parse(foundObject.userdata)
                    let newArr = []
                    for (obj of arr) {
                        if (!(obj.title == title)) {
                            newArr.push(obj)
                        }
                    }
                    foundObject.userdata = JSON.stringify(newArr)
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Error=2"
                    })
                }

                foundObject.save((err, updatedObject) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            status: "FAILED",
                            message: "Error=1"
                        })
                    } else {
                        res.json({
                            status: "SUCCESS",
                            message: "Deleted TODO",
                            todoList: updatedObject.userdata
                        })
                    }
                })
            }
        }
    })
})


userDataRouter.put('/addTodo', (req, res) => {
    let alreadyExists = false
    let { title, description, username } = req.body;
    User.findOne({ 'username': username }, (err, foundObject) => {
        if (err) {
            console.log(err)
            res.json({
                status: "FAILED",
                message: "Error finding user"
            })
        } else {
            if (!foundObject) {
                res.json({
                    status: "FAILED",
                    message: "Failed"
                })
            } else {
                if (req.body.username) {
                    let arr = JSON.parse(foundObject.userdata)


                    for (obj of arr) {
                        if (obj.title == title) {
                            alreadyExists = true
                        }
                    }
                    if (!alreadyExists) {
                        arr.push({ 'title': title, 'description': description })
                        foundObject.userdata = JSON.stringify(arr)
                    }
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Error=2"
                    })
                }

                foundObject.save((err, updatedObject) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            status: "FAILED",
                            message: "Error=1"
                        })
                    } else {
                        if (alreadyExists) {
                            res.json({
                                status: "FAILED",
                                message: "TODO with title already exists"
                            })
                        } else {
                            res.json({
                                status: "SUCCESS",
                                message: "Added TODO",
                                todoList: updatedObject.userdata
                            })
                        }

                    }
                })
            }
        }
    })
})

module.exports = userDataRouter