//listen for the form to be submitted
const signIn = function (e) {
  //prevent default form action from being carried out
  e.preventDefault()
  
  let username = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;
  
  fetch('/signin', {
    method: 'POST',
    body:JSON.stringify({name: username, password:password}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => {
    if(json.result === "success"){
      window.location.replace('/index');
    }
    else {
      window.location.replace('/loginfail');
    }
  })
};

window.onload = function() {
  const button1=document.getElementById('loginButton')
  button1.onclick = signIn
}

