

console.log("Starting");


const logs = [];

const form = document.forms[0];

const activity = form.elements['Type of activity done'];
const date = form.elements['date']
const startTime = form.elements['time_started'];
const endTime = form.elements['time_ended']
const description = form.elements['description'];



form.onsubmit = function(event) {

    event.preventDefault();

    const input = {
        activity: activity.value,
        date: date.value,
        startTime: startTime.value,
        endTime: endTime.value,
        description: description.value,
    }
    logs.push(input)
    const body = JSON.stringify(input);
    console.log(logs);

    fetch( '/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
    })
        .then(response => response.json())
        .then( console.log)



}
