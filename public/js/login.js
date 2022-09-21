const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    var username = document.getElementById('username').value;

    var password = document.getElementById('password').value;

    // EXAMPLE OF POST REQUEST THAT ADDS TO ARRAY
    // fetch( '/submit', {
    //   method:  'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body:    JSON.stringify([username])
    // })
    // .then( response => response.json() )
    // .then( console.log ) 

    //EXAMPLE OF GET REQUEST TO TABLE
    // fetch( '/table', {
    //   method:  'GET'
    // })
    // .then( response => response.json() )
    // .then( console.log )

    //HOW TO SWAP PAGES
    // fetch( '/main', {
    //   method:'get'
    // })
    // .then( function( response ) {
    //   window.location.href = '/main.html'
    // })

    return false
  }

  window.onload = function() {
    const button = document.querySelector('#submitButton');
    button.onclick = submit;
  }