const saveForm = document.getElementById("save");
const email = document.getElementById("email");
const fullname = document.getElementById("fullname");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const discordID = document.getElementById("discordID")
const rank = document.getElementById("rank");
const steamID = document.getElementById("steamID");
let link = "";

window.onload = (event) => {
  console.log('page is fully loaded');
  email.innerHTML = "faceitlvl2@faceit.com";
  link = window.location.href;
  link = link.substring(link.lastIndexOf("/")+1);
  getData(link);
};

saveForm.addEventListener("click", async function(event) {

  console.log(link);
  //event.preventDefault();

  let JSONObject =
        {"username": link,
         "password": "",
         "firstname": document.getElementById("firstname").value,
         "lastname": document.getElementById("lastname").value,
         "discordID": document.getElementById("discordID").value,
         "rank": document.getElementById("rank").value,
         "steamID": document.getElementById("steamID").value
        }

  
  const response = await fetch( '/update', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(JSONObject)
  })
  console.log("fetch");
  location.reload();
})

async function getData(name){
  const response = await fetch("/getData", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({username: name})
  })  
  
  const responseJSON = await response.json();
  email.innerHTML = responseJSON.username;
  fullname.innerHTML = responseJSON.firstname + " " + responseJSON.lastname;
  
  firstname.value = responseJSON.firstname;
  lastname.value = responseJSON.lastname;
  discordID.value = responseJSON.discordID;
  rank.value = responseJSON.rank;
  steamID.value = responseJSON.steamID; 
  console.log(responseJSON);
}