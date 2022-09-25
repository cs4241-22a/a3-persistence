console.log("Welcome to assignment 3!");
let ids = [];
let idx_edited = -1;

function makeTable(json) {
  let table = document.getElementById("todo-table");
  document.getElementById("table-body").innerHTML = `<tr>
        <th>Status</th>
        <th>Todo</th>
        <th>Due</th>
        <th>Priority</th>
        <th>Tag</th>
      </tr>`;

  json.forEach((item) => {
    ids.push(item._id);
    console.log(ids);
    let newTodo = table.insertRow(-1);

    let deleteCell = newTodo.insertCell(0);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Done";
    deleteButton.classList.add("deleteTodo");
    deleteCell.appendChild(deleteButton);

    let todo = newTodo.insertCell(1);
    let todoText = document.createTextNode(item["todo"]);
    todo.contentEditable = "true";
    todo.appendChild(todoText);

    let duedate = newTodo.insertCell(2);
    let due = document.createTextNode(item["due"]);
    duedate.contentEditable = "true";
    duedate.appendChild(due);

    let priority = newTodo.insertCell(3);
    let priorityText = document.createTextNode(item["priority"]);

    if (item["priority"] === "RED") {
      priorityText = document.createElement("span");
      priorityText.classList.add("dotRed");
    } else if (item["priority"] === "YELLOW") {
      priorityText = document.createElement("span");
      priorityText.classList.add("dotYellow");
    } else if (item["priority"] === "GREEN") {
      priorityText = document.createElement("span");
      priorityText.classList.add("dotGreen");
    }
    priority.appendChild(priorityText);

    let tag = newTodo.insertCell(4);
    let tagText = document.createTextNode(item["tag"]);
    tag.appendChild(tagText);

    let editCell = newTodo.insertCell(5);
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("editTodo");
    editCell.appendChild(editButton);
  });

  var el = document.getElementsByTagName("td");
  for (var i = 0; i < el.length; i++) {
    if (el[i].innerHTML == "webware") {
      el[i].className += " " + "webware";
    } else if (el[i].innerHTML === "deepLearning") {
      el[i].className += " " + "deepLearning";
    } else if (el[i].innerHTML === "work") {
      el[i].className += " " + "work";
    } else if (el[i].innerHTML === "MQP") {
      el[i].className += " " + "MQP";
    } else if (el[i].innerHTML === "businessIntelligence") {
      el[i].className += " " + "businessIntelligence";
    }
  }

  const doneBtns = document.getElementsByClassName("deleteTodo");
  let index = 0;
  for (let btn of doneBtns) {
    btn.onclick = deleteTodo;
    btn.id = "doneBtn-" + index;
    index++;
  }

  const editBtns = document.getElementsByClassName("editTodo");
  let index_2 = 0;
  for (let btn of editBtns) {
    btn.onclick = editTodo;
    btn.id = "editBtn-" + index_2;
    index_2++;
  }
}

const getTable = function () {
  
  fetch("/table", {
    method: "GET",
  }).then(async (response) => {
    console.log(response)
    makeTable(await response.json());
  })
};


const createTodo = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const input = document.getElementById("todo"),
    due = document.getElementById("due"),
    tag = document.getElementById("tag"),
    json = { todo: input.value, tag: tag.value, due: due.value },
    body = JSON.stringify(json);

  fetch("/table", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  }).then(async (response) => {
    let obj = await response.json();
    if (obj.acknowledged) {
      fetch("/table/" + obj.insertedId, {
        method: "GET",
      }).then(async (response) => {
        let newTask = await response.json();
        fetch("/table", {
          method: "GET",
        }).then(async (response) => {
          let obj = await response.json();
          // obj.push(newTask)
          makeTable(obj);
        });
      });
    }
  });

  document.getElementById("todo").value = "";
  document.getElementById("due").value = "";
  document.getElementById("tag").value = "";

  return false;
};

const deleteTodo = function (e) {
  console.log(e);
  let idx = e.target.parentNode.parentNode.rowIndex - 1;
  console.log(idx);
  fetch("/table/" + ids[idx], {
    method: "DELETE",
  }).then(async (response) => {
    let obj = await response.json();
    document.getElementById("todo-table").deleteRow(idx+1);
    ids.splice(idx, 1);
  });
  return false;
};

const editTodo = function (e) {
  console.log(e);
  let idx = e.target.parentNode.parentNode.rowIndex - 1; 
  let table = document.getElementById('todo-table')
  const row = table.rows.item(idx + 1)
  
  let todo = row.cells.item(1).innerHTML
  console.log(todo)
  let due = row.cells.item(2).innerHTML
  let json = {"todo":todo,"tag":"N/A","due":due};
  let body = JSON.stringify(json);
  console.log(idx)
  console.log(json)
  fetch("/table/" + ids[idx], {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body,
  }).then(async (response) => {
    getTable()
  })

  return false;
};

// function editRow(task) {
//   const idx = ids.indexOf(task._id) + 1;
//   const table = document.getElementById("todo-table");
//   const row = table.rows.item(idx);
//   let newTodo = row.cells.item(1).innerHTML;
//   let newDue = row.cells.item(2).innerHTML;
// }

window.onload = function () {
  getTable();
  // getLogin();
  const button = document.getElementById("createTodo");
  button.onclick = createTodo;
};
