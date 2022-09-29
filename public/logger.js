// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");


// define variables that reference elements on our page
const welcome = document.getElementById("welcome");

// a helper function that creates a list item for a given chore
function appendNewEntry(entry) {
  const entriesList = document.getElementById("viewChores");
  const newListItem = document.createElement("li");
  newListItem.innerText = entry[0] +"-" + entry[1];
  entriesList.appendChild(newListItem);
}

let displayEntries = function(entries){
  console.log(entries);
  console.log(entries.length);
  
  const entryList = document.getElementById("viewChores");
  
  
  while(entryList.firstChild){
    entryList.removeChild(entryList.firstChild);
  }
  
  for(let i=0; i<entries.length; i++){
    let entry = document.createElement("div");
    entry.className = "ui divider";
    
    let choreInfo = document.createElement("div");
    choreInfo.className = "ui divider";
    choreInfo.innerText = entries[i].chore + " - " + entries[i].hours + " hours    ";
    
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "mini ui right floated button";
    deleteBtn.innerText = "delete";
    
    let modifyBtn = document.createElement("button");
    modifyBtn.className = "mini ui right floated button";
    modifyBtn.innerText = "modify";
    
    deleteBtn.addEventListener("click", event => {
      event.preventDefault();
      fetch("/deleteEntry", {
        method: "POST",
        body: JSON.stringify({
          hours: entries[i].hours,
          index: i
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(entries => {
        displayEntries(entries);
      });
    });
    
    modifyBtn.addEventListener("click", event => {
      event.preventDefault();
      if(document.getElementById("hours") == null || document.querySelector('#chores option:checked') == null){
        alert("Please enter all fields")
        window.location.href = "/logger";
      }
      let newEntry = [document.getElementById("hours").value, document.querySelector('#chores option:checked').value];
      if(newEntry[0] == ""){
        alert("Please enter how many hours were spent completing the chore")
        window.location.href = "/logger";
      }
      else if(newEntry[0].value < 0 || newEntry[0].value > 24){
        alert("Invalid number of hours must be between 0 and 24, setting")
        window.location.href = "/logger";
      }
      else{
        fetch("/modifyEntry", {
        method: "POST",
        body: JSON.stringify({
          hours: newEntry[0],
          chore: newEntry[1],
          index: i
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(entries => {
        displayEntries(entries);
      });
      }
      
    });
    
    entryList.appendChild(entry);
    entry.appendChild(choreInfo);
    choreInfo.appendChild(deleteBtn);
    choreInfo.appendChild(modifyBtn);
  }
}

window.onload = (event) => {
  console.log('page is fully loaded');
  
  
  const submitBtn = document.getElementById("submitChore");
  const logoutBtn = document.getElementById("logout");
  
  document.getElementById("welcome").innerText = "Welcome!";
  fetch("/uname", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json()) // parse the JSON from the server
    .then(json => {
      if(json.uname){
        document.getElementById("welcome").innerText = "Welcome " + json.uname + "!";
      }
      else{
        window.alert("Please login first!");
        window.location.href = "/";
      }
    });
  
  fetch("/chores", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json()) // parse the JSON from the server
    .then(entries => {
        displayEntries(entries);
    });
  
 submitBtn.addEventListener("click", event => {
      event.preventDefault();
      if(document.getElementById("hours") == null || document.querySelector('#chores option:checked') == null){
        alert("Please enter all fields")
        window.location.href = "/logger";
      }
      let newEntry = [document.getElementById("hours").value, document.querySelector('#chores option:checked').value];
      if(newEntry[0] == "" || newEntry[1] == ""){
        alert("Please enter how many hours were spent completing the chore")
        window.location.href = "/logger";
      }
     else if(newEntry[0] < 0 || newEntry[0] > 24){
       alert("Invalid number of hours please keep the number of hours between 0 and 24")
       window.location.href = "/logger";
      }
     else{
      fetch("/submitEntry", {
        method: "POST",
        body: JSON.stringify({
          hours: newEntry[0],
          chore: newEntry[1],
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(entries => {
        displayEntries(entries);
      });
     }
    });

  logoutBtn.addEventListener("click", event => {
    event.preventDefault();
    console.log('logout')

    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.logout) {
          window.location.href = "/";
        } 
        else {
          window.alert("You are already logged out.");
          window.location.href = "/";
        }
      });
  });
};



 



