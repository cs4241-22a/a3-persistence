// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// our default arrays of tasks
const taskArray = []
const completedTaskArray = []

// define variables that reference elements on our page
const taskList = document.getElementById('table-body');
const taskForm = document.forms[0];
const taskInput = taskForm.elements['task'];

// a helper function that creates a list item for a given dream
const appendNewTask = function(item) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = item;
  taskList.appendChild(newListItem);
}

// iterate through every task and add it to our page
taskArray.forEach( function(item) {
  appendNewTask(item);
});

// listen for the form to be submitted and add a new task when it is
taskForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  const value = taskInput.value
  // get dream value and add it to the list
  taskArray.push( value )
  appendNewTask( value )

  // reset form 
  taskInput.value = '';
  taskInput.focus();
  
  fetch( '/submit', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ "newtask":value })
  })
  .then( response => response.json() )
  .then( json => console.log( json ) )
};

