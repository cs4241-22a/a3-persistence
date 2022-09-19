let rowIndex = 0
let i = 0
let originalHTML = ''
let id = 0

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    //construct json string
    const input = document.querySelector( '#item' ),
          json = { item: item.value }

    const input2 = document.querySelector( '#date' ),
          json2 = { date: date.value }
          json.date = date.value

    const input3 = document.querySelector( '#priority' ),
          checked = priority.checked
    
    if (checked) {
        json.priority = 'Yes'
    } else {
        json.priority = 'No'
    }

    json.id = id
    id++

    body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      return response.json()
    })
    .then ( function ( json ) {
      renderTable(json)
      document.getElementById('list_table').hidden = false
    })

    return false
  }

  function deleteRow ( json ) {
    body = JSON.stringify(json)
    fetch( '/delete', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      return response.json()
    })
    .then ( function ( json ) {
      renderTable(json)
    })
  }

  function renderTable(items) {
    tbl = document.getElementById( 'list_table' )

    if (i == 0) {
      originalHTML = tbl.innerHTML
      i++
    } else {
      tbl.innerHTML = originalHTML
    }

    //iterate over each item and add it to table
    items.forEach( json => {
      const newRow = document.createElement('tr')

      const item = document.createElement('td')
      item.innerText = json.item
  
      const completionDate = document.createElement('td')
      completionDate.innerText = json.date
      
      const priority = document.createElement('td')
      priority.innerText = json.priority
  
      const dueDate = document.createElement('td')
      dueDate.innerText = json.dueDate
  
      const actions = document.createElement('td')
      const deleteButton = document.createElement('button')
      deleteButton.className = 'tableButtons'
      deleteButton.onclick = function ( e ) {
        deleteRow(json)
      }
      deleteButton.innerText = 'Delete'
  
      actions.appendChild(deleteButton)
  
      newRow.appendChild(item)
      newRow.appendChild(completionDate)
      newRow.appendChild(priority)
      newRow.appendChild(dueDate)
      newRow.appendChild(actions)
  
      tbl.appendChild(newRow)
    })    

    if (tbl.rows.length == 1) {
      tbl.hidden = true
    } else {
      tbl.hidden = false
    }
  }

  window.onload = function() {
    const submit_button = document.getElementById( 'submit_button' )
    submit_button.onclick = submit
  }