// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 3!");

const entriesList = document.getElementById("entries");
const date = document.querySelector("form")

function appendNewEntry(entry) {
  const newListItem = document.createElement("li")
  newListItem.innerText = entry[0] + "-" + entry[1];
  entriesList.appendChile(newListItem)
}



// fetch the initial list of dreams
fetch("/entries")
  .then(response => response.json()) // parse the JSON from the server
  .then(entries => {
    // remove the loading text
    entriesList.firstElementChild.remove();
  
    // iterate through every dream and add it to our page
    entries.forEach(appendNewEntry);

    // listen for the form to be submitted and add a new dream when it is
    date.addEventListener("submit", event => {
      // stop our form submission from refreshing the page
      event.preventDefault();

      // get dream value and add it to the list
      let newEntry = [date.mm_count.value, document.querySelector('input[type="radio"][name="mm_color"]:checked').value];
      if (newEntry[0] != "") {
        console.log(newEntry);
        entries.push(newEntry);
        appendNewEntry(newEntry);
      } else {
        alert ("Please enter a number of M&Ms");
      }
      

      // reset form
      date.reset();
      date.elements.mm_count.focus();
    });
  });


























const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const month = document.querySelector("#month")
  const day = document.querySelector("#day")
  const year = document.querySelector("#year")
  const json = { 
    month: month.value,
    day: day.value,
    year: year.value,
    yearsPast: ""
  }
  const body = JSON.stringify(json);
  fetch("/submit", {
    method: "POST",
    body,
  })
  .then(async function (response) {
    let newData = await response.json();
    refreshInfo(newData);
    console.log(newData);
  });
  return false;
};

const remove = function (e) {
  
  e.preventDefault();
  
  const id = "aaa"
  const json = { 
     id: id
  }  
  const body = JSON.stringify(json);
  fetch("/remove", {
    method: "POST",
    body,
  })
  
  
  return false;
}

function refreshInfo(newData) {
  const board = document.getElementById("heldData");
  board.innerHTML = ""
  
  newData.forEach((element, index) => {
    board.innerHTML +=
      "<tr><td>" + element.month + "</td><td>"
      + element.day + "</td><td>"
      + element.year + "</td><td>"
      + " was " + element.yearsPast + " years ago" + "</td><td>"
      + "<button type='button'>remove</button> </td></tr>"
  })
  
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};


