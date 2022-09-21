// script for the main page once the user is logged in
// handles form submission and display

const logs1 = document.getElementById("logs");
const logs2 = document.getElementById("logs");
const submit = document.getElementById("submit");
const logout = document.getElementById("logout");
const workout = document.querySelector("form");

// adds logbook entry
function addEntry(entry) {
  const newLog = document.createElement("li");
  newLog.innerText =
    entry[0] + ": " + entry[1] + " min, " + entry[2] + " meters";
  logs1.appendChild(newLog);
}

// fills page with entries
let fill = function (entries) {
  while (logs2.firstChild) {
    logs2.removeChild(logs2.firstChild);
  }

  for (let i = 0; i < entries.length; i++) {
    let entry = document.createElement("div");
    entry.className = "row";

    let entryInfo = document.createElement("div");
    entryInfo.className = "col";
    entryInfo.innerText =
      entries[i].date +
      ": " +
      entries[i].time +
      " min, " +
      entries[i].meters +
      " meters";

    logs2.appendChild(entry);
    entry.appendChild(entryInfo);
  }
};

// on load
window.onload = function () {
  
  // get logbook entries and fill page with them
  fetch("/getLog", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((logs) => {
      fill(logs);
    });
};

// submit button click
submit.addEventListener("click", event => {
  event.preventDefault();
  
  let newLog = [workout.date.value, workout.time.value, workout.meters.value];
  
  fetch("/log", {
    method: "POST",
    body: JSON.stringify({
      date: newLog[0],
      time: newLog[1],
      meters: newLog[2]
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(logs => {
    fill(logs);
  });
})

// logout button click
logout.addEventListener("click", event => {
  event.preventDefault();
  
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
      window.location.href = "/";
    }
  });
});

