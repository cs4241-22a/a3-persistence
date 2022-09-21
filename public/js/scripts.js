const update = function () {
  fetch('/table',{
    method: 'GET'
  })
  .then( function (response ) {
    return response.json();
  })
  .then( function( response ) {
      var table = document.getElementById("table");

      for(let i = table.rows.length; i > 1; i--)
      {
        table.deleteRow(i - 1);
      }

      for(let r = 0; r < response.length; r++)
      {
          var row = table.insertRow(r + 1);

          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);


          cell1.innerHTML = response[r].username;
          cell2.innerHTML = response[r].name;
          cell3.innerHTML = response[r].numChars;
          cell4.innerHTML = response[r].timestamp;
      }
  })
}

const add = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#addname' ),
          json = input.value,
          body = JSON.stringify({'name': json});

    fetch( '/add', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body 
    })
    .then( function( response ) {
      console.log( response )
    })

    update();

    return false
  }

const modify = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#oldname' ),
          input2= document.querySelector('#newname');
          val1 = input.value,
          val2 = input2.value,
          body = JSON.stringify( {'oldname': val1, 'newname':val2} );

    fetch( '/modify', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body 
    })
    .then( function( response ) {
      console.log( response )
    })

    update();

    return false
  }

  const deleteItem = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#deletename' ),
          json = input.value,
          body = JSON.stringify( {'name':json });

    fetch( '/remove', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body 
    })
    .then( function( response ) {
      console.log( response )
    })

    update();

    return false
  }

  const signout = function (e) {
    e.preventDefault()

    window.location.href = '/'
  }

  window.onload = function() {
    update();
    const addButton = document.querySelector('#addButton');
    const modifyButton = document.querySelector('#modifyButton');
    const deleteButton = document.querySelector('#deleteButton');
    const signoutButton = document.querySelector('#signoutButton');
    
    addButton.onclick = add;
    modifyButton.onclick = modify;
    deleteButton.onclick = deleteItem;
    signoutButton.onclick = signout;
  }