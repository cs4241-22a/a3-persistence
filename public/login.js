// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

// define variables that reference elements on our page

// define variables that reference elements on our page
const login_form = document.querySelector("form");
const login_btn = document.getElementById("login");
const signup_btn = document.getElementById("signup");

//Listening for button click
login_btn.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: login_form.elements.username.value,
      password: login_form.elements.password.value,
      entries: [],
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("logging in! client")
      if(json.code == 0){
        console.log("password checked and correct")
        window.location.href = "index.html";
      }
    else{
      window.alert("Wrong password")
    }
        
    });
});

signup_btn.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: login_form.elements.username.value,
      password: login_form.elements.password.value,
      entries: [],
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if (json.code == 1) {
        window.alert("user exists ")
      } else {
        window.alert("user created");
        window.location.href = "index.html";
      }
    });
});
