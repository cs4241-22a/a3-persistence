
const Todo = []
const todoForm = document.getElementById['add']
console.log("vibes")
todoForm.addEventLis = function(event){
  const taskInput = todoForm.elements['task']
  const dateInput = todoForm.elements['date']
  const priorityInput = todoForm.elements['priority']
  
  // stop our form submission from refreshing the page
  event.preventDefault()
  isEmpty()
}
  // const value = dreamInput.value
  // // get dream value and add it to the list
  // dreams.push( value )
  // appendNewDream( value )

  // // reset form 
  // dreamInput.value = ''
  // dreamInput.focus()
  
  // fetch( '/submit', {
  //   method:'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body:JSON.stringify({ "newdream":value })
  // })
  // .then( response => response.json() )
  // .then( json => console.log( json ) )


function isEmpty(){
  if (taskInput.value === "" || taskInput.value === null){
      alert("Please fill out all fields") 
      console.log('checked')
      return false
  }
}

// sub.onclick = isEmpty()

// const sub = document.getElementById("submit")
// function main(){
//   task = document.getElementById("to_do")
//   date = document.getElementById("date")
//   document.getElementById("priority")
//   sub.onclick = isEmpty()
// // define variables that reference elements on our page

// console.log(task)
// }


// window.onload(main())
// // isEmpty()
// // sub.onclick = submit()


// // function submit(event) {
// //   // prevent default form action from being carried out
// //   event.preventDefault()
// //   Todo.push({Task:task.value}, {Date:date.value} , {Priority:priority.value})

// //   const json = Todo,
// //         body= JSON.stringify( json )

// //   fetch( '/submit', {
// //     method:'POST',
// //     body
// //     })
  
// //     .then( response => response.json())
// //     .then( json => console.log(json))

// //   return false
// // }
