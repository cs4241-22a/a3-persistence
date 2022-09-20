const submit = async function (e) {
    e.preventDefault()
    const inputs = e.target.elements;
    const json = {
        timeSleep: inputs['sleep-time'].value,
        timeWakeUp: inputs['wake-time'].value,
        sleepRating: Number(inputs['sleep-rating'].value), // Out of 5
        hadDream: inputs['did-dream'].checked,
        dreamDescription: inputs['dream-description'].value,
    }
    const body = JSON.stringify(json);

    const rawRes = await fetch('/submit', {method: 'POST', body});
    const updatedData = await rawRes.json();

    updateSummaries(updatedData['summary']);
    json.id = updatedData['id']
    updateData({[json.id]: json});

    return false;
}

const updateSummaries = function (summary) {
    const averageHours = document.getElementById('average-hours-stat');
    const dreamPercentage = document.getElementById('dream-percentage-stat');
    const averageRating = document.getElementById('average-rating-stat');
    averageHours.innerText = `${Math.round(summary['averageTimeAsleep']*100)/100}`;
    dreamPercentage.innerText = `${summary['dreamPercentage'].toFixed(2) * 100}%`;
    averageRating.innerText = `${Math.round(summary['averageSleepRating'] * 100) / 100}/5`;
}

const updateData = function (data) {
    const table = document.getElementById('sleep-data');

    Object.values(data).forEach(datum => {
        const row = table.insertRow(-1);
        const timeAsleepCell = row.insertCell(0);
        const timeAwakeCell = row.insertCell(1);
        const ratingCell = row.insertCell(2);
        const didDreamCell = row.insertCell(3);
        const dreamSummaryCell = row.insertCell(4);
        const deleteCell = row.insertCell(5);

        row.classList.add('history-entry');
        timeAsleepCell.innerText = new Date(datum['timeSleep']).toLocaleString();
        timeAwakeCell.innerText = new Date(datum['timeWakeUp']).toLocaleString();
        ratingCell.innerText = datum['sleepRating'];
        didDreamCell.innerText = datum['hadDream'] ? '✓' : '✗';
        dreamSummaryCell.innerText = datum['hadDream'] ? (datum['dreamDescription'] ?? 'N/A') : 'N/A';
        deleteCell.innerHTML = `<td><button id="${datum.id}" class="delete-button" onclick="deleteItem(this)"><span class="material-symbols-outlined">delete</span></button></td>`
    })
}

const deleteItem = async function (button) {
    const table = document.getElementById('sleep-data');
    const rowIndex = button.parentNode.parentNode.rowIndex;
    table.deleteRow(rowIndex);
    const res = await fetch('/deleteEntry', {method: "DELETE", body: JSON.stringify({id: button.id})});
    const summary = await res.json();
    console.log(summary)
    updateSummaries(summary);
}

window.onload = function () {
    const form = document.getElementById('sleep-form');
    form.onsubmit = submit;
    fetch('/getData')
        .then(res => res.json())
        .then(json => {
            updateSummaries(json['summary']);
            updateData(json['sleepData'])
        })
}
