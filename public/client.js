
  window.onload = function() {
    
    const button = document.querySelector( '#addButton' )
    button.onclick = add

    const button2 = document.querySelector('#removeButton')
    button2.onclick = remove

    // const button3 = document.querySelector('EditButton')
    // button2.onclick = edit
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
      json  = { Task: input.value, TypeOfTask: field1.value, Difficulty: field2.value, Semester: field3.value}
      // body = JSON.stringify( json )

      // add JSON to client side
      let tr = document.createElement('tr')
      tr.innerText = JSON.stringify(json)
      TaskBase.appendChild(tr)
    

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

  
  // use query selector all
const remove = function(e)
{
  
  e.preventDefault()
  
  console.log("Hello Again")




}

const update = function(e)
{
  e.preventDefault()

  console.log("ddd")
}

const resultsd = function(e)
{
e.preventDefault()


}