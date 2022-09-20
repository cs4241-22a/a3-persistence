

console.log("Starting");

let count = 0 ;


const logs = [];

const form = document.forms[0];
const table = document.getElementById('table');

const activity = form.elements['Type of activity done'];
const date = form.elements['date'];
const startTime = form.elements['time_started'];
const endTime = form.elements['time_ended']
const description = form.elements['description'];


window.onload = function (){
    let user = null;
    fetch('/getUser', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => (response.text()))
        .then(text => {
            user = text
            console.log(user);
            console.log(text)
        })

    fetch('/starting', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => (response.json()))
        .then((json) => {
            let table = document.getElementById("table");
            json.forEach((item) => {
                if (item.user === user) {
                    table.innerHTML +=
                        "<tr id = " +
                        (count++).toString() +
                        ">" +
                        "<td>" +
                        item.activity +
                        "</td>" +
                        "<td>" +
                        item.date +
                        "</td>" +
                        "<td>" +
                        item.startTime +
                        "</td>" +
                        "<td>" +
                        item.endTime +
                        "</td>" +
                        "<td>" +
                        item.description +
                        "</td>" +
                        "<td>" +
                        item.duration +
                        "</td>" +
                        "<td> <button id = 'delete' onclick = 'delete_row( " +
                        (count - 1).toString() +
                        ")'>Delete</button> </td>" +
                        "</tr>";
                }
            });
        })
}


const appendToTable = function(item){

    let table = document.getElementById("table");
    table.innerHTML +=
        "<tr id = " +
        (count++).toString() +
        ">" +
        "<td>" +
        item.activity +
        "</td>" +
        "<td>" +
        item.date +
        "</td>" +
        "<td>" +
        item.startTime +
        "</td>" +
        "<td>" +
        item.endTime +
        "</td>" +
        "<td>" +
        item.description +
        "</td>" +
        "<td>" +
        item.duration +
        "</td>" +
        "<td> <button id = 'delete' onclick = 'delete_row( " +
        (count - 1).toString() +
        ")'>Delete</button> </td>" +
        "</tr>";
}


logs.forEach( function (newLog) {
    appendToTable(newLog);
})


form.onsubmit = function(event) {

    event.preventDefault();

    const input = {
        activity: activity.value,
        date: date.value,
        startTime: startTime.value,
        endTime: endTime.value,
        description: description.value,
        duration: time_duration(startTime.value, endTime.value),
    }
    logs.push(input);
    appendToTable(input);

    const body = JSON.stringify(input);
    console.log(input);
    fetch( '/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
    })
        .then(response => response.json())
        .then( console.log)
}



// Function that calculates the duration of the event logged automatically
function time_duration(start, end) {
    // Parse the inputs into their hours and minutes
    let start_hour = parseInt(start.split(":")[0]);
    let start_min = parseInt(start.split(":")[1]);

    let end_hour = parseInt(end.split(":")[0]);
    let end_min = parseInt(end.split(":")[1]);

    let dur_hour;
    let dur_min;

    // Find the hours and minutes of duration
    if (end_hour > start_hour) {
        if (end_min >= start_min) {
            dur_min = end_min - start_min;
            dur_hour = end_hour - start_hour;
        } else {
            dur_hour = end_hour - start_hour - 1;
            dur_min = end_min + 60 - start_min;
        }
    } else if (end_hour == start_hour) {
        if (end_min >= start_min) {
            dur_min = end_min - start_min;
            dur_hour = 0;
        } else {
            dur_hour = 23;
            dur_min = end_min + 60 - start_min;
        }
    } else {
        if (end_min >= start_min) {
            dur_min = end_min - start_min;
            dur_hour = end_hour + 24 - start_hour;
        } else {
            dur_hour = end_hour + 24 - start_hour - 1;
            dur_min = end_min + 60 - start_min;
        }

    }
    // Return
    return (
        dur_hour.toString() +
        " Hours  " +
        dur_min.toString() +
        " Minutes"
    ).toString();
}

// Function to delete the row
// I wanted to delete a row and then convert the current table to JSON and send back to server and get the new appdata back (without the deleted row) and recreate but it seems to just reset the appdata back to the starting array
function delete_row(id) {
    console.log(id);
    const current = document.getElementById(id).children;
    console.log(current[2].innerHTML);

    const currentActivity = current[0].innerHTML;
    const currentDate = current[1].innerHTML;
    const currentStart = current[2].innerHTML;
    const currentEnd = current[3].innerHTML;
    const currentDescription = current[4].innerHTML;
    const currentDuration = current[5].innerHTML;

    const json = {
        activity: currentActivity.toString(),
        date: currentDate.toString(),
        startTime: currentStart.toString(),
        endTime: currentEnd.toString(),
        description: currentDescription.toString(),
        duration: currentDuration.toString()
    }
    console.log(json);
    fetch('/delete', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json),
    })
        .then(response => response.json())
        .then( console.log)

    document.getElementById(id).remove();
    // count--;


}


