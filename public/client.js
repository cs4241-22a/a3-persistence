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
const appendNewTask = function(item, id) {
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
      body:JSON.stringify({ task: changedTask })
    })
    .then(res => res.json())
    .then (json => {
      newListItem.remove()
      loadTasks()
      console.log("edited item")
    })
  }

  // When clicking delete button
  deleteBtn.onclick = function() {
    fetch("/delete", {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(json => {
      newListItem.remove();
      console.log("removed item")
      loadTasks()
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
  //appendNewTask( value , num)
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
    loadTasks()
  }
  )}

  window.onload = function() {
    loadTasks()
  }

const loadTasks = function() {
  fetch('/load', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(json => {
    for(let x = 0; x<json.length; x++) {
      appendNewTask(json[x].task, json[x]._id)
    }
  })
}
