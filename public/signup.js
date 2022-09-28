const signupForm = document.getElementById("signupform");

signupForm.addEventListener('submit', async e => {
  
  event.preventDefault();
  

  
  
  if(document.getElementById("floatingPassword").value === ""){
    alert("Please Enter a Password");
  }else{
    
    if(document.getElementById("floatingPassword").value === document.getElementById("floatingPassword2").value){
    //console.log("Signed Up");
      
      let JSONObject =
      {"username": document.getElementById("floatingInput").value,
       "password": document.getElementById("floatingPassword").value,
       "firstname": "",
       "lastname": "",
       "discord id": "",
       "rank ": "",
       "steamID": ""
      }
      
      const response = await fetch( '/signup', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify( JSONObject )
      })
    
    const responseJSON = await response.json();
      if(responseJSON.status === "FAILED"){
         alert(responseJSON.msg.toString());
      }
      if(responseJSON.status === "SUCCESS"){
        window.location.replace("/")
      }
    }
    else{
      alert("Password must be the same");
    }
  }
  
  
  
  
  

});
  
  
  
