const submitfn = function () {
    console.log('submit fn');
    const userID = 'testUser'; // TODO Change this to real userID
    const taskIn = document.querySelector("#taskInput");
    const daysIn = document.querySelector("#daysInput");
    const startDate = new Date().toLocaleDateString();
    const desIn = document.querySelector("#descriptionInput");
    const json = {
        userID: userID,
        task: taskIn.value,
        days: daysIn.value,
        startDate: startDate,
        description: desIn.value,
    };
    const body = JSON.stringify(json);
    fetch('/tasks/post', {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body,
    }).then(
        // TODO add row
        console.log('perform add row here')
    ).catch(err => {
        console.log(err);
    });

    return false
}

const init = async function() {
    console.log('get all');
    const userID = 'testUser'; // TODO Change this to real userID
    const json = {
        userID: userID,
    };
    const body = JSON.stringify(json);
    await fetch('/tasks/getOne', {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body,
    }).then( (res) => {
        let jsonRes = res.json();
        for (let i in jsonRes) {
            addRow(jsonRes[i])
        }
    }).catch(err => {
        console.log(err);
    });
}

function addRow(row) {
    var tbodyRef = document.getElementById('tTable').getElementsByTagName('tbody')[0];

    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();

    // Insert a cell at the end of the row
    var newCell = newRow.insertCell();

    // Append a text node to the cell
    const taskInText = document.createTextNode(row.task);
    const daysInText = document.createTextNode(row.days);
    const startDateText = document.createTextNode(row.startDate);
    const desInText = document.createTextNode(row.description);

    newCell.appendChild(taskInText);
    newCell.appendChild(daysInText);
    newCell.appendChild(startDateText);
    newCell.appendChild(desInText);
}

window.onload = function () {
    init();
}