// Add some Javascript code here, to run on the front end.

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const input = document.getElementById( 'shoppingitem' ),
        input2 = document.getElementById('quantity'),
        input3 = document.getElementById('price'),
        input4 = document.getElementById('username'),
        json = { shoppingitem: input.value, quantity: input2.value, price: input3.value, username: input4.value},
        body = JSON.stringify( json )

  fetch( '/submit', {
    method:'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json'},
    body
  })
  .then ( response => response.json() )
  .then( json => { 
    window.location.reload()
  })

  return false
}

const deleteData = function ( e ) {
  // prevent default form action from being carried out
  e.preventDefault()
  const input = document.getElementById('delete'),
        input2 = document.getElementById('username')
        json = { row: input.value, username: input2.value },
        body = JSON.stringify( json )
        
  fetch( '/deleteData', {
    method:'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json'},
    body
  })
  .then ( response => response.json() )
  .then( json => { 
    window.location.reload()
  })

  return false
}

const modifyData = function ( e ) {
  // prevent default form action from being carried out
  e.preventDefault()
  const input = document.getElementById('modify'),
        input2 = document.getElementById('username'),
        input3 = document.getElementById( 'shoppingitemNew' ),
        input4 = document.getElementById('quantityNew'),
        input5 = document.getElementById('priceNew'),
        json = { row: input.value, username: input2.value, shoppingitem: input3.value, quantity: input4.value, price: input5.value },
        body = JSON.stringify( json )
        
  fetch( '/modifyData', {
    method:'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json'},
    body
  })
  .then ( response => response.json() )
  .then( json => { 
    window.location.reload()
  })

  return false
}

window.onload = function() {
  const button = document.getElementById( 'submitButton' )
  button.onclick = submit
  const button2 = document.getElementById( 'deleteButton' )
  button2.onclick = deleteData
  const button3 = document.getElementById( 'modifyButton' )
  button3.onclick = modifyData
  getData()
  
}

getData = function() {
  const input = document.getElementById('username'),
  json = { username: input.value},
  body = JSON.stringify( json )

  fetch( '/getShoppingData', {
   method:'POST',
   credentials: 'same-origin',
   headers: { 'Content-Type': 'application/json'},
   body
  })
  .then(response => response.json())
  .then(json => {
    totalPrice = 0
    let shoppingList = json
    shoppingList.forEach( item => {
        let shoppingTable = document.getElementById("insertInfo")
        shoppingTable.innerHTML = ""
    })

    shoppingList.forEach( item => {
      let shoppingTable = document.getElementById("insertInfo")
      let shoppingRow = shoppingTable.insertRow(0)
      let shoppingCell1 = shoppingRow.insertCell(0)
      let shoppingCell2 = shoppingRow.insertCell(1)
      let shoppingCell3 = shoppingRow.insertCell(2)

      shoppingCell1.innerHTML = item.shoppingitem
      shoppingCell2.innerHTML = item.quantity
      shoppingCell3.innerHTML = item.price
      totalPrice = totalPrice + (parseFloat(item.price) * parseFloat(item.quantity))
    
    })
    let insertPrice = document.getElementById("totalInsert")
    insertPrice.innerHTML = "$" + Math.round(totalPrice * 100)/100
    if (shoppingList.length === 0) {
      let shoppingTable = document.getElementById("insertInfo")
      shoppingTable.innerHTML = ""
      insertPrice.innerHTML = "$0"
    }
  })
}

