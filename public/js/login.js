window.onload = function () {
    const btn_signup = document.getElementById( 'btn_signup' )
    btn_signup.onclick = signup

    const btn_login = document.getElementById('btn_login')
    btn_login.onclick = login
}

function closePopupSignup() {
    document.getElementById("popup_signup").classList.remove("is-active")
}

const signup = function(){
 
    document.getElementById("popup_signup").classList.toggle("is-active");
    const button = document.getElementById( 'btn_create' );
    button.onclick = createAccount;
    
  }

  function createAccount() {
  
      console.log("start creating account")
      const json = {
          username:  document.getElementById("createName").value,
          password: document.getElementById("createPassword").value
      }
  
      let body = JSON.stringify(json)
      console.log(body)
      if (json['username'] === "" || json['password'] === "" )
        alert("Please fill in all fields.")
      else{
          fetch( '/createAccount', {
              method:'POST',
              body,
              headers:{
                "Content-Type":"application/json"
              }
            })
            .then( response => {return response.json()})
            .then(json => {
              if(json.isValid){
                console.log("Success creating account")
                document.getElementById('invalidUsername').classList.add('is-hidden')
                document.getElementById('createName').classList.remove('is-danger')
                document.getElementById('createPassword').value = ""
                document.getElementById('createName').value = ""
                closeEdit()
              }
              else{
                console.log("Unable to create account: username taken")
                document.getElementById('invalidUsername').classList.remove('is-hidden')
                document.getElementById('createName').classList.add('is-danger')
              }
          
            }) 
      }
  }

  function login() {
    const password = document.getElementById('loginPassword').value
    const username = document.getElementById('loginName').value
  
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        password: password,
        username: username
      }),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res => {
      return res.json()
    }) 
    .then(json => {
      if(json.worked){
        document.getElementById('loginPassword').value = ""
        document.getElementById('loginName').value = ""
        window.location.href = '/main.html'
      }
      else {
        document.getElementById('loginPassword').value = ""
        document.getElementById('loginName').value = ""
        document.getElementById('wrong_info').classList.remove("is-hidden")
        
      }
    })
  }
