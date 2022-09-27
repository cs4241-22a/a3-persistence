let global_username = "";

window.onload = function () {

    document.getElementById("addResponseBlock").style.display = "none";
    document.getElementById("editResponseBlock").style.display = "none";

    fetch('/getUsername', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        return res.json();
    }).then(json => {
        let username = json.username;
        global_username = username;
        let tableTitle = document.getElementById("tableTitle");
        if (tableTitle != null) {
            tableTitle.innerHTML= global_username+ "'s TDEE Calculations";
        }
        console.log("Username is " + username);
        if (username == null || username === "") {
            window.location.replace("/login.html");
        }
    })


    setTimeout(function () {
        updateUserTable();
    }, 1000);
    const signOut = document.getElementById("signOutButton");
    signOut.onclick = signOutFunction;

    document.getElementById("addResponseButton").onclick = function(){
        document.getElementById("addResponseBlock").style.display = "block";
        document.getElementById("editResponseBlock").style.display = "none";
    }

}

const signOutFunction = function () {
    fetch('/signOut', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        return res.json();
    }).then(json => {
        let signOutSuccess = json.signOutSuccess;
        if (signOutSuccess) {
            console.log("Signing out succeed");
            window.location.replace("/login.html");
        }
    })
}


function updateUserTable() {
    let table = document.getElementById("response");
    table.innerHTML = '<thead><tr><th scope="col">Gender</th><th scope="col">Age</th><th scope="col">Weight</th><th scope="col">Height</th><th scope="col">Activity</th><th scope="col">TDEE</th><th scope="col">Edit</th><th scope="col">Delete</th></tr></thead>'
    const jsonData = {
        username: global_username
    }

    fetch('/getTableData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
    }).then(res => {
        return res.json();
    }).then(json => {
        let rowIndex = 0;
        for (let rowData of json.rows.response) {

            let row = table.insertRow(-1);
            let gender = row.insertCell(0);
            let age = row.insertCell(1);
            let weight = row.insertCell(2);
            let height = row.insertCell(3);
            let activity = row.insertCell(4);
            let tdee = row.insertCell(5);
            let editCell = row.insertCell(6);
            let dltCell = row.insertCell(7);

            row.cells[0].innerHTML = rowData.gender;
            row.cells[1].innerHTML = rowData.age;
            row.cells[2].innerHTML = rowData.weight;
            row.cells[3].innerHTML = rowData.height;
            row.cells[4].innerHTML = rowData.activity;
            row.cells[5].innerHTML = tdeeCalculation(rowData.gender, rowData.age,rowData.weight, rowData.height, rowData.activity);
            row.cells[6].innerHTML = '<button class="btn btn-warning" onclick="editRow(' + rowIndex + ')">Edit</button>';
            row.cells[7].innerHTML = '<button class="btn btn-danger" onclick="deleteRow(' + rowIndex + ')">Delete</button>';

            rowIndex++;
        }
    })
}
function showEditBlock() {
    document.getElementById("addResponseBlock").style.display = "none";
    document.getElementById("editResponseBlock").style.display = "block";
}
function editRow(rowIndex) {
    showEditBlock();
    let table = document.getElementById("response");
    let row = table.rows[rowIndex+1];

    document.getElementById('editgender').value = row.cells[0].innerHTML;
    document.getElementById('editage').value = row.cells[1].innerHTML;
    document.getElementById('editweight').value = row.cells[2].innerHTML;
    document.getElementById('editheight').value = row.cells[3].innerHTML;
    document.getElementById('editactivity').value = row.cells[5].innerHTML;
    document.getElementById('hiddenRowIndex').value = rowIndex;

}

function editSubmit() {
    const age = document.getElementById('editgender').value;
    const activity = document.getElementById('editage').value;
    const gender = document.getElementById('editweight').value;
    const weight = document.getElementById('editheight').value;
    const height = document.getElementById('editactivity').value;
    const tdee = tdeeCalculation(gender, age, weight, height,activity);
    const rowIndex = document.getElementById('hiddenRowIndex').value;

    if (rowIndex === "") {
        alert("Please press the 'Edit' button on a row to edit its data.");
        return false;
    }
    if (age.trim() === '' || activity.trim() === '' || gender.trim() === '' || weight.trim() === '' || height.trim() === '') {
        alert("To edit, please answer all questions")
        return false;
    } else {
        const jsonData = {
            index: rowIndex,
            username: global_username,
            age: age,
            gender: gender,
            activity: activity,
            weight: weight,
            height: height,
            tdee: tdee,
        }

        fetch('/edit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log("Data edited success");
        })

        setTimeout(function () {
            updateUserTable();
        }, 1000);

        document.getElementById('editage').value = "";
        document.getElementById('editgender').value = "";
        document.getElementById('editactivity').value = "";
        document.getElementById('editweight').value = "";
        document.getElementById('editheight').value = "";
        document.getElementById('hiddenRowIndex').value = "";
        closeAllBlocks();
        return true;
    }
}
function closeAllBlocks() {
    document.getElementById("addResponseBlock").style.display = "none";
    document.getElementById("editResponseBlock").style.display = "none";
}

function tdeeCalculation(gender, age, weight, height, activity) {
    let tdee = 0;
    if (gender === "Female"){
        tdee = (665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activity + 250
    }
    else{
        tdee = (66 + (13.7 * weight) + (5 * height) - (6.8 * age)) * activity + 250
    }

    return tdee;
}

const submit = function () {
    
    const age = document.getElementById('age').value;
    const activity = document.getElementById('activity').value;
    const gender = document.getElementById('gender').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const tdee = tdeeCalculation(gender, age, weight, height,activity);


    if (age.trim() === '' || activity.trim() === '' || gender.trim() === '' || weight.trim() === '' || height.trim() === '') {
        alert("Please answer all questions.");
        return false;
    } else {
        const jsonData = {
            username: global_username,
            age: age,
            gender: gender,
            activity: activity,
            weight: weight,
            height: height,
            tdee: tdee,
        }

        fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log("Data uploaded")
        })

        setTimeout(function () {
            updateUserTable();
        }, 1000);

        clearForm();
        closeAllBlocks();
        return true;
    }
}

function clearForm() {
    document.getElementById('age').value = "";
    document.getElementById('gender').value = "";
    document.getElementById('activity').value = "";
    document.getElementById('weight').value = "";
    document.getElementById('height').value = "";
}

function deleteRow(rowIndex) {
    let confirmDelete = confirm("Please confirm you would like to delete this row. Changes are irreversible!");
    if (confirmDelete) {
        const json = {
            username: global_username,
            deletingItem: rowIndex
        }

        console.log("Deleting row " + rowIndex);
        fetch('/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log("response deleted");
            setTimeout(function () {
                updateUserTable();
            }, 1000);
        })
    }
}
