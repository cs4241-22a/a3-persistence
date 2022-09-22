// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const getRowData = function () {
  const taskNameInput = document.querySelector("#taskName");
  const expLengthInput = document.querySelctor("#expLength");
  const dueDateInput = document.querySelector("#dueDate");
  
  return {
    taskName: taskNameInput.value,
    expLength: expLengthInput.value,
    dueDate: dueDateInput.value,
  };
};

const addEntry = function(e) {
  e.preventDefault();
  
  const rowData = getRowData();
  const body = json.stringify({rowData});
  
  fetch("/", {
    method: "POST"
  })
}

window.onload = function () {
  const button = document.querySelector("#addEntry");
  button.onClick = addEntry;
}

const deleteEntry = function(e) {
  e.preventDefault();
  
  const rowData = getRowData();
  const body = json.stringify({rowData});
  
  fetch("/", {
    method: "POST"
  })
}

window.onload = function () {
  const button = document.querySelector("#deleteEntry");
  button.onClick = deleteEntry;
}

// Have a funtction that calculates the days until the due date 
// multiplied by the expected length for the last
// and return the highest value, indicating the task
// with the highest priority to tackle


