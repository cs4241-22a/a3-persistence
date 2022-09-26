const tasks = []

const     taskList = document.getElementById( 'tasks' ),
          taskForm = document.forms[0],
          taskInput =document.getElementById( 'input1' ),
          json = { item: "item1" },
          body = JSON.stringify( json );

const     deleteList = document.getElementById( 'tasks' ),
          deleteForm = document.forms[1],
          deleteInput =document.getElementById( 'delInput1' );

const appendNewTask = function(task) {
  const newListTask = document.createElement('li');
  newListTask.innerHTML = task;
  taskList.appendChild(newListTask);
}

const deleteTask = function(task) {
  const element = document.getElementById('tasks');
  element.innerHTML = '';
  appendNewTask(task);
}

tasks.forEach( function(task) {
  appendNewDream(task);
});

taskForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();
  
  const value = taskInput.value
  // get dream value and add it to the list
  tasks.push( value )
  appendNewTask( value )

  // reset form 
  taskInput.value = '';
  taskInput.focus();
  
  fetch( '/add', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ "newTask":value })
  })
  .then( response => response.json() )

};

deleteForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  const value = deleteInput.value

  //delete given item from tasks list
  for(let i =0;i < tasks.length; i++) {
    if(tasks[i] === deleteInput.value) {
      tasks.splice(i,1)
    }
  }
  deleteTask(tasks);

  console.log("entry to delete: ", tasks);
  // reset form 
  taskInput.value = '';
  taskInput.focus();
  
  fetch('/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }) 
  .then( json => console.log( json ) )
};