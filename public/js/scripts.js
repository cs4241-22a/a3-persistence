let rowIndex = 0
let i = 0
let originalHTML = ''
let bodyHTML = ''

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

    body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
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

  function saveRow ( json ) {
    body = JSON.stringify(json)
    fetch( '/save', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body 
    })
    .then( function( response ) {
      return response.json()
    })
    .then ( function ( json ) {
      alert("Row saved!")
      renderTable(json)
    })
  }

  function deleteRow ( json ) {
    body = JSON.stringify(json)
    fetch( '/delete', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
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
    tableBody = document.getElementById('table_body')

    if (i == 0) {
      originalHTML = tbl.innerHTML
      bodyHTML = tableBody.innerHTML
      i++
    } else {
      tbl.innerHTML = originalHTML
      tableBody.innerHTML = bodyHTML
    }

    //iterate over each item and add it to table
    items.forEach( json => {
      const newRow = document.createElement('tr')

      const item = document.createElement('td')
      item.scope = 'row'
      const itemText = document.createElement('input')
      itemText.type = 'text'
      itemText.value = json.item
      item.appendChild(itemText)
      //item.innerText = json.item
  
      const dueDate = document.createElement('td')
      const dateText = document.createElement('input')
      dateText.type = 'date'
      dateText.value = json.date
      dueDate.appendChild(dateText)
      //dueDate.innerText = json.date
      
      const priority = document.createElement('td')
      const priorityText = document.createElement('input')
      priorityText.type = 'text'
      priorityText.value = json.priority
      priority.appendChild(priorityText)
      //priority.innerText = json.priority
  
  
      const actions = document.createElement('td')

      const saveButton = document.createElement('button')
      saveButton.className = 'btn btn-success'
      saveButton.id = 'save_button'
      saveButton.onclick = function ( e ) {
        json.item = itemText.value
        json.date = dateText.value
        json.priority = priorityText.value
        saveRow(json)
      }
      saveButton.innerText = 'Save Changes'

      const deleteButton = document.createElement('button')
      deleteButton.className = 'btn btn-danger'
      deleteButton.id = 'delete_button'
      deleteButton.onclick = function ( e ) {
        deleteRow(json)
      }
      deleteButton.innerText = 'Delete'
  
      actions.appendChild(saveButton)
      actions.appendChild(deleteButton)
  
      newRow.appendChild(item)
      newRow.appendChild(dueDate)
      newRow.appendChild(priority)
      newRow.appendChild(actions)
  
      tableBody.appendChild(newRow)
      tbl.appendChild(tableBody)
    })

    if (tbl.rows.length == 1) {
      tbl.hidden = true
    } else {
      tbl.hidden = false
    }
  }

  window.onload = function() {
    body = ""
    fetch( '/', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
    .then( function( response ) {
      return response.json()
    })
    .then ( function ( json ) {
      renderTable(json)
    })
    const submit_button = document.getElementById( 'submit_button' )
    submit_button.onclick = submit
  }