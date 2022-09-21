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
            tableTitle.innerHTML="Response Table for: " + global_username;
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

function showEditBlock() {
    document.getElementById("addResponseBlock").style.display = "none";
    document.getElementById("editResponseBlock").style.display = "block";
}

function closeAllBlocks() {
    document.getElementById("addResponseBlock").style.display = "none";
    document.getElementById("editResponseBlock").style.display = "none";
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
    table.innerHTML = '<thead><tr><th scope="col">Name</th><th scope="col">Academic Year</th><th scope="col">Gender</th><th scope="col">Daily Calories</th><th scope="col">Fiber Recommended Daily (g)</th><th scope="col">Favorite Fruit</th><th scope="col">Edit</th><th scope="col">Delete</th></tr></thead>'
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

            let name = row.insertCell(0);
            let year = row.insertCell(1);
            let gender = row.insertCell(2);
            let calories = row.insertCell(3);
            let fiber = row.insertCell(4);
            let fruit = row.insertCell(5);
            let editCell = row.insertCell(6);
            let deleteCell = row.insertCell(7);

            row.cells[0].innerHTML = rowData.name;
            row.cells[1].innerHTML = rowData.year;
            row.cells[2].innerHTML = rowData.gender;
            row.cells[3].innerHTML = rowData.calories;
            row.cells[4].innerHTML = getFiber(rowData.calories);
            row.cells[5].innerHTML = rowData.fruit;
            row.cells[6].innerHTML = '<button class="btn btn-dark" onclick="editRow(' + rowIndex + ')">Edit</button>';
            row.cells[7].innerHTML = '<button class="btn btn-dark" onclick="deleteRow(' + rowIndex + ')">Delete</button>';

            rowIndex++;
        }
    })
}

function getFiber(calories) {

    return calories * 14 / 1000;
}



const submit = function () {
    
    const name = document.getElementById('name').value;
    const year = document.getElementById('year').value;
    const gender = document.getElementById('gender').value;
    const calories = document.getElementById('calories').value;
    const fiber = getFiber(calories);
    const fruit = document.getElementById('fruit').value;

    if (name.trim() === '' || year.trim() === '' || gender.trim() === '' || calories.trim() === '' || fruit.trim() === '') {
        alert("Please answer all questions.");
        return false;
    } else {
        const jsonData = {
            username: global_username,
            name: name,
            year: year,
            gender: gender,
            calories: calories,
            fiber: fiber,
            fruit: fruit
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
    document.getElementById('name').value = "";
    document.getElementById('year').value = "";
    document.getElementById('gender').value = "";
    document.getElementById('calories').value = "";
    document.getElementById('fruit').value = "";
}

function editRow(rowIndex) {
    showEditBlock();
    let table = document.getElementById("response");
    let row = table.rows[rowIndex+1];

    document.getElementById('editname').value = row.cells[0].innerHTML;
    document.getElementById('edityear').value = row.cells[1].innerHTML;
    document.getElementById('editgender').value = row.cells[2].innerHTML;
    document.getElementById('editcalories').value = row.cells[3].innerHTML;
    document.getElementById('editfruit').value = row.cells[5].innerHTML;
    document.getElementById('hiddenRowIndex').value = rowIndex;
   
}

function editClicked() {
    const name = document.getElementById('editname').value;
    const year = document.getElementById('edityear').value;
    const gender = document.getElementById('editgender').value;
    const calories = document.getElementById('editcalories').value;
    const fiber = getFiber(calories);
    const fruit = document.getElementById('editfruit').value;
    const rowIndex = document.getElementById('hiddenRowIndex').value;

    if (rowIndex === "") {
        alert("You must first select 'Edit This Row' on a row to edit its data!");
        return false;
    }

    if (name.trim() === '' || year.trim() === '' || gender.trim() === '' || calories.trim() === '' || fruit.trim() === '') {
        alert("Please answer all questions")
        return false;
    } else {
        const jsonData = {
            index: rowIndex,
            username: global_username,
            name: name,
            year: year,
            gender: gender,
            calories: calories,
            fiber: fiber,
            fruit: fruit
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

        document.getElementById('editname').value = "";
        document.getElementById('edityear').value = "";
        document.getElementById('editgender').value = "";
        document.getElementById('editcalories').value = "";
        document.getElementById('editfruit').value = "";
        document.getElementById('hiddenRowIndex').value = "";
        closeAllBlocks();
        return true;
    }
}

function deleteRow(rowIndex) {
    let confirmDelete = confirm("Are you sure you'd like to delete this row?");
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
