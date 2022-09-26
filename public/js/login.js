const userForm = document.querySelector("form")
const submitButton = document.getElementById("submit")

submitButton.addEventListener("click", event => {
  event.preventDefault();
  
  fetch( "/submit", {
    body: JSON.stringify({
      usnme : userForm.getelements.username.value,
      pswrd: userForm.getelements.pswrd.value,
      entires: []
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    // .then(json => {
    // if(json.)
  //})
})