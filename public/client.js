window.onload = function () {
  // idk
}

const appdata = []
const table = document.getElementById("data_table")
const quantity = document.getElementById("quantity")
const itemName = document.getElementById("item_name")
const priority = document.getElementById("priority")

const addToTable = (entry) => {
  let row = table.insertRow()
  
  // add data to respective columns
  row.insertCell(0).innerHTML = entry.quantity
  row.insertCell(1).innerHTML = entry.itemName
  row.insertCell(2).innerHTML = entry.priority
  
  // add delete button for entry
  let deleteCol = row.insertCell(3)
  let btn = document.createElement('button')
  btn.innerText = 'X'
  btn.id = 'delete' + row.rowIndex
  btn.onclick = removeItem
  deleteCol.appendChild(btn)
  
}

// get existing entries in db
const init = () => {
  fetch("/data", {
    method: "GET",
  })
  .then(async (response) => {
    const data = await response.json()
    for (let entry of data) {
      addToTable(entry)
    }
  })
  .catch((err) => console.error("err get: " + err))
}

// add to list
const addItem = (e) => {
  e.preventDefault()
  
  fetch("/add", {
    method: "POST",
    body: JSON.stringify({quantity: quantity.value, itemName: itemName.value, priority})
  })
    // .then(async (response) => populateTable(await response.json()))
    // .catch((err) => console.error(err));
}

// remove entry
const removeItem = (e) => {
  e.preventDefault()

  // get id of entry somehow
  const rowId = e.target.id

  fetch("/remove", {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"value":"value"})
  })
  .then(async (response) => console.log(await response.json()))
  .catch((err) => console.error("err remove: " + err))
}

// update entry
const updateItem = (e) => {
  e.preventDefault()
  
  // get id of entry somehow
  const json = {_id:""}
  const body = JSON.stringify(json);

  fetch("/update", {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  .then(async (response) => {
    // update/refresh page also
    console.log(await response.json())
  })
  .catch((err) => {console.log("err update: " + err)})
}
