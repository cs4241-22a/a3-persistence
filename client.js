// Add some Javascript code here, to run on the front end.

window.onload = function () {
  console.log("a3 test")

  const submit_btn = document.getElementById("login_btn")
  submit_btn.onclick = login
}

// attempt login
const login = (e) => {
  e.preventDefault()
  
  const username = document.getElementById("username").value,
    password = document.getElementById("password").value

  if (username == "" || password === "") {
    alert("Please enter your username and password.")
    return
  }

  fetch("/login", {
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
  })
  .then(async (response) => {
    // do something with response
    console.log(await response.json())
  })
  .catch((err) => console.error(err))
  
  return false
}

// GET appdata
const getItems = () => {
  fetch("/", {
    method: "GET",
  })
  .then(async (response) => console.log(await response.json()))
  .catch((err) => console.error("err get: " + err))
}

// remove entry
const removeItem = (e) => {
  e.preventDefault()

  // get id of entry somehow
  const value = e.target.value

  fetch("/remove", {
    method: "POST",
    body: JSON.stringify({"value":value})
  })
  .then(async (response) => console.log(await response.json()))
  .catch((err) => console.error("err remove: " + err))
}

// update entry
const updateItem = (e) => {
  e.preventDefault()
  
  // get id of entry somehow
  const json = {_id:""}
  const body = JSON.stringify(json);

  fetch("/update", {
    method: "POST",
    body,
  })
  .then(async (response) => {
    // update/refresh page also
    console.log(await response.json())
  })
  .catch((err) => {console.log("err update: " + err)})
}
