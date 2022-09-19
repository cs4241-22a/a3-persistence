

console.log("Log In");

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

    fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            if (JSON.stringify(json) === JSON.stringify(['True'])){
                window.location.href = "/main.html";
            }
        })
        // .then(function (response){
        //     console.log(response.json())
        //     if (response === "True"){
        //         window.location.href = "/main.html";
        //     }
        // })
        // .then(window.location.href = "/main.html")


}



