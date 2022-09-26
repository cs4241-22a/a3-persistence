
const userForm = document.querySelector("form")
const loginButton = document.getElementById("log-in")
const registerButton = document.getElementById("register")

registerButton.addEventListener("click", event => {
  event.preventDefault()

  if(userForm.elements.username.value == "" || userForm.elements.password.value == "")
  {
    window.alert("username and password cannot be empty")
    return
  }

  fetch("/register", {
    method: "post",
    body: JSON.stringify({
      usr: userForm.elements.username.value,
      pwd: userForm.elements.password.value,
      entries: []
    }),
    headers: {"Content-Type": "application/json"}
  })
    .then(res => res.json())
    .then(json => {
      if(json.login)
      {
        window.location.href = "playlist"
      }
      else
      {
        window.alert("user already exists")
      }
    })
    userForm.reset()
})


loginButton.addEventListener("click", event => {
    event.preventDefault()
  
    if(userForm.elements.username.value == "" || userForm.elements.password.value == "")
    {
      window.alert("neither username or password can be an empty string")
      return
    }
  
    fetch("/login", {
      method: "post",
      body: JSON.stringify({
        usr: userForm.elements.username.value,
        pwd: userForm.elements.password.value
      }),
      headers: {"Content-Type": "application/json"}
    })
      .then(res => res.json())
      .then(json => {
        if(json.login)
        {
          window.location.href = "playlist"
        }
        else
        {
          window.alert("invalid login")
        }
      })
      userForm.reset()
  })



