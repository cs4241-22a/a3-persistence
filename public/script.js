console.log("Welcome to assignment 3!")

let update = -1
const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  /*  const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value },
          body = JSON.stringify( json )*/
    const input1 = document.querySelector( '#studentID' ),
          input2 = document.querySelector( '#name' ),
          input3 = document.querySelector( '#appointment' ),
          json = { studentID: input1.value, name: input2.value, appointment: input3.value },
          body = update != -1 ? "EDIT" + update + JSON.stringify( json ) : JSON.stringify( json )


    update = -1
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( response => response.json() )
    .then( function ( json ) {
      // do something with the reponse
      const element = document.querySelector('#AppointmentTable')
      
      for(let i = 1; i <= json.length; i++){
        if(i < element.rows.length){
          element.rows[i].cells[0].innerHTML = json[i-1].studentID
          element.rows[i].cells[1].innerHTML = json[i-1].name
          element.rows[i].cells[2].innerHTML = json[i-1].appointment
          element.rows[i].cells[3].innerHTML = json[i-1].visitTimeLeft
        } else {
          let newEntry = element.insertRow(i)

          newEntry.insertCell(0)
          newEntry.insertCell(1)
          newEntry.insertCell(2)
          newEntry.insertCell(3)

          newEntry.cells[0].innerHTML = json[i-1].studentID
          newEntry.cells[1].innerHTML = json[i-1].name
          newEntry.cells[2].innerHTML = json[i-1].appointment
          newEntry.cells[3].innerHTML = json[i-1].visitTimeLeft

          let modifyButton = document.createElement("button")
          modifyButton.classList.add("tableBtn")
          modifyButton.classList.add("edit")
          modifyButton.innerHTML = "Edit"
          modifyButton.onclick = function () {
            input1.value = newEntry.cells[0].innerHTML
            input2.value = newEntry.cells[1].innerHTML
            input3.value = newEntry.cells[2].innerHTML
            update = i;
          }
          let deleteButton = document.createElement("button")
          deleteButton.classList.add("tableBtn")
          deleteButton.classList.add("delete")
          deleteButton.innerHTML = "Delete"
          deleteButton.onclick = function () {
            let body = "DELETE" + i
            fetch( '/submit', {
              method:'POST',
              body 
            })
            element.deleteRow(i)
          }
          newEntry.appendChild(modifyButton)
          newEntry.appendChild(deleteButton)
        }
      }
    })
    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    if(button !== null)
      button.onclick = submit

    let body = "GETDATA"
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( response => response.json() )
    .then( function ( json ) {
      // do something with the reponse
      const element = document.querySelector('#AppointmentTable')
      
      for(let i = 1; i <= json.length; i++){
        if(i < element.rows.length){
          element.rows[i].cells[0].innerHTML = json[i-1].studentID
          element.rows[i].cells[1].innerHTML = json[i-1].name
          element.rows[i].cells[2].innerHTML = json[i-1].appointment
          element.rows[i].cells[3].innerHTML = json[i-1].visitTimeLeft
        } else {
          let newEntry = element.insertRow(i)

          newEntry.insertCell(0)
          newEntry.insertCell(1)
          newEntry.insertCell(2)
          newEntry.insertCell(3)

          newEntry.cells[0].innerHTML = json[i-1].studentID
          newEntry.cells[1].innerHTML = json[i-1].name
          newEntry.cells[2].innerHTML = json[i-1].appointment
          newEntry.cells[3].innerHTML = json[i-1].visitTimeLeft

          if(document.title === "CS4241 Assignment 2"){
            let modifyButton = document.createElement("button")
            modifyButton.classList.add("tableBtn")
            modifyButton.classList.add("edit")
            modifyButton.innerHTML = "Edit"
            modifyButton.onclick = function () {
              input1.value = newEntry.cells[0].innerHTML
              input2.value = newEntry.cells[1].innerHTML
              input3.value = newEntry.cells[2].innerHTML
              update = i;
            }
            let deleteButton = document.createElement("button")
            deleteButton.classList.add("tableBtn")
            deleteButton.classList.add("delete")
            deleteButton.innerHTML = "Delete"
            deleteButton.onclick = function () {
              let body = "DELETE" + i
              fetch( '/submit', {
                method:'POST',
                body 
              })
              element.deleteRow(i)
            }
            newEntry.appendChild(modifyButton)
            newEntry.appendChild(deleteButton)
          }
        }
      }

    })
  }