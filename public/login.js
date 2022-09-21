// script for initial login page with sign in and register buttons

const form = document.querySelector("form");
const login = document.getElementById("login");
const register = document.getElementById("register");

// register button click
register.addEventListener("click", (event) => {
  event.preventDefault();

  fetch("/register", {
    method: "POST",
    body: JSON.stringify({
      user: form.elements.user.value,
      password: form.elements.password.value,
      logs: [],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.login) {
        window.location.href = "main";
      } else {
        console.log("That user already exists");
      }
    });

  form.reset();
});

// login button click
login.addEventListener("click", (event) => {
  event.preventDefault();

  fetch("/login", {
    method: "POST",
    body: JSON.stringify({
      user: form.elements.user.value,
      password: form.elements.password.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.login) {
        window.location.href = "main";
      } else {
        console.log("Invalid login");
      }
    });

  form.reset();
});
