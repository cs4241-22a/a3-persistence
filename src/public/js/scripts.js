const getRowData = function () {
  const playerNameInput = document.querySelector("#playerName");
  const playerScoreInput = document.querySelector("#playerScore");
  const winResultInput = document.querySelector("#winResult");

  return {
    playerName: playerNameInput.value,
    playerScore: parseInt(playerScoreInput.value),
    winResult: winResultInput.checked,
  };
};

const addEntry = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const rowData = getRowData();
  const body = JSON.stringify({ ...rowData });

  fetch("/api/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then(() => {
    $("#resultsTable").find("tr:gt(0)").remove();
    updateTableWithData();
  });

  return false;
};

const deleteEntry = function (objectId) {
  const body = JSON.stringify({ objectId });

  fetch("/api/score", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then(() => {
    $("#resultsTable").find("tr:gt(0)").remove();
    updateTableWithData();
  });

  return false;
};

const modifyEntry = function (objectId) {
  const newData = getRowData();
  const body = JSON.stringify({ objectId, newData });

  fetch("/api/score", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then(() => {
    $("#resultsTable").find("tr:gt(0)").remove();
    updateTableWithData();
  });

  return false;
};

const updateTableWithData = function () {
  const table = document.querySelector("#resultsTable > tbody");
  fetch("/api/scores", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        const row = table.insertRow();
        const playerNameCell = row.insertCell();
        const playerScoreCell = row.insertCell();
        const winResultCell = row.insertCell();
        const modifyCell = row.insertCell();
        const deleteCell = row.insertCell();
        playerNameCell.innerHTML = element["playerName"];
        playerScoreCell.innerHTML = element["playerScore"];
        winResultCell.innerHTML = element["winResult"];
        modifyCell.setAttribute("class", "modifyCell");
        deleteCell.setAttribute("class", "deleteCell");
        modifyCell.setAttribute("onclick", `modifyEntry("${element["_id"]}")`);
        deleteCell.setAttribute("onclick", `deleteEntry("${element["_id"]}")`);
      });
    });
};

window.onload = function () {
  const button = document.querySelector("#addEntry");
  button.onclick = addEntry;
  updateTableWithData();
};
