const Task = require('./model/tasks');
const ObjectId = require('mongodb').ObjectId
var task1 = new Task({
    task: "Manual Task entry 1",
    dueDate: "12345678910",
    taskType: "Personal",
    taskCreationTime:"12345678910",
    taskUrgency:"0",
    userId : ObjectId("632aa483a38bf5824492fcfb")
})
var task2 = new Task ({
    task: "Manual Task entry 2",
    dueDate: "12345678910",
    taskType: "Personal",
    taskCreationTime:"12345678910",
    taskUrgency:"0",
    userId : ObjectId("632aa483a38bf5824492fcfb")
})
var task3 = new Task({
    task: "Manual Task entry 3",
    dueDate: "12345678910",
    taskType: "Personal",
    taskCreationTime:"12345678910",
    taskUrgency:"0",
    userId : ObjectId("632aa483a38bf5824492fcfb")
})


task1.save()
task2.save()
task3.save()

console.log("done")
process.exit(1)