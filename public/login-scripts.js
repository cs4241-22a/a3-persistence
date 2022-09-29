window.onload = function() {
    const loginForm = document.querySelector(".needs-validation")
    loginForm.addEventListener("submit", event => {
        if (!loginForm.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            loginForm.classList.add("was-validated")
        }
    })
}
