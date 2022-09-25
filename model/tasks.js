const mongoose = require('mongoose')
require('dotenv').config() // TODO: Remove in production
const Schema = mongoose.Schema
const ObjectId = require('mongodb').ObjectId

// app data is {"task":"Task Name",   "dueDate": "When the task is due", "taskType":"Work or personal"}
// self generated: {"taskID" : "Unique ID for a task", "taskCreationTime": "Based on when the request was made", "taskUrgency": "How urgent the Task is, based on (dueDate - taskCreationDate)"}

const uri = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@'+process.env.MONGO_HOST+"/DoIt"
// connect Mongoose
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology:true})

const Task = new Schema({
    task: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        optional: true
    },
    taskType:{
        type: String,
        required:true
    },
    taskCreationTime:{
        type: String,
        required:true
    },
    taskUrgency:{
        type: String,
        optional: true
    },
    userId:{
        type:ObjectId,
        required:true
    }

})

module.exports = mongoose.model('Tasks',Task)