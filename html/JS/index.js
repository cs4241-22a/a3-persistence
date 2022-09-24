const Loggin = function (e) {
  e.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  const json = { username: username, password: password };
  const body = JSON.stringify(json);

  fetch(
    "/auth/local",
    {
      method: "POST",
      body,
    }
  ).then(result => {
      redirect(result.url);
  })
};

window.onload = function () {
  const button_submit = document.querySelector("#submit");
};
