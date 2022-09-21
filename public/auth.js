const login = function (e) {
    e.preventDefault()

    const username = document.querySelector('#username'),
        password = document.querySelector( '#password' ),
        json = { username: username.value, password: password.value },
        body = JSON.stringify( json )

    fetch('/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
    .then(window.location.href = 'account.html')

    return false
}

window.onload = function() {
    const loginButton = document.querySelector('#loginButton')
    loginButton.onclick = login
}