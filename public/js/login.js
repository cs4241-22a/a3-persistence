window.onload = function () {
    fetch('/redirectToUser', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        return res.json();
    }).then(json => {
        if (json.redirect) {
            window.location.replace("/user.html");
        }
    })


    const signIn = document.getElementById("signInBtn");
    signIn.onclick = signInHandler;

    const register = document.getElementById("registerAccBtn");
    register.onclick = registerHandler;
}

const registerHandler = function (event) {
    event.preventDefault();
    let username = document.getElementById("regUser").value;
    let password = document.getElementById("regPass").value;

    if (username.trim() === "" || password.trim() === "") {
        document.getElementById("regUser").value = "";
        document.getElementById("regPass").value = "";
        alert("Your username or password cannot be empty!");
    } else {
        let data = {
            username: username,
            password: password
        }

        fetch('/createAccount', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        }).then(json => {
            document.getElementById("regUser").value = "";
            document.getElementById("regPass").value = "";

            if (json.registrationSuccess) {
                alert("Your account has been successfully registered!");
                window.location.replace("/user.html");
            } else {
                alert("The username " + username + " is already taken!");
            }
        })
    }
}
const signInHandler = function (event) {
    event.preventDefault();
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;

    let data = {
        username: username,
        password: password
    }

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Within JSON");
        return res.json();
    }).then(json => {
        console.log("Back at JSON!");

        document.getElementById("usernameLogin").value = "";
        document.getElementById("passwordLogin").value = "";

        console.log(json.loginSuccess);
        if (json.loginSuccess) {
            window.location.replace("/user.html");
        } else {
            alert("Incorrect username or password!");
        }
    })
}

