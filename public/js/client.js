let ids = [{}]
let id_edited = undefined

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

    fetch('/todo/' + id_edited, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body
    }).then(async response => {
        let obj = await response.json()
        if (obj.acknowledged) {
            fetch('/todo/' + id_edited, {
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
    e.preventDefault()
    resetForm(e)
    let idx = parseInt(e.target.id.substring(6))
    let id = ids[idx]

    fetch('/todo/' + id, {
        method: 'DELETE',
    }).then(async response => {
        let obj = await response.json()
        if (obj.acknowledged) {
            document.getElementById('todoTable').deleteRow(idx)
            ids.splice(idx, 1)
        }
    }).catch((reason) => {
        console.error(reason)
    })
    return false
}

function addRow(task) {
    ids.push(task._id)

    let table = document.getElementById('todoTable')
    let row = table.insertRow()

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

    let editColumn = row.insertCell(4)
    let editBtn = document.createElement('button')
    editBtn.id = 'edit' + row.rowIndex
    editBtn.onclick = fillForm
    editBtn.className = 'editTask'
    editBtn.innerText = 'Edit'
    editColumn.appendChild(editBtn)

    let deleteColumn = row.insertCell(5)
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

    let idx = parseInt(e.target.id.substring(4))
    let id = ids[idx]
    id_edited = id
    fetch('/todo/' + id, {
        method: 'GET'
    }).then(async response => {
        let json = await response.json()
        changeToModifyForm(json)
    }).catch((reason) => {
        console.error(reason)
    })
}

function changeToModifyForm(data) {
    document.getElementById('task').value = data.task
    document.getElementById('due-date').value = data.due_date
    document.getElementById('legend').textContent = 'Modify a TODO'
    document.getElementById('todoSubmit').onclick = updateTask
}

function resetForm() {
    document.getElementById('addTask').reset()
    document.getElementById('legend').textContent = 'Add a TODO'
    document.getElementById('todoSubmit').onclick = submit
    id_edited = undefined
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