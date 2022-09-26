let emailInput = null;
let passwordInput = null;
let errorMsg = null;
let submitButton = null;

function emailValid() {
    const hasAt = emailInput.value.includes("@");
    const afterAt = hasAt ? (emailInput.value.indexOf("@") + 1 < emailInput.value.length) : false;
    return hasAt && afterAt;
}

window.onload = () => {

    emailInput = document.getElementById("email");
    passwordInput = document.getElementById("password");
    errorMsg = document.getElementById("error-msg");
    submitButton = document.getElementById("submit");

    submitButton.onclick = () => {

        const data = {
            email: emailInput.value,
            password: passwordInput.value,
        }

        console.log(data);

        if (emailValid()) {
            fetch("/existing-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then((response) => {
                response.json().then((d) => {
                    const jsonRes = JSON.parse(d);
                    console.log(jsonRes);
                    if (jsonRes.error) {
                        document.getElementById("error-msg").classList.remove("hidden");
                    } else {
                        localStorage.setItem("MS:email", jsonRes.email);
                        window.location = "/play";
                    }
                })
            });
        }
    }

    // Display alert if url params
    const search = window.location.search.toString();
    if (search.includes("redirect")) {
        document.getElementById("redirect-msg").classList.remove("hidden");
    }
    localStorage.removeItem("MS:email");
}