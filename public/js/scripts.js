function generateTable() {
    fetch("/table", {
      method: "POST",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        refreshTable(json);
      });
  }
  
  function refreshTable(data) {
    let table = document.querySelector("table");
  
    if (table === null) {
      table = document.createElement("table");
    }
  
    let tBody = table.createTBody();
    let tHead = table.createTHead();
    let headerRow = tHead.insertRow();
  
    let tableColumns = [
      "Game",
      "Character",
      "Kills",
      "Assists",
      "Deaths",
      "KDA",
      "Edit",
      "Delete",
    ];
  
    for (let title of tableColumns) {
      let th = document.createElement("th");
      let headerText = document.createTextNode(title);
  
      if (title === "Game" || title === "Character") {
        th.classList.add("title-field");
      } else {
        th.classList.add("number-button-field");
      }
      th.appendChild(headerText);
      headerRow.appendChild(th);
    }
  
    for (let element of data) {
      let row = tBody.insertRow();
      for (let key of Object.keys(data[0])) {
        if (key !== "_id" && key !== "creator") {
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
      }
  
      let editButtonCell = row.insertCell();
      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-warning";
      const editBtnText = "Edit";
      editBtn.innerHTML = editBtnText;
      editBtn.onclick = () => {
        document.querySelector("#game").value = element.game;
        document.querySelector("#character").value = element.character;
        document.querySelector("#kills").value = element.kills;
        document.querySelector("#assists").value = element.assists;
        document.querySelector("#deaths").value = element.deaths;
        const saveBtn = document.querySelector("#Submit-Button");
        saveBtn.innerHTML = "Save Changes";
        saveBtn.onclick = (e) => {
          e.preventDefault();
          const game = document.querySelector("#game"),
            character = document.querySelector("#character"),
            kills = document.querySelector("#kills"),
            assists = document.querySelector("#assists"),
            deaths = document.querySelector("#deaths"),
            json = {
              id: element._id,
              game: game.value,
              character: character.value,
              kills: Number(kills.value),
              assists: Number(assists.value),
              deaths: Number(deaths.value),
            },
            body = JSON.stringify(json);
          fetch("/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              let table = document.querySelector("table");
              table.remove();
              refreshTable(json);
              resetForm();
              saveBtn.innerHTML = "Submit";
              saveBtn.onclick = submit;
            });
        };
      };
      editButtonCell.appendChild(editBtn);
  
      let deleteButtonCell = row.insertCell();
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger";
      const deleteBtnText = "Delete";
      deleteBtn.innerHTML = deleteBtnText;
      deleteBtn.onclick = () => {
        resetForm();
        const formBtn = document.querySelector("#Submit-Button");
        formBtn.onclick = submit;
        formBtn.innerHTML = "Submit";
        fetch("/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: element._id }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            let table = document.querySelector("table");
            table.remove();
            refreshTable(json);
          });
      };
      deleteButtonCell.appendChild(deleteBtn);
    }
    document.body.appendChild(table);
    table.classList.add("table", "table-responsive");
  }
  
  const submit = function (e) {
    e.preventDefault();
  
    const game = document.querySelector("#game"),
      character = document.querySelector("#character"),
      kills = document.querySelector("#kills"),
      assists = document.querySelector("#assists"),
      deaths = document.querySelector("#deaths"),
      json = {
        game: game.value,
        character: character.value,
        kills: Number(kills.value),
        assists: Number(assists.value),
        deaths: Number(deaths.value),
      },
      body = JSON.stringify(json);
  
    fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        let table = document.querySelector("table");
        table.remove();
        refreshTable(json);
        resetForm();
      });
  
    return false;
  };
  
  window.onload = function () {
    generateTable();
    const button = document.querySelector("#Submit-Button");
    button.onclick = submit;
  };
  
  function resetForm() {
    document.querySelector("form").reset();
  }
  