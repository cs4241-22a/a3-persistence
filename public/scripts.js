// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");
const submit = function (e) {
  const name = document.querySelector("#name").value;
  const weap = document.querySelector("#weapon").value;
  const elem = document.querySelector("#element").value;
  const lev = document.querySelector("#level").value;

  let json = { name: name, weapon: weap, element: elem, level: lev };
  console.log(json);
  let body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then(async function (response) {
      let newData = await response.json();
      refreshInfo(newData);
      console.log(newData);
    })
    .then(function () {
      alert("Successfully added character");
    });
  return false;
};

const deleteFunc = function (e) {
    const table = document.getElementById("[id]");
    const delButton = document.querySelector("#buttonDelete");
    const rowIndex = delButton.parentNode.parentNode.rowIndex;
    table.deleteRow(rowIndex);
};

function refreshInfo(newData) {
  const table = document.getElementById("table");
  table.innerHTML =
    "<tr><th>Name</th><th>Weapon</th><th>Element</th><th>Level</th><th>Delete</th></tr>";

  newData.forEach((elements, index) => {
    table.innerHTML +=
      "<tr id=entry" +
      index +
      "><td>" +
      elements.name +
      "</td><td>" +
      elements.weapon +
      "</td><td>" +
      elements.element +
      "</td><td>" +
      elements.level +
      "</td><td>" +
      "<button onclick=deleteSelections(" +
      index +
      ") class=buttonDelete" +
      ">Delete</button>" +
      "</td></tr>";
  });
}

function deleteSelections(index) {
  document.getElementById("entry" + index).remove();
}

function selectedRow() {
  var table = document.getElementById("table");
  for (var i = 0; i < table.rows.length; i++) {
    if (i > 0) {
      table.rows[i].onclick = function () {
        if (!this.selected) {
          this.classList.add("selected-row");
          this.selected = true;
        } else {
          this.classList.remove("selected-row");
          this.selected = false;
        }
      };
    }
  }
}

window.onload = function () {
  const button = document.querySelector("#buttonSubmit");
  button.onclick = submit;
};
