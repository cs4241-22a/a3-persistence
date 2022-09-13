const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#yourname' ),
          json = input.value,
          body = JSON.stringify( json )

    fetch( '/', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      console.log( response )
    })

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

    return false
  }

  window.onload = function() {
    const button = document.querySelector('#submitButton');
    button.onclick = submit;
  }