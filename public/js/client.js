let ids = []
let idx_edited = -1
let deleting = false

function initialize(e) {
    // After getting a response, ask for HTML of tasks to add
    fetch('/todo', {
        method: 'GET'
    }).then(async response => {
        let data = await response.json()
        for (let task of data) {
            addRow(task)
        }
    }).catch((reason) => {
        console.error(reason)
    })
}

function submit(e) {
    e.preventDefault()

    const
        input_task = document.getElementById('task'),
        input_date = document.getElementById('due-date'),
        current_date = new Date(),
        body = JSON.stringify({
            task: input_task.value,
            creation_date: current_date,
            due_date: input_date.value,
        })

    fetch('/todo', {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body
    }).then(async response => { // Only put the row in the table once the database responds
        let obj = await response.json()
        if (obj.acknowledged) {
            ids.push(obj.insertedId)
            fetch('/todo/' + obj.insertedId, {
                method: 'GET'
            }).then(async response => {
                let task = await response.json()
                addRow(task)
                resetForm()
            })
        }
    }).catch(reason => {
        console.error(reason)
    })

    return false
}

function updateTask(e) {
    e.preventDefault()

    const
        input_task = document.getElementById('task'),
        input_date = document.getElementById('due-date'),
        body = JSON.stringify({task: input_task.value, due_date: input_date.value})

    fetch('/todo/' + ids[idx_edited], {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body
    }).then(async response => {
        let obj = await response.json()
        if (obj.acknowledged) {
            fetch('/todo/' + ids[idx_edited], {
                method: 'GET'
            }).then(async response => {
                let task = await response.json()
                editRow(task)
                resetForm()
            })
        }
    }).catch((reason) => {
        console.error(reason)
    })

    return false
}

function deleteTask(e) {
    deleting = true // Hack because clicking on a button in a table still counts as focusing the row
    e.preventDefault()
    resetForm(e)

    idx_edited = e.target.parentNode.parentNode.rowIndex - 1
    fetch('/todo/' + ids[idx_edited], {
        method: 'DELETE',
    }).then(async response => {
        let obj = await response.json()
        if (obj.acknowledged) {
            document.getElementById('todoTable').deleteRow(idx_edited)
            ids.splice(idx_edited, 1)
        }
        deleting = false
    }).catch((reason) => {
        console.error(reason)
        deleting = false
    })
    return false
}

function addRow(task) {
    ids.push(task._id)

    let table = document.getElementById('todoTable')
    let row = table.insertRow()
    row.onclick = fillForm

    let taskColumn = row.insertCell(0)
    taskColumn.innerHTML = task.task

    let creationDateColumn = row.insertCell(1)
    creationDateColumn.innerHTML = new Date(task.creation_date).toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).toString()

    let dueDateColumn = row.insertCell(2)
    dueDateColumn.innerHTML = new Date(task.due_date).toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).toString()

    let priorityColumn = row.insertCell(3)
    priorityColumn.innerHTML = task.priority
    if (task.priority === 'Late') {
        priorityColumn.style.backgroundColor = 'red'
        priorityColumn.style.color = 'white'
    }

    let deleteColumn = row.insertCell(4)
    let deleteBtn = document.createElement('button')
    deleteBtn.id = 'delete' + row.rowIndex
    deleteBtn.onclick = deleteTask
    deleteBtn.className = 'deleteTask'
    deleteBtn.innerText = 'X'
    deleteColumn.appendChild(deleteBtn)
}

function editRow(task) {
    const idx = ids.indexOf(task._id)
    const table = document.getElementById('todoTable')
    const row = table.rows.item(idx)

    const taskCol = row.cells.item(0)
    taskCol.innerHTML = task.task

    const dueDateCol = row.cells.item(2)
    dueDateCol.innerHTML = new Date(task.due_date).toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).toString()

    const priorityCol = row.cells.item(3)
    priorityCol.innerHTML = task.priority
    if (task.priority === 'Late') {
        priorityCol.style.backgroundColor = 'red'
        priorityCol.style.color = 'white'
    } else {
        priorityCol.style.backgroundColor = ''
        priorityCol.style.color = ''
    }
}

function fillForm(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    if (!deleting) {
        idx_edited = e.target.parentNode.rowIndex - 1
        fetch('/todo/' + ids[idx_edited], {
            method: 'GET'
        }).then(async response => {
            let json = await response.json()
            changeToModifyForm(json)
        }).catch((reason) => {
            console.error(reason)
        })
    }

    return false
}

function changeToModifyForm(data) {
    document.getElementById('task').value = data.task
    document.getElementById('due-date').value = data.due_date
    document.getElementById('legend').textContent = 'Modify a TODO'
    document.getElementById('todoSubmit').onclick = updateTask

    // If clicking on this row again, reset the form
    let table = document.getElementById('todoTable')
    for (let row of table.rows) {
        row.onclick = fillForm
    }
    table.rows.item(idx_edited).onclick = resetForm
}

function resetForm() {
    document.getElementById('addTask').reset()
    document.getElementById('legend').textContent = 'Add a TODO'
    document.getElementById('todoSubmit').disabled = true
    document.getElementById('todoSubmit').onclick = submit

    // When resetting the form, make sure clicking on the row will now fill the form
    let table = document.getElementById('todoTable')
    for (let row of table.rows) {
        row.onclick = fillForm
    }
}

window.onload = function () {
    // Show table immediately
    initialize()

    // Add submit functionality
    const todoSubmit = document.getElementById('todoSubmit')
    todoSubmit.onclick = submit

    const cancelButton = document.getElementById('cancel')
    cancelButton.onclick = resetForm

    // Only enable submit button if fields are filled out
    const addTask = document.getElementById('addTask')[0]
    addTask.oninput = () => {
        document.getElementById('todoSubmit').disabled = document.getElementById('task').value.trim() === '' || document.getElementById('due-date').value.trim() === ''
    }
}