const saveForm = document.getElementById("saveform");
const email = document.getElementById("email");
const fullname = document.getElementById("fullname");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const discordID = document.getElementById("discordID")
const rank = document.getElementById("rank");
const steamID = document.getElementById("steamID");
let linkstr = " ";

window.onload = (event) => {
  console.log('page is fully loaded');
  email.innerHTML = "faceitlvl2@faceit.com";
  linkstr = window.location.href;
  linkstr = linkstr.substring(linkstr.lastIndexOf("/")+1);
  getData(linkstr);
};

saveForm.addEventListener("click", async function(event) {

  console.log(linkstr);
  //event.preventDefault();

  let JSONObject =
        {"username": linkstr,
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