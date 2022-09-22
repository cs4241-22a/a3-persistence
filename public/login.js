//client-side js
//used for login page (index.html)

//handle button presses and associated login
const form = document.querySelector("form")
const loginButton = document.getElementById("login")
const registerButton = document.getElementById("register")

loginButton.addEventListener("click", (event) => {
  //don't refresh the page
  event.preventDefault();
  //window.alert("button pressed!");

  //make sure no fields are blank
  if (
    form.elements.username.value == "" || form.elements.password.value == ""
  ) 
  {
    window.alert("Username and password must be filled out!")
    return
  } 
  else 
  {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.elements.username.value,
        password: form.elements.password.value,
      }),
    })
      //get the json back
      .then((response) => response.json())
      //parse the actual json
      .then((json) => {
        if (json.isLoginSuccessful) {
          //navigate to form page
          window.location.href = "form"
        } else {
          window.alert("Login info invalid. Make sure you are registered!")
        }
      })
  }
})

registerButton.addEventListener("click", (event) => {
  //don't refresh the page
  event.preventDefault()

  //make sure no fields are blank
  if (
    form.elements.username.value == "" || form.elements.password.value == ""
  ) 
  {
    window.alert("Username and password must be filled out!")
    return
  } 
  else 
  {
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.elements.username.value,
        password: form.elements.password.value,
      }),
    })
      //get the json back
      .then((response) => response.json())
      //parse the actual json
      .then((json) => {
        if (json.isLoginSuccessful) {
          //navigate to form page
          //console.log("going to form page")
          window.location.href = "form"
        } else {
          window.alert("Registration unsuccessful. User may already exist.")
        }
      })
  }
})
