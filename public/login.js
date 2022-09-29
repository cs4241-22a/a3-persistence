// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

window.onload = (event) => {
  console.log('page is fully loaded');
  // define variables that reference elements on our page
  const loginBtn = document.getElementById("login");
  const registerBtn = document.getElementById("register");
  const loginForm = document.querySelector("form");

  registerBtn.addEventListener("click", event => {
    // stop our form submission from refreshing the page
    event.preventDefault();

    if(loginForm.elements.uname.value == "" || loginForm.elements.pwd.value == ""){
      window.alert("Must enter a username and password.")
      return
    }

    fetch("/register", {
      method: "POST",
      body: JSON.stringify({
        uname: loginForm.elements.uname.value,
        pwd: loginForm.elements.pwd.value,
        entries: []
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.login) {
          window.location.href = "/logger";
        } else {
          window.alert(
            "That user already exists! Maybe try another name?"
          );
        }
      });

    // reset form
    loginForm.reset();
  });

  loginBtn.addEventListener("click", event => {
    // stop our form submission from refreshing the page
    event.preventDefault();

    if(loginForm.elements.uname.value == "" || loginForm.elements.pwd.value == ""){
      window.alert("Neither username nor password can be an empty string.")
      return
    }

    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        uname: loginForm.elements.uname.value,
        pwd: loginForm.elements.pwd.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.login) {
          window.location.href = "/logger";
        } else {
          window.alert("Invalid login info.");
        }
      });

    // reset form
    loginForm.reset();
  });

};

