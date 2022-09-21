console.log("Hello World; From Login");


// onwindow load
window.onload = function () {
    //add button listener
    document.getElementById("git-login").addEventListener("click", function () {
        //make a post request to the server to authenticate with github no body needed
        //go to login page
        window.location.href = "http://localhost:3000/login-go";
        // fetch("/login-go", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
    });
};