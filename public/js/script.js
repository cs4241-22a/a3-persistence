// app data is {"task":"Task Name",   "dueDate": "When the task is due", "taskType":"Work or personal"}
// self generated: {"taskID" : "Unique ID for a task", "taskCreationTime": "Based on when the request was made", "taskUrgency": "How urgent the Task is, based on (dueDate - taskCreationDate)"}
var appdata = [];

const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();
  const taskObj = document.querySelector('#task-input'),
    dateObj = document.querySelector('#date-input'),
    categoryPersonalObj = document.querySelector('#category-personal'),
    categoryWorkObj = document.querySelector('#category-work');
  
  const category = document.querySelector('input[name="category-input"]:checked').value;
  
  if (taskObj.value == ""){
    console.log("Cannot enter empty task")
    return true;
  }
  
  if (!dateObj.checkValidity()){
    console.log("Entered Due Date is before today");
    dateObj.value = "";
    return true;
  }
  const json = { task: taskObj.value, dueDate: new Date(dateObj.value).getTime(), taskType: category},
  body = JSON.stringify(json);
  // reset the inputs  
  taskObj.value = ""; dateObj.value = ""; categoryPersonalObj.checked = true; categoryWorkObj.checked = false;
  //            body: bodyVal.toString(),
    //headers:{'Content-Type': 'application/x-www-form-urlencoded'}

  fetch('/tasks/add', {method: 'POST',body:body,headers:{'Content-Type': 'application/json'}})
    .then(function (response) {
      if (response.ok){
          updateTaskListDisplay();
      }})
  return false;
}

const updateTaskListDisplay = function() {
  fetch("/tasks", { method: 'GET', })
    .then(response => {
      if (response.ok) {
        return response.json().then(tasksData => {appdata = tasksData; displayTaskList(tasksData.reverse())});
      }
    });

  
}
// app data is {"task":"Task Name",   "dueDate": "When the task is due", "taskType":"Work or personal"}
// self generated: {"taskID" : "Unique ID for a task", "taskCreationTime": "Based on when the request was made", "taskUrgency": "How urgent the Task is, based on (dueDate - taskCreationDate)"}

const displayTaskList = function(tasksData){
  const taskDiv = document.getElementById("task-list");
  taskDiv.innerHTML = "";
  for (let aTask in tasksData){
    let taskJson = tasksData[aTask];
    let aTaskDiv = document.createElement("div");
    // aTaskDiv.id = "taskListItem-" + taskJson._id;
    aTaskDiv.className = "taskListItem";
    let catColorDiv = document.createElement("div");
    let tag = document.createElement("p");
    tag.classList.toggle("ml-2")
    let tag2 = document.createElement("p");
    tag2.classList.toggle("task-urgency")
    let taskChildNode = document.createTextNode(taskJson.task);
    let taskDueDateChildNode = document.createTextNode(getDueDate(Number(taskJson.dueDate),Number(taskJson.taskCreationTime)));
    tag.appendChild(taskChildNode);
    catColorDiv.appendChild(tag)
    tag2.appendChild(taskDueDateChildNode);
    aTaskDiv.appendChild(catColorDiv);
    aTaskDiv.appendChild(tag2);
    aTaskDiv.classList.toggle(getClassFromUrgency(taskJson.taskUrgency))
    catColorDiv.classList.toggle("text-start")
    aTaskDiv.classList.toggle(getClassFromCategory(taskJson.taskType))

    // add edit and delete buttons
    let editButton = document.createElement("button");
    editButton.classList.toggle("editButton");

    editButton.innerText = "Edit";
    editButton.addEventListener('click', function(){
      sendEdit(taskJson._id);
  });
    let deleteButton = document.createElement("button");
    deleteButton.classList.toggle("deleteButton");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener('click', function(){
      sendDelete(taskJson._id);
  });
    var taskButtonDiv = document.createElement("div");

    taskButtonDiv.appendChild(editButton);
    taskButtonDiv.appendChild(deleteButton);
    taskButtonDiv.classList.toggle("taskButtonDiv")
    aTaskDiv.appendChild(taskButtonDiv);




    taskDiv.appendChild(aTaskDiv)
  } 
}

// app data is {"task":"Task Name",   "dueDate": "When the task is due", "taskType":"Work or personal"}
// self generated: {"taskID" : "Unique ID for a task", "taskCreationTime": "Based on when the request was made", "taskUrgency": "How urgent the Task is, based on (dueDate - taskCreationDate)"}

