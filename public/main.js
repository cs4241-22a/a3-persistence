let groceryData = []

window.onload = () => {
  getGroceries()
}

const getGroceries = () => {
  fetch("/groceries", {
    method: "GET"
  })
    .then(async (results) => {
      const json = await results.json()
      groceryData = json
      populateTable(groceryData)
    })
    .catch((err) => console.error(err))
}

const populateTable = (json) => {
  const table = document.getElementById("data_table")
  table.innerHTML = ""
  const headers = table.insertRow(0)
  headers.innerHTML = `
  <tr>
    <th>Quantity</th>
    <th>Item Name</th>
    <th>Priority</th>
    <th>Actions</th>
  </tr>
  `

  for (let entry of json) {
    let row = table.insertRow(1)
    
    // add data to respective columns
    row.insertCell(0).innerHTML = entry.quantity
    row.insertCell(1).innerHTML = entry.itemName
    row.insertCell(2).innerHTML = entry.priority
    let actionsColumn = row.insertCell(3)
    
    // add delete button for entry
    let delBtn = document.createElement('button')
    delBtn.innerText = 'X'
    delBtn.id = "delete" + entry.groceryId
    delBtn.className = "mui-btn mui-btn--small mui-btn--accent mui-btn--raised"
    delBtn.style = "background-color:#457e5b"
    delBtn.onclick = removeItem
    actionsColumn.appendChild(delBtn)

    let updateBtn = document.createElement('button')
    updateBtn.innerText = 'Edit'
    updateBtn.id = "update" + entry.groceryId
    updateBtn.className = "mui-btn mui-btn--small mui-btn--accent mui-btn--raised"
    updateBtn.style = "background-color:#457e5b"
    updateBtn.onclick = updateItem
    actionsColumn.appendChild(updateBtn)
  }
}

// remove entry
const removeItem = (e) => {
  e.preventDefault()

  const id = e.target.id
  const groceryId = id.substring(6)

  fetch("/remove", {
    method: "POST",
    body: JSON.stringify({
      groceryId: groceryId
    })
  })
  .then(() => {
    getGroceries()
  })
  .catch((err) => console.error("err remove: " + err))
}

// update entry
const updateItem = (e) => {
  e.preventDefault()

  const id = e.target.id
  const groceryId = id.substring(6)
  const newQuant = document.getElementById("quantity").value
  const newName = document.getElementById("itemName").value
  const newPrior = document.getElementById("priority").value
debugger
  fetch("/update", {
    method: "PUT",
    body: JSON.stringify({
      groceryId: groceryId,
      quantity: newQuant,
      itemName: newName,
      priority: newPrior
    }),
  })
  .then(() => {
    getGroceries()
  })
  .catch((err) => {console.log("err update: " + err)})
}
