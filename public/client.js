// Add some Javascript code here, to run on the front end.

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()
    alert("submit")

    let fName = document.querySelector("#fName")
    let lName = document.querySelector("#lName")
    let phoneNum = document.querySelector("#phoneNum")
    let DOB = document.querySelector("#DOB")
    let json = {
        fName: fName.value,
        lname: lName.value,
        phoneNum: phoneNum.value,
        DOB: DOB.value,
        age: ""
    }
    let body = JSON.stringify(json)
    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(async function (response) {
            let newInfo = await response.json()
            refreshInfo(newInfo)
            console.log(newInfo)
        })

    return false
}

const remove = function (rowID) {
    alert("remove")

    let item = document.getElementById(rowID)
    let json = {
        id: rowID
    }
    let body = JSON.stringify(json)
    fetch('/remove', {
        method: 'POST',
        body
    })
        .then(async function (response) {
            if (response.status === 200) {
                alert("removed successfully")
            }
            else {
                alert("not removed")
            }
            let newInfo = await response.json()
            refreshInfo(newInfo)
            console.log(newInfo)
        })

    return false
}

function refreshInfo(newInfo) {
    document.getElementById("viewContacts").style.display = "block";

    let cols = [];

    for (let i = 0; i < newInfo.length; i++) {
        for (let k in newInfo[i]) {
            if (cols.indexOf(k) === -1) {

                // Push all keys to the array
                cols.push(k);
            }
        }
    }

    // Create a table element
    let table = document.createElement("table");
    table.setAttribute('border', '1');
    table.setAttribute('width', '100%')

    // Create table row tr element of a table
    let tr = table.insertRow(-1);
    let theaderf = document.createElement("th");
    theaderf.innerHTML = "First Name";
    tr.appendChild(theaderf)
    let theaderl = document.createElement("th");
    theaderl.innerHTML = "Last Name";
    tr.appendChild(theaderl)
    let theaderp = document.createElement("th");
    theaderp.innerHTML = "Phone Number";
    tr.appendChild(theaderp)
    let theaderb = document.createElement("th");
    theaderb.innerHTML = "Birthday";
    tr.appendChild(theaderb)
    let theadera = document.createElement("th");
    theadera.innerHTML = "Age";
    tr.appendChild(theadera)
    let thbuttons = document.createElement("th");
    thbuttons.innerHTML = "Actions"
    tr.appendChild(thbuttons);

    // Adding the data to the table
    for (let i = 0; i < newInfo.length; i++) {

        // Create a new row
        trow = table.insertRow(-1);
        for (let j = 0; j < cols.length; j++) {
            let cell = trow.insertCell(-1);

            // Inserting the cell at particular place
            cell.innerHTML = newInfo[i][cols[j]];
        }
        let cell = trow.insertCell(-1);
        // let rowID = i;
        cell.innerHTML = "<button id='delete' value='delete' onclick='remove(" + i + ")'>Delete</button>";;
    }

    // Add the newly created table containing json data
    let el = document.getElementById("heldInfo");
    el.innerHTML = "";
    el.appendChild(table);
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit
}


