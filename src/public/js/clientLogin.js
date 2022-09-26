// client-side js
// run by the browser each time your view template is loaded

 
const userForm = document.querySelector("form");
const loginButton = document.getElementById("log-in");
const registerButton = document.getElementById("register")



registerButton.addEventListener("click", event => {
  // stop our form submission from refreshing the page
  event.preventDefault()

  if(userForm.elements.username.value == "" || userForm.elements.password.value == ""){ //check for empty
    window.alert("Username or password is empty.")
    return
  }
  console.log("TRYING TO FETCH REGISTER")

  const json = { 
        username: userForm.elements.username.value,
        password: userForm.elements.password.value,
        entries: []}
  const body = JSON.stringify(json);

  fetch("/register", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
    .then(json => {
      if (json.login) {
        window.location.href = "mainPage"; //redirect to the main page if succesful
      } else {
        window.alert(
          "That user already exists! Maybe try another name?"
        );
      }
    });



  // fetch('/register', { //api request
  //   method: "POST",
  //   body: JSON.stringify({
  //     username: userForm.elements.username.value,
  //     password: userForm.elements.password.value,
  //     entries: []
  //   }),
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  //   .then(response => response.json())
  //   .then(json => {
  //     if (json.login) {
  //       window.location.href = "mainPage"; //redirect to the main page if succesful
  //     } else {
  //       window.alert(
  //         "That user already exists! Maybe try another name?"
  //       );
  //     }
  //   });

  // reset form
  userForm.reset(); //erase data
});



loginButton.addEventListener("click", event => {
  // stop our form submission from refreshing the page
  event.preventDefault();

  if(userForm.elements.username.value == "" || userForm.elements.password.value == ""){ //check for empty
    window.alert("Username or password is empty.")
    return
  }

  fetch("/login", { // api call
    method: "POST",
    body: JSON.stringify({
      username: userForm.elements.username.value,
      password: userForm.elements.password.value
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      if (json.login) {
        window.location.href = "mainPage"; //got to main pageif login ws successful
      } else {
        window.alert("Invalid login info.");
      }
    });

  // reset form
  userForm.reset();
});













