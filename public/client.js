const loginForm = document.getElementById("loginform");

// listen for the form to be submitted and add a new dream when it is
loginForm.onsubmit = async function(event) {
  
  // stop our form submission from refreshing the page
  event.preventDefault();
  
  let JSONObject =
      {"username": document.getElementById("floatingInput").value,
       "password": document.getElementById("floatingPassword").value}
  
  const response = await fetch( '/login', {
  method:  'POST',
  headers: { 'Content-Type': 'application/json' },
  body:    JSON.stringify( JSONObject )
  })
  
  //console.log("Hello Client")
  const responseJSON = await response.json();
  if(responseJSON.status === "SUCCESS"){
    window.location.replace("/home/" + JSONObject.username)
  }else{
    alert("Incorrect Login")
  }
  // get dream value and add it to the list
  
  //if(document.getElementById("floatingPassword").value === document.getElementById("floatingPassword2").value)
    //console.log("Same Password")
  // reset form
  
};


