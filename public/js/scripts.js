// Add some Javascript code here, to run on the front end.
const Todo = []
let task 
let date 
let priority 
function main(){
task = document.getElementById('to_do')
date = document.querySelector('#date')
priority = document.querySelector('#priority')
const add = document.querySelector('#add')
    add.onclick = buttonClick
}
function buttonClick(){
    isEmpty()
    submit()
    task.value = ""
    date.value = ""
    priority.value = "High"
}
function isEmpty(){
    if (task.value === "" || date.value === ""){
        alert("Please fill out all fields") 
        return false
    }
    return true
}


  const submit = function( e ) {
    // prevent default form action from being carried out
    // e.preventDefault()
    
    let todo=[date.value,task.value,priority.value]
    Todo.push(todo)

    fetch('/', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ "task":todo })
  })
     .then( response => response.json())
     .then( json => {console.log(json)})
  }


