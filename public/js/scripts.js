const Todo = []


function main(){
  console.log("vibes")
  const todo = document.getElementsByName('todo').value
  const date = document.getElementsByName('date').value
  const priority = document.getElementsByName('priority').value
  const sub = document.querySelector('#submit')

  sub.onclick = function isEmpty(e){
    e.preventDefault()

    console.log(todo.value)
  //   if (todo === null || date === null){
  //       alert("Please fill out all fields") 
  //       console.log('checked')
  //       return false
  //   }
  //   return true
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
