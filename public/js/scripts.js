let eid = null

fetch("/data", {
})
    .then(function (response) {
        return response.json();
    })
    .then(db =>{
        db.forEach(createTable);
    });

const submit = function (e) {
    e.preventDefault();

    let txt = document.getElementById('sub').innerText;

    if(txt.toLowerCase() === 'submit') {
        const form = document.querySelector("form")
        const json = {assignment: form.assignment.value, subject: form.subject.value, dead_line: form.deadline.value}
        const body = JSON.stringify(json);
        fetch("/add", {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                // do something with the reponse
                return response.json();
            })

            .then(function (json) {
                document.querySelector("form").reset();
                createTable(json);
            });

    } else if(txt.toLowerCase() === 'update') {
        const json = {
            assignment: document.getElementById('assignment').value,
            subject: document.getElementById('subject').value,
            dead_line: document.getElementById('deadline').value,
            id: eid
        }
        const body= JSON.stringify(json)
            fetch("/update", {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
                .then(function (response) {
                return response.json();
            })

            .then(function (json) {
                document.querySelector("form").reset();
                document.querySelector("#tbody").innerHTML = "";
                fetch("/data", {
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(db =>{
                        db.forEach(createTable);
                    });

                createTable(json);
                document.querySelector("#tbody").deleteRow(0)
            });

        document.querySelector('#sub').innerHTML = "Submit";
        eid = null;
    }
    return false;

};

window.onload = function () {
    const button = document.querySelector("button");
    button.onclick = submit;
}

function createTable(json) {
    let row = document.querySelector("#tbody").insertRow();

    row.insertCell(0).innerHTML = json.assignment;
    row.insertCell(1).innerHTML = json.subject;
    row.insertCell(2).innerHTML = json.dead_line;
    let id = json._id
    console.log("building" + id)


    let editCell = row.insertCell(3);
    let editButton = document.createElement("button");
    editButton.innerHTML = 'Change';

    editButton.onclick = function() {
        document.getElementById('assignment').value = json.assignment
        document.getElementById('subject').value = json.subject
        document.getElementById('deadline').value = json.dead_line
        eid = id;
        row.remove()
        document.querySelector('#sub').innerHTML = "Update";
    }


    editCell.appendChild(editButton);

    let deleteCell = row.insertCell(4);
    let deletebutton = document.createElement("button");
    deletebutton.innerHTML = 'Delete';
    deletebutton.onclick = function() {
        fetch("/remove", {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => {
                row.remove();
            });
    }
    deleteCell.appendChild(deletebutton);
}

const logoutButton = document.getElementById("logout")

logoutButton.addEventListener("click", event => {
    event.preventDefault();
    fetch("/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    window.location.href = "login.html";
});