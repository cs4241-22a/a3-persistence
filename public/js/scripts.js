
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

    if (tbl != null) {
      if (rowIndex != 0) {
        const divLabel = document.getElementById("divLabel")
        divLabel.remove()
      }
  
  
      rowIndex = 0
  
      if (i == 0) {
        originalHTML = tbl.innerHTML
        bodyHTML = tableBody.innerHTML
        i++
      } else {
        tbl.innerHTML = originalHTML
        tableBody.innerHTML = bodyHTML
      }
  
      const divLabel = document.createElement('div')
      divLabel.className = "text-center"
      divLabel.id = "divLabel"
  
      //iterate over each item and add it to table
      items.forEach( json => {
        const newRow = document.createElement('tr')
  
        const item = document.createElement('td')
        item.scope = 'row'
        const itemText = document.createElement('input')
        itemText.type = 'text'
        itemText.value = json.item
        itemText.id = "item" + rowIndex
        item.appendChild(itemText)
    
        const dueDate = document.createElement('td')
        const dateText = document.createElement('input')
        dateText.type = 'date'
        dateText.value = json.date
        dateText.id = "date" + rowIndex
        dueDate.appendChild(dateText)
        
        const priority = document.createElement('td')
        const priorityText = document.createElement('input')
        priorityText.type = 'text'
        priorityText.value = json.priority
        priorityText.id = "priority" + rowIndex
        priority.appendChild(priorityText)
  
        const itemLabel = document.createElement('label')
        itemLabel.id = "itemLabel" + rowIndex
        itemLabel.htmlFor = "item" + rowIndex
        itemLabel.textContent = "-"

        const dateLabel = document.createElement('label')
        dateLabel.htmlFor = "date" + rowIndex
        dateLabel.id = "dateLabel" + rowIndex
        dateLabel.textContent = "-"

        const priorityLabel = document.createElement('label')
        priorityLabel.id = "priorityLabel" + rowIndex
        priorityLabel.htmlFor = "priority" + rowIndex
        priorityLabel.textContent = "-"
        

        divLabel.appendChild(itemLabel)
        divLabel.appendChild(dateLabel)
        divLabel.appendChild(priorityLabel)
  
        document.body.appendChild(divLabel)
    
        const actions = document.createElement('td')
  
        const saveButton = document.createElement('button')
        saveButton.className = 'btn btn-success'
        saveButton.id = 'save_button' + rowIndex
        saveButton.onclick = function ( e ) {
          json.item = itemText.value
          json.date = dateText.value
          json.priority = priorityText.value
          saveRow(json)
        }
        saveButton.innerText = 'Save Changes'
  
        const deleteButton = document.createElement('button')
        deleteButton.className = 'btn btn-danger'
        deleteButton.id = 'delete_button' + rowIndex
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
  
        rowIndex++
      })

      if (tbl.rows.length == 1) {
        tbl.hidden = true
      } else {
        tbl.hidden = false
      }
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
      if (json[json.length-1] === true) {
        alert("New user created!")
      }
      json.pop()
      renderTable(json)
    })
    const submit_button = document.getElementById( 'submit_button' )

    if (submit_button != null) {
      submit_button.onclick = submit
    }

  }