window.onload = () => {
    document.getElementById('getBtn').onclick = getTask
    document.getElementById('putBtn').onclick = putTask
    document.getElementById('deleteBtn').onclick = deleteTask
    document.getElementById('patchBtn').onclick = patchTask
}

function getTask(e) {
    e.preventDefault()

    fetch('/todo', {
        method: 'GET',
    }).then(async response => {
        console.log(await response.json())
    })

    return false
}

function putTask(e) {
    e.preventDefault()

    let body = JSON.stringify({
        task: 'do this',
        creation_date: '2022-09-13T01:45',
        due_date: '2022-09-14T23:59',
    })

    fetch('/todo', {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body
    }).then(async response => {
        console.log(await response.json())
    })

    return false
}

function patchTask(e) {
    e.preventDefault()

    let id = document.getElementById('taskId').value

    let body = JSON.stringify({
        task: 'no, do that',
        due_date: '2022-09-12T10:00',
    })

    fetch('/todo/' + id, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body
    }).then(async response => {
        console.log(await response.json())
    })

    return false
}

function deleteTask(e) {
    e.preventDefault()

    let id = document.getElementById('taskId').value

    fetch('/todo/' + id, {
        method: 'DELETE',
    }).then(async response => {
        console.log(await response.json())
    })

    return false
}

