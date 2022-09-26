//listen for the form to be submitted
const signUp = function(e) {
  //prevent default form action from being carried out
  e.preventDefault()
  
  //get value and add to list
  let username = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;
  
  //fetch initial list
  fetch('/signup', {
    method:'POST',
    body:JSON.stringify({name:username, password:password}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json() )
  .then(json => {
    window.location.replace('/login')
  })
};

window.onload = function() {
  const button1 = document.getElementById( 'registerButton')
  button1.onclick = signUp
}