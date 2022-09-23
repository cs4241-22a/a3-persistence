
 // getting the username from the browser's sessionStorage
// https://www.youtube.com/watch?v=x0VcigW9kN0&ab_channel=OpenJavaScript
 const usernameVal = sessionStorage.getItem('usernameKey')
  console.log(usernameVal)
  
  
  window.onload = function() {

    
    
    username = document.querySelector("#userName")
   
    const button = document.querySelector( '#addButton' )
    button.onclick = add

    const button2 = document.querySelector('#removeButton')
    button2.onclick = remove


    const button3 = document.querySelector('#resultsButton')
    button3.onclick = results

    
    const button4 = document.querySelector('#updateButton')
    button4.onclick = update

   


    // from tutorial -https://www.youtube.com/watch?v=MkESyVB4oUw&ab_channel=TylerPotts

  }

const add = function( e ) {


    // prevent default form action from being carried out
    e.preventDefault()

    const TaskBase = document.querySelector("#TaskBase")

    // // clears values on client side each time submit is pressed
    // TaskBase.innerText = " "

    
    const input = document.querySelector( '#newTask' ) 
    const field1 = document.querySelector( '#TypeOfTask')
    const field2 = document.querySelector('#Difficulty')
    const field3= document.querySelector("#Semester")
      json  = { 
        User: usernameVal,
        Task: input.value,
         TypeOfTask: field1.value,
          Difficulty: field2.value,
           Semester: field3.value
          }
      // body = JSON.stringify( json )

      // add JSON to client side
      let tr = document.createElement('tr')
      tr.innerText = JSON.stringify(json)

      TaskBase.appendChild(tr)

      // tr.addEventListener('dblclick',function(){
      // TaskBase.removeChild(tr); })
    fetch( '/add', {
      method:'POST',
      headers: { 'Content-Type': 'application/json'}, // needed for MongoDB and/or the server to know you are using JSON data?
      body:JSON.stringify({json})
    })
    .then(response=> response.json()) // the response will be similar to `{acknowledged: true, insertedId: '632b31bc5fefa072c1ca1fe7'}`
    .then(resjson =>{
    
      //adds field in JSON task for object ID
    json.objId = resjson.insertedId
    console.log(json)
    
    })
    //
      // .then(json=> console.log(json)) 
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

const results = function(e)
{
  
  e.preventDefault()

  TaskBase.innerText = " "
  // send JSON with just the username

  const usernameVal = sessionStorage.getItem('usernameKey')
  jsonUser = {User:usernameVal},
  console.log(jsonUser)
  
  fetch( '/results', {
    method:'POST',
    headers: { 'Content-Type': 'application/json'}, // needed for MongoDB and/or the server to know you are using JSON data?
    // headers: {'Accept': 'application/json'},
    body:JSON.stringify(jsonUser)
    // body:JSON.stringify({jsonUser}) // this will make a json with the field jsonUser, which is just adding extra steps
  })
  .then(response=>response.json())
  .then( json => {
    console.log(json)
    json.forEach( item =>{
      //////////MAKE initial elements in a div clear before adding new data
      let tr = document.createElement('tr')
       tr.innerText = JSON.stringify(item)
      // tr.innerText = "ID:" + item._id + " " 
      //                 // + "User:" item.User + " "
      //                 + "Task:" + item.Task + " " 
      //                 + "Type:" + item.TypeOfTask + " "
      //                 + "Difficulty:" + item.Difficulty + " "
      //                 + "Semester:" + item.Semester + " "
      TaskBase.appendChild(tr)
  })
})
}

// use query selector all
const remove = function(e)
{
  e.preventDefault()
  // get the ID of the task that we want to delete
  const itemToDelete = document.querySelector( '#deleteTaskInput' ) 
  
  jsonID = {_id:itemToDelete.value},
  console.log(jsonID)
  fetch('/remove',{
    method:'POST',
    headers: { 'Content-Type': 'application/json'}, 
    body: JSON.stringify(jsonID)
  })
  .then(res=>res.json)
  .then(json => console.log(json))

  console.log("Hello Again")
}

const update = function(e)
{ 
  e.preventDefault()
  // get all of the updated fields and but them inside a JSON

  const _id = document.querySelector("#idForUpdate")
  const newInput = document.querySelector("#TaskInputUpdate")
  const newType = document.querySelector("#typeOfTaskUpdate")
  const newDifficulty = document.querySelector("#difficultyUpdate")
  const newSemester = document.querySelector("#difficultyUpdate")

  jsonUpdate = {
    _id:_id.value, 
    User:username,
    newInput:newInput.value,
    newType: newType.value,
    newDifficulty:newDifficulty.value,
    newSemester: newSemester.value}

  fetch('/update',{
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(jsonUpdate)
  })
  .then(res=>res.json)

  

}
