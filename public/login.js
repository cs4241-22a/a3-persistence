window.onload = () => {
    document.getElementById("create-acct-button").onclick = () => {
        window.location = "/new-user";
    };
    document.getElementById("sign-in-button").onclick = () => {
        window.location = "/sign-in";
    };
    localStorage.removeItem("MS:email");
}