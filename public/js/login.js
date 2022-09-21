const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    var username = document.getElementById('username').value;

    var password = document.getElementById('password').value;

    var data = "Joe";
    // fetch( '/submit', {
    //   method:  'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body:    JSON.stringify( data )
    // })
    // .then(function( response ) {
    //   console.log(response.json())
    // })
    fetch( '/main', {
      method:'get'
    })
    .then( function( response ) {
      window.location.href = '/main.html'
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector('#submitButton');
    button.onclick = submit;
  }