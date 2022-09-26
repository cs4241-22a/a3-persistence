
const loginForm = document.forms[0];
const username = loginForm.elements["username"];
const password = loginForm.elements["password"];

console.log(username);
console.log(password);

loginForm.onsubmit = function(event) {
  event.preventDefault(); 
  //push as key value pair
  console.log (username, password);
  loginjson = {
		"username": username,"password": password, "login": false
  }

  fetch( '/submit', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify(loginjson)
  })
  .then( response => response.json() )
  .then( json => console.log( json ) )
  /*.then(async function (response){
       console.log("the function response")
       console.log(response)
       //let newData = await response.json() //wait until response
       //update(newData)
       //console.log(newData)
    })*/
}