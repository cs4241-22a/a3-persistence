const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    const body = JSON.stringify({'username': username, 'password': password});

    fetch('/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
    .then ( function (response) {
      return response.json();
    })
    .then( function (response) {
      if(response === 'true')
      {
        fetch('/setcookie', {
          method: 'GET'
        })
        .then( function (response){
            console.log(response);
        });
        window.location.href = '/main.html'
      }
      else{
        window.location.href = '/'
      }
    })

    return false
  }

const newAccount = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#newusername' ),
          input2 = document.querySelector( '#newpassword' ),
          input3 = document.querySelector( '#name' ),
          val1 = input.value,
          val2 = input2.value,
          val3 = input3.value,
          body = JSON.stringify( {'username':val1, 'password':val2, 'name':val3 });

    fetch( '/new', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body 
    })
    .then( function( response ) {
      console.log( response )
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector('#submitButton');
    const newAccountButton = document.querySelector('#newButton');
    button.onclick = submit;
    newAccountButton.onclick = newAccount;
  }