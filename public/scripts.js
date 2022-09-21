

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
            user = text;
            let header = document.getElementById("header");
            header.innerHTML = "Logged In As: " + text + "  ";
            header.innerHTML += "<br> <a href='index.html'> Log Out</a> "
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
                        "<td> <button type = 'button'id = 'delete " + count + "' class='button' onclick = 'delete_row( " +
                        (count - 1).toString() +
                        ")'>Delete</button>" +
                        "<button type = 'button' id = 'edit " + count + "' class='button' onclick = 'edit_row( " +
                        (count - 1).toString() +
                        ")'>Edit</button> </td>" +
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
        "<td> <button id = 'delete" + count + "' class='button' onclick = 'delete_row( " +
        (count - 1).toString() +
        ")'>Delete</button>" +
        "<button id = 'edit" + count + "' class='button' onclick = 'edit_row( " +
        (count - 1).toString() +
        ")'>Edit</button> </td>" +
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
    fetch( '/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
    })
        .then(response => response.json())
        .then( console.log)

    form.reset();
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
    const current = document.getElementById(id).children;

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
    fetch('/delete', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json),
    })
        .then(response => response.json())
        .then( console.log)

    document.getElementById(id).remove();

}

function edit_row(id) {
    console.log(id);
    const current = document.getElementById(id).children;


    let currentActivity = current[0].innerHTML;
    let currentDate = current[1].innerHTML;
    let currentStart = current[2].innerHTML;
    let currentEnd = current[3].innerHTML;
    let currentDescription = current[4].innerHTML;
    let currentDuration = current[5].innerHTML;

    const oldjson = {
        activity: currentActivity.toString(),
        date: currentDate.toString(),
        startTime: currentStart.toString(),
        endTime: currentEnd.toString(),
        description: currentDescription.toString(),
        duration: currentDuration.toString()
    }

    console.log(oldjson);

    current[0].innerHTML = "<select id= 'editactivity'  name='Type of activity done' value=" + currentActivity.toString() +">" +
        "<option value='Sleep'>Sleep</option>" +
        "<option value='Food'>Food</option>" +
        "<option value='School'>School</option>" +
        "<option value='Work'>Work</option>" +
        "<option value='Fun'>Fun</option>" +
        "</select>"

    current[1].innerHTML = "<input type='date' id='editdate' name='date' value='" + currentDate.toString() +"'/>"

    current[2].innerHTML = "<input type='time' id='edittime_started' name='time_started' value='" + currentStart.toString() +"'/>"

    current[3].innerHTML = "<input type='time' id='edittime_ended' name='time_ended' value='" + currentEnd.toString() +"'/>"

    current[4].innerHTML = "<input type='text' id='editdescription' name='description' value='" + oldjson.description + "'/>"

    current[6].innerHTML = "<td> <button class='button' id = 'editSubmit' onclick = 'submit_Edit( " +
        (id).toString() + ", " + JSON.stringify(oldjson) +
        ")'>Submit Edit</button>" +"</tr>";
}


function submit_Edit(id, oldjson){
    console.log(id);
    const current = document.getElementById(id).children;
    console.log(current[2].innerHTML);


    const currentActivity = document.querySelector("#editactivity");
    const currentDate =  document.querySelector("#editdate");;
    const currentStart =  document.querySelector("#edittime_started");;
    const currentEnd =  document.querySelector("#edittime_ended");;
    const currentDescription =  document.querySelector("#editdescription");;


    const json = {
        activity: currentActivity.value,
        date: currentDate.value,
        startTime: currentStart.value,
        endTime: currentEnd.value,
        description: currentDescription.value,
        duration: time_duration(currentStart.value.toString(), currentEnd.value.toString())
    }
    console.log(json.duration);


    let edited = [oldjson, json]

    fetch('edit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(edited),
    })

    current[0].innerHTML = json.activity;

    current[1].innerHTML = json.date;

    current[2].innerHTML = json.startTime;

    current[3].innerHTML = json.endTime;

    current[4].innerHTML = json.description;

    current[5].innerHTML = json.duration;

    current[6].innerHTML = "<button id='delete' onClick='delete_row( " +
        (id).toString() +
        ")'>Delete</button>" +
    "<button id = 'edit' onClick = 'edit_row( " +
    (id).toString() +
    ")'>Edit</button>"
}


