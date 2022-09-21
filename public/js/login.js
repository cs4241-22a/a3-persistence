const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    var username = document.getElementById('username').value;

    var password = document.getElementById('password').value;

    fetch('/authenticate', {
      method: 'get'
    })
    .then ( function (response) {
      return response.json();
    })
    .then( function (response) {
      if(response === 'true')
      {
        window.location.href = '/main.html'
      }
      else{
        window.location.href = '/'
      }
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector('#submitButton');
    button.onclick = submit;
  }