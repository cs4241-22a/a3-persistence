const submitfn = function () {
    console.log('submit fn');
    const verityUserID = document.querySelector("#gID");
    if(verityUserID==null){
        document.getElementById("loginwarning").innerHTML = "please log in before submitting";
    }
    else{
        const userID = document.querySelector("#gID"); 
        const taskIn = document.querySelector("#taskInput");
        const daysIn = document.querySelector("#daysInput");
        const startDate = new Date().toLocaleDateString();
        const desIn = document.querySelector("#descriptionInput");
        const json = {
            userID: userID.value,
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
    }
    return false
}

const deleteByTask = function () {
    console.log("clear")
    const userID = document.querySelector("#gID");
        const taskName = document.querySelector("#deleteInput");
    const json = {
        userID: userID.value,
        task: taskName.value,
    };
    const body = JSON.stringify(json);
    fetch('/tasks/deleteByName', {
        method: "delete",
        headers: {"Content-Type": "application/json"},
        body,
    }).then(
        console.log('deleted')
    ).catch(err => {
        console.log(err);
    });
}


const init = async function() {
    console.log('get all');
    const userID = document.querySelector("#gID");
    const json = {
        userID: userID.value,
    };
    const body = JSON.stringify(json);
    await fetch('/tasks/getOne', {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body,
    }).then( async (res) => {
        let jsonRes = await res.json();
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

    // Append a text node to the cell
    const taskInText = document.createTextNode(row.task);
    const daysInText = document.createTextNode(row.days);
    const startDateText = document.createTextNode(row.startDate);
    const desInText = document.createTextNode(row.description);
    
    // Insert a cell at the end of the row
    newRow.insertCell().appendChild(taskInText);
    newRow.insertCell().appendChild(daysInText);
    newRow.insertCell().appendChild(startDateText);
    newRow.insertCell().appendChild(desInText);
}

window.onload = function () {
    init();
}