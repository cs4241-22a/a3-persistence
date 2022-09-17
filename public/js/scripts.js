let numResponse = 1;

const submit = function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const year = document.getElementById("year").value;
  const sex = document.getElementById("sex").value;
  const calories = document.getElementById("calories").value;
  const favoritefruit = document.getElementById("favoritefruit").value;

  if (name.trim() === "" || calories.trim() === "" || favoritefruit.trim() === "") {
    alert("Please answer all questions.");
    return false;
  } else {
    numResponse++;

    const jsonData = {
      responseNum: numResponse,
      name: name,
      year: year,
      sex: sex,
      calories: calories,
      favoritefruit: favoritefruit,
    };

    let body = JSON.stringify(jsonData);

    fetch("/submit", {
      method: "POST",
      body,
    }).then(function (response) {
      update();
      clear();
    });

    return true;
  }
};

function update() {
  let table = document.getElementById("responses");
  table.innerHTML =
    "<tr><th>Response #</th><th>Name</th><th>Academic Year</th><th>Sex</th><th>Calories Consume Daily</th><th>Amount of Fiber Recommended Daily (g)<sup><a href='#fiberinfo'>2</a></sup></th><th>Favorite Fruit?</th><th>Delete Response</th></tr>";
  fetch("/getResponses", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (json) {
      let index = 0;
      for (let response of json) {
        
        response.responseNum = index;
        let row = table.insertRow(-1);
        console.log(index);
        let responseNum = row.insertCell(0);
        let name = row.insertCell(1);
        let year = row.insertCell(2);
        let sex = row.insertCell(3);
        let calories = row.insertCell(4);
        let fiber = row.insertCell(5);
        let favoritefruit = row.insertCell(6);
        let modify = row.insertCell(7);

        response.responseNum = index + 1;
        
        row.cells[0].innerHTML = response.responseNum;
        row.cells[1].innerHTML = response.name;
        row.cells[2].innerHTML = response.year;
        row.cells[3].innerHTML = response.sex;
        row.cells[4].innerHTML = response.calories;
        row.cells[5].innerHTML = response.fiber;
        row.cells[6].innerHTML = response.favoritefruit;      
        row.cells[7].innerHTML =
          `<button class='deleteButton' onclick=deleteRow(${index})>Delete</button>`;
        index++;
        
      }
    });
}
function clear() {
  document.getElementById("name").value = "";
  document.getElementById("calories").value = "";
  document.getElementById("favoritefruit").value = "";
}
function deleteRow(rowIndex) {
  let confirmDelete = confirm(
    "Are you sure you want to delete this response?"
  );
  if (confirmDelete) {
    const json = {
      deletingResponse: rowIndex,
    };

    let body = JSON.stringify(json);
    fetch("/delete", {
      method: "POST",
      body,
    }).then(function () {
      update();
    });
  }
}
window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
  update();
};
