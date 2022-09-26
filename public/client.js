// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// our default arrays of tasks
let taskArray = []
let num = 0

// define variables that reference elements on our page
const taskList = document.getElementById('table-body');
const taskForm = document.forms[0];
const taskInput = taskForm.elements['task'];

// a helper function that creates a list item for a given task
const appendNewTask = function(item, num) {
  const newListItem = document.createElement("li")
  newListItem.innerHTML = item;

  const deleteBtn = document.createElement("button")
  deleteBtn.innerHTML = "Complete"
  const editBtn = document.createElement("button")
  editBtn.innerHTML = "Edit"

  newListItem.appendChild(deleteBtn)
  newListItem.appendChild(editBtn)
  taskList.appendChild(newListItem)

  // When clicking edit button
  editBtn.onclick = function() {
    let changedTask = prompt("Edit the task to be: ")
    fetch("/edit", {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({ task: changedTask, num: num})
    })
    .then(res => res.json())
    .then (json => {
      newListItem.remove()
      appendNewTask(task, num)
      console.log("edited item")
    })
  }

  // When clicking delete button
  deleteBtn.onclick = function() {
    fetch("/delete", {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({ num })
    })
    .then(res => res.json())
    .then(json => {
      newListItem.remove();
      console.log("removed item")
    })
  }

  taskList.appendChild(newListItem)
}

// iterate through every task and add it to our page
taskArray.forEach( function(item, num) {
  appendNewTask(item, num);
});

// listen for the form to be submitted and add a new task when it is
taskForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  const value = taskInput.value

  // get task value and num and add it to the list
  taskArray.push( value , num)
  console.log(taskArray)
  appendNewTask( value , num)
  num++
  // reset form 
  taskInput.value = '';
  taskInput.focus();

  fetch( '/add', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ task: value })
  })
  .then( response => {  response.json() })
  .then( json => {
    console.log("/add in clientjs")
    //appendNewTask(json.task, json.id)
    //loadTasks(taskArray)
  }
  )}

  window.onload = function() {

  }
/*
const loadTasks = function(array) {
  array.forEach((element) => {
    taskList.innerHTML += 
    `
    <tr id="task-${element._id}">
      <td>${element.task}</td>
      <td><button id="editBtn-${element._id}">Edit</button></td>
      <td><button id="deleteBtn-${element._id}">Delete</button></td>
    </tr>
    `
  })
}
*/
