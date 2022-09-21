  window.onload = function() {
    
    const button = document.querySelector( '#addButton' )
    button.onclick = add

    const button2 = document.querySelector('#removeButton')
    button2.onclick = remove

    // const button3 = document.querySelector('EditButton')
    // button2.onclick = edit
  }

    const remove = function(){ console.log("Hello Again")}
const add = function( e ) {
  console.log("add button is on")

    // prevent default form action from being carried out
    e.preventDefault()

    const TaskBase = document.querySelector("#TaskBase")
    // clears values on client side each time submit is pressed
    TaskBase.innerText = " "

    const input = document.querySelector( '#newTask' ) 
    const field1 = document.querySelector( '#TypeOfTask')
    const field2 = document.querySelector('#Difficulty')
    const field3= document.querySelector("#Semester")
      json  = { Task: input.value, TypeOfTask: field1.value, Difficulty: field2.value, Semester: field3.value},
      body = JSON.stringify( json )
    
    fetch( '/add', {
      method:'POST',
      body 
    })
    .then(response=> response.json())
    // .then( json => {
    //   console.log(json)
    //   json.forEach( item =>{
    //     //////////MAKE initial elements in a div clear before adding new data
    //     let tr = document.createElement('tr')
    //     tr.innerText = JSON.stringify(item)
    //     TaskBase.appendChild(tr)
    //   })
    // })

    return false
  }
