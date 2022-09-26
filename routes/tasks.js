// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
require('dotenv').config();

var express = require('express');
const mongoose = require('mongoose');
const Model = require('../models/model');
const mongoString = 'mongodb+srv://jkim6:Jinkim132@cluster0.x6q54jo.mongodb.net/test'
var router = express.Router();

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})


//Post Method
router.post('/post', async (req, res) => {
  const data = new Model({
    userID: req.body.userID,
    task: req.body.task,
    days: req.body.days,
    startDate: req.body.startDate,
    description: req.body.description,
  })
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

//Get all Method
router.get('/getAll', async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
    return json(data);
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

//Get by userID Method
router.post('/getOne', async (req, res) => {
  try {
    const data = await Model.find({userID: req.params.userID})
    res.json(data); 
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
  res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})


module.exports = router;
