
const registerClickHandler = function(e){
    e.preventDefault()
    console.log("Click")
    const password = document.getElementById('passwordInput').value
    const username = document.getElementById('usernameInput').value
    if (username == ""){
        console.log("Username is empty")
        // do something here
    } else if (password == ""){
        console.log("Password is empty")
        // do something here
    } else {
        const bodyVal = new URLSearchParams()
        bodyVal.append('username',username)
        bodyVal.append('password',password)
        fetch('/user/register', {
            method: 'POST',
            body: bodyVal.toString(),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(res => {
            if (res.url.split('/')[res.url.split('/').length - 1] == "register"){
                displayAlertMessage("Username is already taken", false)
            } else {
                displayAlertMessage("Succesfully registered. Redirecting to login page", true)
                redirect_Page(res.url)
            }
          })
    }
}

let redirect_Page = (page) => {
    let tID = setTimeout(function () {
        window.location.href = page;
        window.clearTimeout(tID);		// clear time out.
    }, 5000);
}

const displayAlertMessage = function(message, colorGreen){
    const alertDiv = document.getElementById('infoAlert')
    const alertDialog = document.getElementById('alertDialog')
    if (colorGreen){
        alertDiv.classList.toggle("bg-red-200")
        alertDiv.classList.toggle("text-red-800")
        alertDiv.classList.toggle("bg-green-200")
        alertDiv.classList.toggle("text-green-800")
    }
     

    alertDialog.innerText = message
    alertDiv.classList.toggle("hidden")
    alertDiv.classList.toggle("inline-flex")
}

window.onload = function () {
    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");
    
    togglePassword.addEventListener("click", function () {
        // toggle the type attribute
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        // toggle the icon
        this.classList.toggle("bi-eye");   })

    const dismissInfo = document.getElementById('dismissInfoButton')
    const alertDiv = document.getElementById('infoAlert')
    dismissInfo.onclick = function() {
        document.getElementById('alertDialog').innerText = ""
        alertDiv.classList.toggle("inline-flex")
        alertDiv.classList.toggle("hidden")
    }
    const registerButton = document.getElementById('registerButton')
    registerButton.onclick = registerClickHandler
}
