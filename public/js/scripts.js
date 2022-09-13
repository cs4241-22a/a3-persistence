// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

function buildListing(json) {
    // Get a reference to the table
    let tableRef = document.getElementById("my-table");

    document.getElementById("todo-listing").innerHTML = ""; // reset table

    json.forEach((item) => {
        // fill table
        // Insert a row at the end of the table
        let newRow = tableRef.insertRow(-1);
        newRow.id = item["guid"];

        // ---------------------
        // --- CHECKBOX CELL ---
        // ---------------------
        // Insert a cell in the row at index 0
        let statusCell = newRow.insertCell(0);

        // Append a checkbox node to the cell
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = "value";
        checkbox.checked = item["status"] === 1;
        statusCell.appendChild(checkbox);

        // ---------------------
        // --- TASK NAME CELL ---
        // ----------------------
        // Insert a cell in the row at index 1
        let newCell = newRow.insertCell(1);

        // Append a text node to the cell
        let newText = document.createTextNode(item["task"]);
        newCell.appendChild(newText);

        // --------------------------
        // --- DAYS TILL DUE CELL ---
        // --------------------------
        // Insert a cell in the row at index 2
        let dueCell = newRow.insertCell(2);

        // Append a text node to the cell
        let dueNode = document.createTextNode(new Date(item["other"]).toLocaleDateString());
        dueCell.appendChild(dueNode);

        // --------------------------
        // --- DELETE BUTTON CELL ---
        // --------------------------
        // Insert a cell in the row at index 3
        let deleteButtonCell = newRow.insertCell(3);
        // Append a text node to the cell
        let buttonElement = document.createElement("button");
        buttonElement.textContent = "X";
        buttonElement.classList.add("delete-button");
        deleteButtonCell.appendChild(buttonElement);
    });
}

const submitTask = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

    const input = document.querySelector("#newtask-input"),
        input_days = document.querySelector("#priority"),
        json = { action: "new", task: input.value, days_to_complete: input_days.value },
        body = JSON.stringify(json);

    fetch("/submit", {
        method: "POST",
        body,
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            buildListing(json);
        });

    return false;
};

// requests a change to a task of the given GUID
const submitChange = function (guid, deletion = false) {
    function getAction() {
        if (deletion) {
            return "delete";
        } else return "edit";
    }

    const json = { action: getAction(), task_guid: guid },
        body = JSON.stringify(json);

    fetch("/edit", {
        method: "POST",
        body,
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            buildListing(json); // todo, kinda unnecessary?
        });

    return false;
};

window.onload = function () {
    const button = document.querySelector("button");
    button.onclick = submitTask;

    const body = JSON.stringify({ action: "fetch" });
    fetch("/edit", {
        method: "POST",
        body,
    })
        .then((response) => response.json())
        .then((json) => {
            buildListing(json);
        });

    // notify server when any checkbox is touched
    document.querySelector("#my-table").onclick = function (ev) {
        if (ev.target.type === "checkbox") {
            if (ev.target.value) {
                submitChange(ev.target.parentElement.parentElement.id);
            }
        } else if (ev.target.classList.contains("delete-button")) {
            submitChange(ev.target.parentElement.parentElement.id, true);
        }
    };
};