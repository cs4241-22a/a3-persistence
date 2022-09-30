let messagesForm = document.getElementById("form");
let submitButton = document.getElementById("submit");
let table = document.getElementById("messages");

let tableIDs = []

let user = localStorage["username"];

document.getElementById("welcomeMessage").innerHTML = `Hello, ${user}!`

// fetch the initial list of messages
fetch("/send", {
    method: "POST", //tells it to use the post method
    body: JSON.stringify({ "user": user }),
    headers: {
        //bodyparser only kicks in if the content type is application/json
        "Content-Type": "application/json"
    }
})
    .then(response => response.json()) // parse the JSON from the server
    .then(messages => {
        console.log("messages: ", messages)
        // iterate through every message and add it to our page
        for (let message of messages) {
            console.log("messages: ", message)
            displayTable(message)
        }
    });

submitButton.addEventListener("click", event => {

    // stop our form submission from refreshing the page
    event.preventDefault();

    const inputSubject = String(document.querySelector('#subject').value)
    const inputReceiver = String(document.querySelector('#receiver').value)
    const inputMsg = String(document.querySelector('#message').value)

    if (inputSubject === '' || inputReceiver === '' || inputMsg === '') {
        alert("Fill in all the fields")
    } else {

        let newMessage = { "subject": inputSubject, "receiver": inputReceiver, "message": inputMsg }

        fetch("/add", {
            method: "POST", //tells it to use the post method
            body: JSON.stringify({ "message": newMessage, "user": user }),
            headers: {
                //bodyparser only kicks in if the content type is application/json
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("message: ", json)
                displayTable(json)
            })

        // reset form
        messagesForm.reset();
    }
});

const remove = function(e) {
    // stop our form submission from refreshing the page
    e.preventDefault();

    e = e || window.event;
    var target = e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        let cells = target.getElementsByTagName("td");
        let body = JSON.stringify({ "_id": cells[0].innerHTML })
        console.log("body:", body)

        let index = tableIDs.indexOf(String(cells[0].innerHTML)) + 1

        if (index != null) {
            table.deleteRow(index)

            fetch('/remove', {
                method: 'POST',
                body,
                headers: {
                    //bodyparser only kicks in if the content type is application/json
                    "Content-Type": "application/json"
                }
            })
                .then(function(response) {
                    response.text().then(function(textdata) {
                        console.log(JSON.parse(textdata))
                    })
                })
        }
    }
    return false
}

const edit = function(e) {
    // stop our form submission from refreshing the page
    e.preventDefault();

    e = e || window.event;
    var target = e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {

        let cells = target.getElementsByTagName("td");

        let index = tableIDs.indexOf(String(cells[0].innerHTML)) + 1;

        var subject = cells[1].innerHTML;
        console.log("Subject: ", String(subject))
        cells[1].innerHTML = "<input type='text' class='w-100' id='modifySubject' value='" + String(subject) + "'>";

        let receiverValue = cells[2].innerHTML;
        cells[2].innerHTML = "<input type='text' class='w-100' id='modifyReceiver' value='" + String(receiverValue) + "'>";

        let msgValue = cells[3].innerHTML;
        cells[3].innerHTML = "<textarea id='modifyMessage' rows='4' cols='40'>" + String(msgValue) + "</textarea>";

        let saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('btn', 'btn-success');
        saveButton.style.height = '50px';
        saveButton.style.width = '60px';
        saveButton.onclick = save;
        cells[4].innerHTML = '';
        cells[4].append(saveButton);
    }
}

const save = function(e) {
    // stop our form submission from refreshing the page
    e.preventDefault();

    e = e || window.event;
    var target = e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        let cells = target.getElementsByTagName("td");

        if (modifySubject.value == '' || modifyReceiver.value == '' || modifyMessage.value == '') {
            alert("Fill in all the fields")
        } else {

            let updatedMessage = { "subject": modifySubject.value, "receiver": modifyReceiver.value, "message": modifyMessage.value }

            cells[1].innerHTML = modifySubject.value;
            cells[2].innerHTML = modifyReceiver.value;
            cells[3].innerHTML = modifyMessage.value;

            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-primary');
            editButton.style.height = '50px';
            editButton.style.width = '60px';
            editButton.onclick = edit
            cells[4].innerHTML = '';
            cells[4].append(editButton);

            let body = JSON.stringify({ "user": user, "message": updatedMessage})
            console.log("body:", body)

            fetch('/update', {
                method: 'POST',
                body,
                headers: {
                    //bodyparser only kicks in if the content type is application/json
                    "Content-Type": "application/json"
                }
            })
                .then(function(response) {
                    response.text().then(function(textdata) {
                        console.log(JSON.parse(textdata))
                    })
                })
        }

    }
    return false
}

function displayTable(data) {
    const tableBody = document.getElementById("messages")

    const cellID = document.createElement("td")
    cellID.appendChild(document.createTextNode(String(data._id)))
    tableIDs.push(String(data._id))
    cellID.style.display = "none"

    const cellSubject = document.createElement("td")
    cellSubject.colSpan = "1"
    cellSubject.appendChild(document.createTextNode(String(data.message.subject)))

    const cellReceiver = document.createElement("td")
    cellReceiver.colSpan = "1"
    cellReceiver.appendChild(document.createTextNode(String(data.message.receiver)))

    const cellMessage = document.createElement("td")
    cellMessage.colSpan = "2"
    cellMessage.appendChild(document.createTextNode(String(data.message.message)))

    const cellEdit = document.createElement("td")
    cellEdit.colSpan = "1"
    var editButton = document.createElement('button')
    editButton.textContent = 'Edit';
    editButton.classList.add('btn', 'btn-primary');
    editButton.style.height = '50px';
    editButton.style.width = '60px';
    editButton.onclick = edit
    cellEdit.appendChild(editButton)

    const cellDelete = document.createElement("td")
    cellDelete.colSpan = "1"
    var deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.style.height = '50px';
    deleteButton.onclick = remove
    cellDelete.appendChild(deleteButton)

    const newRow = document.createElement("tr")
    newRow.append(cellID, cellSubject, cellReceiver, cellMessage, cellEdit, cellDelete)

    tableBody.appendChild(newRow)
}