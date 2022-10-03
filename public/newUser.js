const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const progressCheck = document.getElementById("progress-check");
const submitButton = document.getElementById("submit");

function emailValid() {
    const hasAt = emailInput.value.includes("@");
    const afterAt = hasAt ? (emailInput.value.indexOf("@") + 1 < emailInput.value.length) : false;
    return hasAt && afterAt;
}

window.onload = () => {
    submitButton.onclick = () => {

        const data = {
            email: emailInput.value,
            password: passwordInput.value,
            progressCheck: progressCheck.checked
        }

        console.log(data);

        if (emailValid()) {
            fetch("/new-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then((response) => {
                response.json().then((d) => {
                    const jsonRes = JSON.parse(d);
                    if (jsonRes.error) {
                        window.location = "/sign-in?redirect=true";
                    } else {
                        localStorage.setItem("MS:email", jsonRes.email);
                        window.location = "/play";
                    }
                })
            });
        }
    }
    localStorage.removeItem("MS:email");
}