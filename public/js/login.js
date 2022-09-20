const loginForm = document.getElementById("form");
const signForm = document.getElementById("form2");
const username = document.getElementById("username1");
const password = document.getElementById("password1");

loginForm.addEventListener('submit', event => {
    event.preventDefault();
}
    const body = JSON.stringify(json);

    fetch("/login", {
        method: "POST",
        body:body,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(user => {
            if (user.length === 0) {
                window.alert("Incorrect Username or Password, Please Try Again!");
                loginForm.reset();
            } else {
                window.location.href = "index.html";
            }
        });
})

signForm.addEventListener('submit', event => {
    event.preventDefault();

    let success = true;
    const username = document.getElementById("username2")
    const password = document.getElementById("password2")
    const json = { username: username.value, password: password.value }
    const body = JSON.stringify(json);

    fetch("/create", {
        method: "POST",
        body:body,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if(response.status != 200) {
                window.alert("Username Taken!")

            }else {
                response.json()
                window.location.href = "/index.html";
            }
        })

})


