/**
 * body format
 * (AUTO GENERATED) _id
 * _userID
 * itemName
 * itemPrice
 * itemQuantity
 *(AUTO GENERATED) total
 */

const getData = function() {

    fetch( `/items`, {
      method:'GET',
      headers: {
        "Content-Type": "application/json"
    }})
    .then( response => response.json())
    .then(json => {
      createTable(json[0].items)
    })
  }

  const createTable = function(jsonData) {
    //console.log(jsonData[0].items)
    const table = document.getElementById("dataTable")
    table.innerHTML = "<tr> <th>Item Name</th> <th>Price</th> <th>Quantity</th></tr>"
    
    jsonData.forEach(entry => {
      table.innerHTML += `<tr id="row-${entry._itemID}"> <th>${entry.name}</th> <th>${entry.price}</th> <th>${entry.quantity}</th><th><button onclick="deleteEntry(\'${entry._itemID}\')">delete</button><th>  <th><button onclick="onEditClick(\'${entry._itemID}\', \'${entry.name}\', \'${entry.price}\', \'${entry.quantity}\')">Edit</button><th></tr>`
    })
  }
  
let currentEntryEditing = null
const onEditClick = function(id, name, price, quantity)
{
  if(currentEntryEditing != null)
  {
    resetEditEntry()
  }

  currentEntryEditing = document.getElementById(`row-${id}`)
  console.log(id)
  console.log(name)
  console.log(price)
  console.log(quantity)
  let newHTML = `<th><input id="name-${id}"type="text" value=\"${name}\"></th>`
  newHTML += `<th><input id="price-${id}"type="text" value=\"${price}\"></th>`
  newHTML += `<th><input id="quantity-${id}" type="text" value=\"${quantity}\"></th>`
  newHTML += `<button onclick="resetEditEntry(\'${id}\', \'${name}\', \'${price}\', \'${quantity}\')">Cancel</button>`
  newHTML += `<button onclick="onEditSubmit(\'${id}\')">Submit</button>` 
  currentEntryEditing.innerHTML = newHTML;
  //<th>${entry.price}</th> <th>${entry.quantity}</th> <th>${entry.total}</th> <th><button onclick="deleteEntry(\'${entry._itemID}\')">delete</button><th>  <th><button onclick="">Edit</button><th></tr>`
}

const onEditSubmit = function(id)
{
  const json = {_itemID: id,
                name: document.getElementById(`name-${id}`).value,
                price: document.getElementById(`price-${id}`).value,
                quantity: document.getElementById(`quantity-${id}`).value}
   
    let body = JSON.stringify(json)
    
    fetch( '/update', {
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },  
        body: body 
      })
      .then( response => response.json())
      .then(getData())

      currentEntryEditing = null;
}

const resetEditEntry = function(id, name, price, quantity)
{
  let newHTML =`<th>${name}</th>`
  newHTML += `<th>${price}</th>`
  newHTML += `<th>${quantity}</th>`
  newHTML += `<th><button onclick="deleteEntry(\'${id}\')">delete</button><th>`
  newHTML += `<th><button onclick="onEditClick(\'${id}\', \'${name}\', \'${price}\', \'${quantity}\')">Edit</button><th></th>`
  currentEntryEditing.innerHTML = newHTML;
  currentEntryEditing = null;
}

const submitForm = function(e)  {
    // prevent default form action from being carried out
    e.preventDefault()
  
    const itemName = document.getElementById( 'itemName' ),
          itemQuantity = document.getElementById( 'itemQuantity' ),
          itemPrice = document.getElementById( 'itemPrice' ),
          json = {name: itemName.value,
                  quantity: parseInt(itemQuantity.value),
                  price: parseFloat(itemPrice.value)}
   
    addEntry(json)
  
    return false
  }

  
//Works
const addEntry = (json) => {
    let body = JSON.stringify(json)
    
    fetch( '/add', {
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },  
        body: body 
      })
      .then( response => response.json())
      .then(getData())
}

//works
const deleteEntry = (_itemID) => {
    let json = {_itemID: _itemID},
        body = JSON.stringify(json)
    
    fetch('/remove', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },  
        body: body
    })
    .then(response => response.json())
    .then(getData())
}

const modifyEntry = (_itemID, name, price, quantity) => {
    let json = {_itemID: _itemID,
                name: name,
                price: price,
                quantity: quantity},
        body = JSON.stringify(json)

    fetch('/update', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },  
        body: body
    })
    .then(response => response.json())
    .then(getData())
}

window.onload = function() {
  const button = document.getElementById('formSubmit')
  button.onclick = submitForm
  getData()
}

