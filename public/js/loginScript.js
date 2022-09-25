
const loginClickHandler = function(e){
    e.preventDefault()
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
        fetch('/login', {
            method: 'POST',
            body: bodyVal.toString(),
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(res => {
            if (res.url.split('/')[res.url.split('/').length - 1] == "login"){
                displayAlertMessage("Username or password was incorrect")
            } else {
                window.location.href = res.url
            }
          })
    }
}

const displayAlertMessage = function(message){
    const alertDiv = document.getElementById('infoAlert')
    const alertDialog = document.getElementById('alertDialog')
    alertDialog.innerText = message
    alertDiv.classList.toggle("hidden")
    alertDiv.classList.toggle("inline-flex")
}

window.onload = function () {
    const dismissInfo = document.getElementById('dismissInfoButton')
    const alertDiv = document.getElementById('infoAlert')
    dismissInfo.onclick = function() {
        document.getElementById('alertDialog').innerText = ""
        alertDiv.classList.toggle("inline-flex")
        alertDiv.classList.toggle("hidden")
    }
    const loginButton = document.getElementById('loginButton')
    loginButton.onclick = loginClickHandler
}
