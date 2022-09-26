let localEntries = {};
let currentEditId = '';
let currentEditIndex = -1;

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
    console.log(body)
    const rawRes = await fetch('/submit', {
        headers: {
            'Content-Type': 'application/json'
        }, method: 'POST', body
    });
    const updatedData = await rawRes.json();

    updateSummaries(updatedData['summary']);
    json.id = updatedData['id']
    updateData({[json.id]: json});

    return false;
}

const updateSummaries = function (summary) {
    console.log(summary)
    const averageHours = document.getElementById('average-hours-stat');
    const dreamPercentage = document.getElementById('dream-percentage-stat');
    const averageRating = document.getElementById('average-rating-stat');
    averageHours.innerText = `${Math.round(summary['averageTimeAsleep'] * 100) / 100}`;
    dreamPercentage.innerText = `${Math.round(summary['dreamPercentage'] * 10000) / 100}%`;
    averageRating.innerText = `${Math.round(summary['averageSleepRating'] * 100) / 100}`;
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

        row.classList.add('group');
        timeAsleepCell.innerText = new Date(datum['timeSleep']).toLocaleString();
        timeAwakeCell.innerText = new Date(datum['timeWakeUp']).toLocaleString();
        ratingCell.innerText = datum['sleepRating'];
        didDreamCell.innerText = datum['hadDream'] ? '✓' : '✗';
        dreamSummaryCell.innerText = datum['hadDream'] ? (datum['dreamDescription'] ?? 'N/A') : 'N/A';
        deleteCell.innerHTML = `<td id="${datum.id}">
                                    <label id="${datum.id}_label" onclick="editItem(this)" for="my-modal" class="invisible group-hover:visible cursor-pointer modal-button">
                                        <span class="material-symbols-outlined">edit</span>
                                    </label>
                                    <button id="${datum.id}_button" class="invisible group-hover:visible" onclick="deleteItem(this)">
                                        <span class="material-symbols-outlined">delete</span>
                                    </button>
                                </td>`
    })
}

const setProfile = function (userData) {
    const profilePic = document.getElementById('profile-pic');
    const profileDiv = document.getElementById('profile-div');
    const profileName = document.getElementById('profile-name');
    const avatarUrl = userData['avatarUrl'];
    const displayName = userData['displayName'];

    const img = document.createElement('img');
    img.src = avatarUrl;
    img.alt = displayName;

    profilePic.classList.remove('placeholder');
    profileDiv.innerHTML = '';
    profileDiv.appendChild(img);
    profileName.innerText = displayName;
}

const editItem = async function (button) {
    const id = button.id.split('_')[0];
    currentEditIndex = button.parentNode.parentNode.rowIndex;
    currentEditId = id;
    const data = localEntries[id];
    console.log(data)
    document.getElementById('update-sleep-time').value = data['timeSleep'];
    document.getElementById('update-wake-time').value = data['timeWakeUp'];
    document.getElementById('update-sleep-rating').value = data['sleepRating'];
    document.getElementById('update-did-dream').checked = data['hadDream'];
    document.getElementById('update-dream-description').value = data['dreamDescription'];
}

const updateEntry = async function (e) {
    e.preventDefault()
    document.getElementById('my-modal').checked = false;
    const inputs = e.target.elements;
    const json = {
        id: currentEditId,
        timeSleep: inputs['update-sleep-time'].value,
        timeWakeUp: inputs['update-wake-time'].value,
        sleepRating: Number(inputs['update-sleep-rating'].value), // Out of 5
        hadDream: inputs['update-did-dream'].checked,
        dreamDescription: inputs['update-dream-description'].value,
    }
    const body = JSON.stringify(json);
    console.log(body)
    const rawRes = await fetch('/entry', {
        headers: {
            'Content-Type': 'application/json'
        }, method: 'PATCH', body
    });
    location.reload();
    // currentEditId = '';
    // const updatedData = await rawRes.json();
    // updateSummaries(updatedData['summary']);
    // json.id = updatedData['id']
    // const table = document.getElementById('sleep-data');
    // table.deleteRow(currentEditIndex);
    // localEntries[currentEditId] = json;
    // updateData({[json.id]: json});
    // return false;
}

const deleteItem = async function (button) {
    const table = document.getElementById('sleep-data');
    const rowIndex = button.parentNode.parentNode.rowIndex;
    table.deleteRow(rowIndex);
    console.log('id', button.id.split('_')[0])
    const res = await fetch('/deleteEntry', {
        headers: {
            'Content-Type': 'application/json'
        }, method: "DELETE", body: JSON.stringify({id: button.id.split('_')[0]})
    });
    const summary = await res.json();
    console.log(summary)
    updateSummaries(summary);
}

window.onload = function () {
    const form = document.getElementById('sleep-form');
    const updateForm = document.getElementById('update-sleep-form');
    // const updateFormButton = document.getElementById('update-entry-button');
    // updateFormButton.onclick = editItem;
    form.onsubmit = submit;
    updateForm.onsubmit = updateEntry;
    fetch('/getData')
        .then(res => res.json())
        .then(json => {
            console.log(json)
            updateSummaries(json['summary']);
            updateData(json['sleepData']);
            localEntries = json['sleepData'];
            setProfile(json['userData']);
        })
}
