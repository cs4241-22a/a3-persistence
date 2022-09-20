/**
 * body format
 * (AUTO GENERATED) _id
 * _userID
 * itemName
 * itemPrice
 * itemQuantity
 *(AUTO GENERATED) total
 */
let _id = "6328e6f035686cb7e52e3f4b"

const getData = function() {

    fetch( `/items?_id=${_id}`, {
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
    table.innerHTML = "<tr> <th>Item Name</th> <th>Price</th> <th>Quantity</th> <th>Total Price</th></tr>"
    
    jsonData.forEach(entry => {
      table.innerHTML += `<tr> <th>${entry.name}</th> <th>${entry.price}</th> <th>${entry.quantity}</th> <th>${entry.total}</th> <th><button onclick="deleteEntry(\'${entry._itemID}\')">delete</button><th></tr>`
    })
  }
  

const submitForm = function(e)  {
    // prevent default form action from being carried out
    e.preventDefault()
  
    const itemName = document.getElementById( 'itemName' ),
          itemQuantity = document.getElementById( 'itemQuantity' ),
          itemPrice = document.getElementById( 'itemPrice' ),
          json = {_id: "6328e6f035686cb7e52e3f4b",
                  name: itemName.value,
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
    let json = {_id: _id,
                _itemID: _itemID},
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
    let json = {_id: _id,
                _itemID: _itemID,
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

