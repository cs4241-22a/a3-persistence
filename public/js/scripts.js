// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  let name = document.querySelector("#name");
  let ratname = document.querySelector("#ratname");

  let json = {
    name: name.value,
    ratname: ratname.value,
  };
  
  let ratName = ratname.value
  
  let body = JSON.stringify(json);
  fetch("/submit", {
    method: "POST",
    body,
  }).then(async function (response) {
    let newData = await response.json();
    refreshInfo(ratName, newData);
    console.log(newData);
  });

  return false;
};

function refreshInfo(ratName, data) {
  const rats = document.getElementById("rats");
  const adjes = ["funky", "furry", "spunky", "based", "wiggly", "rabid", "feral", "amphibious", "moist", "scrungy", "filthy", "bronchiatic", "clueless", "ditsy", "arthritic", "useless", "cute", "decorative", "assiduous", "gothic", "postmodern", "fully automatic", "scared", "skittish", "large", "tiny", "strategic", "colorblind", "gaslighting", "gatekeeping", "cringe", "sus", "rancid", "bedazzled", "confused", "sticky", "litigious", "stinky", "nutty"]
  let adje = adjes[Math.floor(Math.random()*adjes.length)];
  const nouns = ["fella", "friend", "pisser", "chef", "Charlie", "girlboss", "Bagungus", "ambassador", "microwave", "nurse", "spy", "loaf", "entertainer", "swifty", "garfhead", "furry", "guy", "professor", "hatrat", "mayor", "problem", "barrister", "mobster", "monster", "child", "Delta SkyPriority Gold Member", "Delta SkyPriority Silver Member", "credit card fraudster", "sinner", "snitch", "plumber", "rhat", "rat", "landlord", "vegetarian", "carnivore", "murderer", "true crime podcaster", "historian", "bandit", "smuggler", "morb", "amongus", "barista", "whippersnapper", "motivational speaker/juggler", "DJ", "game show host", "CS major", "singer", "puddle"] 
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  let html =
    `
        <h1>You named this ` +
    adje +
    ` little ` +
    noun +
    ` <span style="color:red">` +
    ratName +
    `</span></h1>
        <p>Here's what other people named this rat:</p>
    `;

  data.forEach((element, index) => {
    html += "<p class='data' style='display:inline-block' onclick='remove(this)'>" + element.ratname + ", by " + element.name + "</p>";
  });
  html += "</div>"
  rats.innerHTML = html;
}

function remove(p){
  const div = document.getElementById("rats")
  //I didn't have time to do this
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
