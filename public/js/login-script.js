const baseUrl = "https://stocklist.herokuapp.com";

window.onload = function () {
  //add button listener
  document.getElementById("git-login").addEventListener("click", function () {
    console.log("git login button clicked");
    window.location.href = baseUrl + "/auth/github";
  });

  //add button listener's for login and register
  document
    .getElementById("loginbutton")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      console.log("login button clicked");
      //make a post request to the server to login
      let response = await fetch(baseUrl + "/auth/custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
        }),
      });

      let data = await response.json();
      console.log(data);

      if (data.message.includes("success")) {
        window.location.href = baseUrl + "/";
      } else {
        document.getElementById("login-message").innerHTML = data.message;
      }
    });

  //add button listener's for register
  document
    .getElementById("registerbutton")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      console.log("register button clicked");
      //make a post request to the server to login
      let response = await fetch(baseUrl + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
        }),
      });

      let data = await response.json();
      console.log(data);
      if (data.message.includes("success")) {
        window.location.href = baseUrl + "/";
      } else {
        document.getElementById("login-message").innerHTML = data.message;
      }
    });
};
