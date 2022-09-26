const submit = function (e) {
  e.preventDefault();
  const json = {
      category: document.getElementById("category").value,
      partNumber: Number(document.getElementById("partNumber").value),
      partName: document.getElementById("partName").value,
      installed: document.getElementById("installed").checked,
      price: Number(document.getElementById("price").value),
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      let table = document.querySelector("table");
      table.remove();
      refreshTable(json);
      resetInput();
    });

  return false;
};

function loadTable() {
  fetch("/table", {
    method: "POST",
  })
    .then(function (res) {
      return res.json();
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
    "Category",
    "Part Number",
    "Part Name",
    "Installed",
    "Price",
    "Edit",
    "Delete",
  ];

  for (let title of tableColumns) {
    let th = document.createElement("th");
    let headerText = document.createTextNode(title);
    th.appendChild(headerText);
    headerRow.appendChild(th);
  }

  for (let element of data) {
    let row = tBody.insertRow();
    for (let key of Object.keys(data[0])) {
      if (key !== "_id" && key !== "user") {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }

    let editBtnCell = row.insertCell();
    const editBtn = document.createElement("div");
    editBtn.className = "btn";
    editBtn.innerHTML = "Edit";
    editBtn.onclick = () => {
      document.querySelector("#category").value = element.category;
      document.querySelector("#partNumber").value = element.partNumber;
      document.querySelector("#partName").value = element.partName;
      document.querySelector("#installed").checked = element.installed;
      document.querySelector("#price").value = element.price;
      const saveBtn = document.querySelector("#submit");
      saveBtn.innerHTML = "Save Changes";
      saveBtn.onclick = (e) => {
        e.preventDefault();
        const category = document.querySelector("#category"),
          partNumber = document.querySelector("#partNumber"),
          partName = document.querySelector("#partName"),
          installed = document.querySelector("#installed"),
          price = document.querySelector("#price"),
          json = {
            id: element._id,
            category: category.value,
            partNumber: Number(partNumber.value),
            partName: partName.value,
            installed: installed.checked,
            price: Number(price.value),
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
            resetInput();
            saveBtn.innerHTML = "Submit";
            saveBtn.onclick = submit;
          });
      };
    };
    editBtnCell.appendChild(editBtn);

    let deleteBtnCell = row.insertCell();
    const deleteBtn = document.createElement("div");
    deleteBtn.className = "btn";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.onclick = () => {
      resetInput();
      const formBtn = document.getElementById("submit");
      formBtn.onclick = submit;
      formBtn.innerHTML = "Submit";
      fetch("/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: element._id }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (json) {
          let table = document.querySelector("table");
          table.remove();
          refreshTable(json);
        });
    };
    deleteBtnCell.appendChild(deleteBtn);
  }

  document.getElementById("bodyPannel").appendChild(table);
}

function resetInput() {
  document.getElementById("category").value = "";
  document.getElementById("partNumber").value = "";
  document.getElementById("partName").value = "";
  document.getElementById("installed").checked = false;
  document.getElementById("price").value = "";
}

window.onload = function () {
  loadTable();
  const button = document.getElementById("submit");
  button.onclick = submit;
};
