window.onload = function() {
  const addButton = document.querySelector('button[id="add"]')
  const removeButton = document.querySelector('button[id="remove"]')

  addButton.onclick = addData
  removeButton.onclick = removeData

  //set today's date as the default
  document.getElementById('date').value = new Date().toISOString().substring(0, 10)

  //add the table header
  let table = document.getElementById('taskTable')
  table.innerHTML += "<tr><td>" + "Task name" + "</td>"
  + "<td>" + "Due date" + "</td>"
  + "<td>" + "Days until due" + "</td></tr>"
  
  fetch( '/getData', {
    method:'GET',
    headers : { "Content-Type" : "application/json"}
  })
  .then( response => response.json())
  .then( data => {
    buildTable(data) 
  })
  
  

  return false

}

//client-side js
//handles the actual To-do list page
  
const addData = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const task = document.querySelector( '#taskname' ),
        date = document.querySelector( '#date' ),
        json = { taskname: task.value,
                  date: date.value },
        body = JSON.stringify( json )

  if(json.taskname === 'Task name')
  {
      alert('Cannot use default task name \'Task name\'')
  }
  else
  {
      fetch( '/add', {
        method:'POST',
        body,
        headers : {"Content-Type" : "application/json"}
      })
      .then( response => response.json()) 
        // console.log(response.json()))
      .then( json => {
        //now parse the actual json
        buildTable(json)
      })
  }   

  return false
}

const removeData = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const task = document.querySelector( '#taskname' ),
        date = document.querySelector( '#date' ),
        json = { taskname: task.value,
                  date: date.value },
        body = JSON.stringify( json )
        if(json.taskname === 'Task name')
        {
            alert('Cannot use default task name \'Task name\'')
        }
        else
        {
          fetch( '/remove', {
            method:'POST',
            body,
            headers : {"Content-Type" : "application/json"}
          })
          .then( response => response.json()) 
            // console.log(response.json()))
          .then( json => {
            //now parse the actual json
            buildTable(json)
          })
        }   

  return false
}

//build the table visible to the screen
const buildTable = function (json)
{
  let table = document.getElementById('taskTable')
  if(table.rows.length >= 0)
  {
      for(let i = table.rows.length-1; i >= 1; i--)
      {
          table.removeChild(document.getElementsByTagName('tbody')[i])
      }
  }

  //add row for each item
  json.forEach(element => {
          table.innerHTML +=
          "<tr><td>" + element.taskname + "</td>"
          + "<td>" + element.date + "</td>"
          + "<td>" + element.timeleft + "</td></tr>"
    })
}