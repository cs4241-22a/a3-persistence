function clearEntry() {
  document.getElementById("gName").value = "";//game name
  document.getElementById("dBought").value = "";//date bought
  document.getElementById("dCompleted").value = "";//date completed
  document.getElementById("gameToDelete").value = "";
}

const getList = function () {
  fetch("/get-game", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      reloadList(data);
    })
    .catch((err) => console.log(err));

  return false;
};

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  let game = document.getElementById("gName").value,
    dateBought = document.getElementById("dBought").value,
    dateCompleted = document.getElementById("dCompleted").value,

    json = {
      game: game,
      dateBought: dateBought,
      dateCompleted: dateCompleted,
    };

  let body = JSON.stringify(json);
  const jsonParsed = JSON.parse(body);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(function (response) {
    response.text().then(function (json) {
      console.log("Body: ", body);
      let table = document.getElementById("games"),
        newRow = table.insertRow(-1),
        newGame = newRow.insertCell(0),
        newDateBought = newRow.insertCell(1),
        newDateCompleted = newRow.insertCell(2),
        newDelete = newRow.insertCell(3);
      
      newGame.innerHTML = jsonParsed.game;
      newDateBought.innerHTML = jsonParsed.dateBought;
      newDateCompleted.innerHTML = jsonParsed.dateCompleted;
      newDelete.innerHTML= '<input type="button" value="Delete" onclick="deleteRow(this)"/>';
      console.log("table:", table);
      console.log(json);
    });
  });

  return false;
};

const updateList = function (e) {
  e.preventDefault();

  let gameLibrary = document.getElementById("games");
  let body = JSON.stringify(gameLibrary);
  console.log(body);

  fetch("/updateList", {
    method: "POST",
    body,
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let gameLibrary = document.getElementById("games");
      gameLibrary.innerHTML =
        "<thead><tr><th>Game</th><th>Date Bought</th><th>Date Completed</th><th>Remove?</th><tr></thead>";

      json.forEach((thing) => {
        gameLibrary.innerHTML =
          gameLibrary.innerHTML +
          `<tr><td>${thing.game}</td><td>${thing.dateBought}</td><td>${thing.dateCompleted}</td></tr>`;
      });
    });
};

window.onload = function () {
  const add = document.getElementById("submit");
  add.onclick = submit;
};

function deleteRow(r)
{
var i=r.parentNode.parentNode.rowIndex;
document.getElementById('games').deleteRow(i);
};
