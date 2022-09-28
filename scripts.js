// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

// define variables that reference elements on our page
const entriesList = document.getElementById("entries");
const count = document.querySelector("form");
const introduction = document.getElementById("howdy");
const entryList = document.getElementById("entries");


function appendNewEntry(entry) {
  const newListItem = document.createElement("li");
  newListItem.innerText = entry[0] + " - " + entry[1];
  entriesList.appendChild(newListItem);
}

let fillPage = function (entries) {
  const ratingList = document.getElementById("ratings");
  while (ratingList.firstChild) {
    ratingList.removeChild(ratingList.firstChild);
  }

  for (let i = 0; i < entries.length; i++) {
    let entry = document.createElement("div");
    entry.className = "row";

    let ratingContainer = document.createElement("div");
    ratingContainer.className = "col";
    ratingContainer.innerText =
      entries[i].first + " - " + entries[i].second + "    ";

    let deleteB = document.createElement("button");
    deleteB.className = "material-icons";
    deleteB.innerText = "delete";

    let editB = document.createElement("button");
    editB.className = "material-icons";
    editB.innerText = "edit";

    deleteB.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(entries)
      fetch("/delete", {
        method: "POST",

        body: JSON.stringify({
          data: entries[i].first,
          index:i
          
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((entries) => {
          fillPage(entries);
        });
    });
     editB.addEventListener("click", event => {
      event.preventDefault();
       
     // let newEntry = [count.data, document.querySelector('input[type="text"][name="data"]:checked').value];
      
        alert ("Please enter new rating and restaurant ");
      let data = window.prompt("new restaurant:");
    let data2 = window.prompt("new rating:");
       console.log(data)
       console.log(data.value)
       console.log(data2)
      fetch("/update", {
        method: "POST",
        body: JSON.stringify({
          data: data,
          data2: data2,
          index: i
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(entries => {
          fillPage(entries);
        });
    });
    entry.appendChild(ratingContainer);
      ratingContainer.appendChild(deleteB);
    ratingList.appendChild(entry);
     ratingContainer.appendChild(editB);
  }
};

  
var el = document.getElementById('submit');
if(!el){
window.onload = function () {
  const submitButton = document.getElementById("submit-button");
  const restaurant = document.getElementById("data");
  const rating = document.getElementById("data2");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    let data = restaurant.value;
    let data2 = rating.value;
    console.log(data);

    fetch("/add", {
      method: "POST",
      body: JSON.stringify({
        data: data,
        data2: data2,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((entries) => {
        fillPage(entries);
      });
  });

  fetch("/getRatings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((entries) => {
      fillPage(entries);
    });
};
}
// logoutButton.addEventListener("click", (event) => {
//   event.preventDefault();

//   fetch("/logout", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => {
//       if (json.logout) {
//         window.location.href = "/";
//       } else {
//         window.alert("You are already logged out.");
//         window.location.href = "/";
//       }
//     });
// });

// // Add some Javascript code here, to run on the front end.
// const submit = function (e) {
//   let d1 = document.getElementById("data").value;
//   let d2 = document.getElementById("data2").value;

//   let json = {
//     data: d1,
//     data2: d2,

//     init: "",
//   };
//   let body = JSON.stringify(json);
//   fetch("/add", {
//     method: "POST",
//     body,
//   }).then(async function (response) {
//     let tData = await response.json();
//     makeTable(tData);
//     console.log(tData);
//   });
//   return false;
// };
// function makeTable(tData) {
//   const table = document.getElementById("table");
//   table.innerHTML = "<form>";
//   table.innerHTML =
//     "<form><tr><th>first</th><th>middle</th><th>last</th><th>initials</th>";

//   tData.forEach((element, i) => {
//     table.innerHTML +=
//       "<tr id=entry " +
//       i +
//       "><td> " +
//       element.data +
//       "</td><td>" +
//       element.data2 +
//       "</td><td>" +

//       element.init +
//       "</td><td>" +
//       "<button onclick=deleteRow(" +
//       i +
//       ")>Delete</button></td></tr>";
//   });
//   table.innerHTML += "</form>";
//   return false;
// }
// function deleteRow(ind) {
//   console.log(ind);
//   let json = {
//     index: ind,
//   };
//   let body = JSON.stringify(json);
//   fetch("/delete", {
//     method: "POST",
//     body,
//   }).then(async function (response) {
//     let dData = await response.json();
//     makeTable(dData);
//     console.log(dData);
//   });
// }

// window.onload = function () {
//   const button = document.getElementById("submitButton");
//   button.onclick = submit;
// };
// console.log("Welcome to assignment 2!");
