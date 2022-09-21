const update = function (e) {
  fetch('/api',{
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

      var rowInfo = [];
      for(let j = 0; j < response.length; j++)
      {
          if(typeof response[j].Name === "string")
          {
              rowInfo.push(response[j]);
          }
      }

      for(let r = 0; r < rowInfo.length; r++)
      {
          var row = table.insertRow(r + 1);

          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);


          cell1.innerHTML = response[r].index;
          cell2.innerHTML = response[r].Name;
          cell3.innerHTML = response[r].Characters;
          cell4.innerHTML = response[r].Timestamp;
      }
  })
}

const add = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#addname' ),
          json = input.value,
          body = JSON.stringify( json );

    fetch( '/add', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      console.log( response )
    })

    update;

    return false
  }

  const modify = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#oldname' ),
          json = input.value,
          body = JSON.stringify( json );

    const input2 = document.querySelector( '#newname' ),
          json2 = input.value,
          body2 = JSON.stringify( json );

    fetch( '/modify', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      console.log( response )
    })

    update;

    return false
  }

  const deleteItem = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#deletename' ),
          json = input.value,
          body = JSON.stringify( json );

    fetch( '/delete', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      console.log( response )
    })

    update;

    return false
  }

  const signout = function (e) {
    e.preventDefault()

    window.location.href = '/'
  }

  window.onload = function() {
    const addButton = document.querySelector('#addButton');
    const modifyButton = document.querySelector('#modifyButton');
    const deleteButton = document.querySelector('#deleteButton');
    const signoutButton = document.querySelector('#signoutButton');
    addButton.onclick = add;
    modifyButton.onclick = modify;
    deleteButton.onclick = deleteItem;
    signoutButton.onclick = signout;
  }