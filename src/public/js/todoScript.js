
const todoForm = document.querySelector("form");
const addButton = document.getElementById("addBTN");
const clearButton = document.getElementById("clearBTN")
const logoutButton = document.getElementById("logoutBTN")
fetch("/tasks", {
})
    .then(function (response) {
        return response.json();
    })
    .then(db => {
        db.forEach(addRowToTable
            );
    });

addButton.addEventListener("click", event => {
    // prevent default form action from being carried out
    event.preventDefault()

    if (todoForm.elements.todo.value == "" || todoForm.elements.desc.value == "") { //check for empty
        window.alert("Task Name or Description is empty.")
        return
    }

    let nameInput = todoForm.elements.todo,
        descInput = todoForm.elements.desc,
        dueDateInput = todoForm.elements.dueDate,
        json = {
            todo: nameInput.value,
            desc: descInput.value,
            dueDate: dueDateInput.value,
            daysLeft: "",
            username: ""
        },
        body = JSON.stringify(json)

    console.log("BODYY" + body)
    fetch('/addTask', {
        method: 'POST',
        body,

        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function (response) {
        // do something with the reponse
        return response.json();
    })

    .then(function (data) {
        document.querySelector("form").reset();
        addRowToTable
        (data);
    });

    return false
})



clearButton.addEventListener("click", event => {
    // prevent default form action from being carried out
    event.preventDefault()

    console.log("QUAkls")
    body = JSON.stringify("")

    fetch('/clearAll', {
        method: 'POST',
        body,

    })
    .then(function (json) {
       
        let tbody = document.querySelector("#tbody")
        tbody.innerHTML = ""

        fetch("/tasks", {
        })
            .then(function (response) {
                return response.json();
            })
            .then(db =>{
                db.forEach(addRowToTable);
            });

           
    });

    return false
})



logoutButton.addEventListener("click", event => {
    event.preventDefault();

    fetch("/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    window.location.href = "/";
});


const addRowToTable = function (data) {
    if (!data.todo)
    {
        return false
    }
    let tbody = document.querySelector("#tbody"),
        row = tbody.insertRow()

   
    row.insertCell(0).innerHTML = data.todo
    row.insertCell(1).innerHTML = data.desc
    row.insertCell(2).innerHTML = data.dueDate
    row.insertCell(3).innerHTML = data.daysLeft
    let deleteCell = row.insertCell(4),
        deleteBTN = document.createElement("button")
    deleteBTN.innerHTML = 'Delete';

    deleteBTN.addEventListener("click", event => {
        // prevent default form action from being carried out
        event.preventDefault()

        console.log("Data " + data)
        console.log("Data ID:  " + data._id)

      const  body = JSON.stringify({id: data._id})

      console.log(body)
        fetch('/deleteTask', {
            method: 'POST',
            body,

            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async function (response) {
                row.remove()
            })

        return false
    })

    deleteCell.appendChild(deleteBTN)

}










const refreshTable = function (newData) {


    const _table = document.getElementById("resultTable")
    _table.innerHTML = ""

    _table.innerHTML = "<tr> <th> Item </th> <th> Description </th> <th> Due Date </th>  <th> Days left </th> </tr>"
    newData.forEach((element, index) => {
        _table.innerHTML +=
            "<tr><td>" + element.todo + "</td><td>"
            + element.desc + "</td><td>"
            + element.dueDate + "</td><td>"
            + element.daysLeft + "</td></tr>"
        //add row for remove button?
    })
}

