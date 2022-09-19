

console.log("Sign In");

const form = document.forms[0];

const user = form.elements['userName'];
const pass = form.elements['password'];


form.onsubmit = function (event){

    event.preventDefault();

    const input = {
        user: user.value,
        pass: pass.value,
    }

    const body = JSON.stringify(input);
    console.log(input)

    fetch('/signUp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
    })
    alert("Account have been created! You may now log in.");
    window.location.href = "index.html";

        // .then((response) => response.json())
        // .then(function () {
        //
        // })
        // .then(function () {
        //
        // })
    // .then(function (response){
    //     console.log(response.json())
    //     if (response === "True"){
    //         window.location.href = "/main.html";
    //     }
    // })
    // .then(window.location.href = "/main.html")


}