const sendEdit = function(taskID){
  const taskObj = document.querySelector('#task-input'),
  dateObj = document.querySelector('#date-input'),
  categoryPersonalObj = document.querySelector('#category-personal'),
  categoryWorkObj = document.querySelector('#category-work'),
  submitButton = document.getElementById('submit-button');
  
  submitButton.innerText = "Confirm Edit";
  submitButton.onclick = function(e){
    e.preventDefault();
    confirmEdit(taskID);
  };
  for (let aTask in appdata){
    let taskJson = appdata[aTask];
    if (taskJson._id == taskID) {
      taskObj.value = taskJson.task;
      if (taskJson.dueDate != null) dateObj.value = (new Date(Number(taskJson.dueDate))).toISOString().split('T')[0]
      if (taskJson.taskType == "work"){
        categoryWorkObj.click()
      } else {
        categoryPersonalObj.click()
      }
      break;
    }
  }
}

const sendDelete = function(taskID){
  console.log("Trying to delete " + taskID)
  const json = {taskID: taskID},
    body = JSON.stringify(json);
    fetch('/tasks/delete', {method: 'POST',body:body,headers:{'Content-Type': 'application/json'}})
      .then(function (response) {
        if (response.ok){
            updateTaskListDisplay();
        }})
}

const confirmEdit = function(taskID){
    console.log("Trying to confirm Edit")
    const submitButton = document.getElementById('submit-button');

    submitButton.onclick = submit;
    submitButton.innerText = "Add Task";
    // prevent default form action from being carried out

    const taskObj = document.querySelector('#task-input'),
      dateObj = document.querySelector('#date-input'),
      categoryPersonalObj = document.querySelector('#category-personal'),
      categoryWorkObj = document.querySelector('#category-work');
    
    const category = document.querySelector('input[name="category-input"]:checked').value;
    
    if (taskObj.value == ""){
      console.log("Cannot enter empty task")
      return true;
    }
    
    if (!dateObj.checkValidity()){
      console.log("Entered Due Date is before today");
      dateObj.value = "";
      return true;
    }
      
    const json = { task: taskObj.value, dueDate: new Date(dateObj.value).getTime(), taskType: category, _id: taskID},
    body = JSON.stringify(json);
    // reset the inputs  
    taskObj.value = ""; dateObj.value = ""; categoryPersonalObj.checked = true; categoryWorkObj.checked = false;
    fetch('/tasks/edit', {method: 'POST',body:body,headers:{'Content-Type': 'application/json'}})
      .then(function (response) {
        if (response.ok){
            updateTaskListDisplay();
        }})
    return false;
}

const getClassFromUrgency = function(urgency){
  if (urgency == null) return "urgent_NA"
  return "urgent_"+urgency;
}

const getClassFromCategory = function(type){
  //console.log(type)
  if (type == "work") {
    return "workTaskItem"
  } else {
  return "personalTaskItem"
  }
}

const getDueDate = function(dueDate,taskCreationDate){
  if (dueDate == 0) return "Undated"
  if ((dueDate-taskCreationDate)/86400000 < 1) return "Today"
  return (new Date(dueDate)).toDateString();  
}

const fixSingleDigitString = function(digit){
  return digit < 10? "0"+digit : digit.toString();
}

const addWelcomeMessage = function(){
  const welcomeHeading = document.getElementById('usernameHeading');
  fetch("/username", { method: 'GET'})
  .then(response => {
    if (response.ok) {
      response.json().then(json => {
        welcomeHeading.innerText= json.username
      })
    }
  });
}

window.onload = function () {
  const button = document.getElementById('submit-button');
  const dateTimeInput = document.getElementById('date-input');
  const personalCategory = document.getElementById('category-personal');
  const workCategory = document.getElementById('category-work');
  const personalCatLabel = document.getElementById('category-personalLabel');
  const workCatLabel = document.getElementById('category-workLabel');

  const today = new Date();
  //2017-06-01 format
  const todayString = today.getFullYear() +"-"+ 
    fixSingleDigitString(today.getMonth()+1) +"-" + 
      fixSingleDigitString(today.getDate());  
  dateTimeInput.setAttribute("min", todayString);
  button.onclick = submit;
  personalCategory.onclick = function(){
    personalCatLabel.classList.add("selectedCategoryPersonal")
    personalCatLabel.classList.remove("unselectedCategory")
    workCatLabel.classList.remove("selectedCategoryWork")
    workCatLabel.classList.add("unselectedCategory")
  }
  workCategory.onclick = function(){
    workCatLabel.classList.add("selectedCategoryWork")
    workCatLabel.classList.remove("unselectedCategory")
    personalCatLabel.classList.remove("selectedCategoryPersonal")
    personalCatLabel.classList.add("unselectedCategory")
  }
  addWelcomeMessage()
  // particlesJS.load('particles-js', 'public/particles.json', function () {
  //   console.log('particles.js config loaded');
  // });
  updateTaskListDisplay();

}
