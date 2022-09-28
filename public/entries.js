
console.log("hello world :o - entries.js");

// define variables that reference elements on our page
const entry_form = document.querySelector("form");
const add_btn = document.getElementById("submit-entry");
const logout_btn = document.getElementById("logout");
const entry_list = document.getElementById("dreams")
let current_username = "";

add_btn.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: entry_form.elements.dream.value,
      feeling: entry_form.elements.feelings.value,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("adding - client");
      //console.log(json.user)
      current_username = json.user
      console.log(current_username)
      
    });
});

window.onload = function display_data(){
  
    fetch("/dreams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: current_username
    }),
  })
  .then((response) => response.json())
    .then((json) => {
      console.log("function display data");
})}

// fetch the initial list of dreams
// fetch("/dreams" {
      
//       })
//   .then(response => response.json()) // parse the JSON from the server
//   .then(dreams => {
//     // remove the loading text
//     entry_list.firstElementChild.remove();

//     // iterate through every dream and add it to our page
//     dreams.forEach(appendNewDream);

//     // listen for the form to be submitted and add a new dream when it is
//     dreamsForm.addEventListener("submit", event => {
//       // stop our form submission from refreshing the page
//       event.preventDefault();

//       // get dream value and add it to the list
//       let newDream = dreamsForm.elements.dream.value;
//       dreams.push(newDream);
//       appendNewDream(newDream);

//       // reset form
//       dreamsForm.reset();
//       dreamsForm.elements.dream.focus();
//     });
  // });

logout_btn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("logging out");
  window.location.href = "login.html";
});



