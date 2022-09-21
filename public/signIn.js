

console.log("Sign In");

const form = document.forms[0];

const user = form.elements['userName'];
const pass = form.elements['password'];


form.onsubmit = function (event){

    event.preventDefault();

    const input = {
        user: user.value,
    }

    const body = JSON.stringify(input);
    console.log(input)

    fetch('/signUp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
    })
        .then((response) => {
            console.log(response.url)
            if (response.url.includes("signUp.html")){
                alert("Username already exists. Please use another!");
                window.location.href = response.url
            }
            else if (response.url.includes("index.html")){
                alert("Account have been created! You may now log in.");
                window.location.href = response.url;
            }

        })




}