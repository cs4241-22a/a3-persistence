ids = []

function initialize(e) {
    // After getting a response, ask for HTML of tasks to add
    fetch('/todo', {
        method: 'GET'
    }).then(async response => {
        let data = await response.json()
        let table = document.getElementById('todoTable')
        for (let task of data) {
            ids.push(task._id)
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
            editColumn.innerHTML = '<button class="editTask">Edit</bclassName>'

            let deleteColumn = row.insertCell(5)
            deleteColumn.innerHTML = '<button class="deleteTask">X</button>'
        }

        // TODO refactor to set handlers specifically for each one
        // TODO refactor this to be separate 'addRow' method
        // Add edit button handlers
        const editButtons = document.getElementsByClassName('editTask')
        let editBtnIdx = 0
        for (let button of editButtons) {
            button.onclick = editTask
            button.id = 'edit' + editBtnIdx
            editBtnIdx++
        }

        // Add delete button handlers
        const deleteButtons = document.getElementsByClassName('deleteTask')
        let deleteBtnIdx = 0
        for (let button of deleteButtons) {
            button.onclick = deleteTask
            button.id = 'delete' + deleteBtnIdx
            deleteBtnIdx++
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
    }).then(async response => {
        let obj = await response.json()
        ids.push(obj.insertedId)
        document.getElementById()
        updateTable(await response.json())
    }).catch(reason => {
        console.error(reason)
    })

    return false
}

function editTask(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    let idx = parseInt(e.target.id.substring(4))
    let id = ids[idx]
    fetch('/todo', {
        method: 'GET'
    }).then(async response => {
        let json = await response.json()
        let data = json[idx]
        document.getElementById('task').value = data.task
        document.getElementById('due-date').value = data.due_date
        document.getElementById('legend').textContent = 'Modify a TODO'
        document.getElementById('todoSubmit').onclick = updateTask
    }).catch((reason) => {
        console.error(reason)
    })
}

function updateTask(e) {
    e.preventDefault()

    const
        id = ids[parseInt(e.target.id.substring(6))],
        input_task = document.getElementById('task'),
        input_date = document.getElementById('due-date'),
        body = JSON.stringify({task: input_task.value, due_date: input_date.value})

    fetch('/todo/' + id, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body
    }).then(async response => {
        cancel(e)
        updateTable(await response.json())
    }).catch((reason) => {
        console.error(reason)
    })

    return false
}

function deleteTask(e) {
    e.preventDefault()
    cancel(e)
    let idx = parseInt(e.target.id.substring(6))
    let id = ids[idx]

    fetch('/todo/' + id, {
        method: 'DELETE',
    }).then(async response => {
        console.log(await response.json())
        document.getElementById('todoTable').deleteRow(idx)
    }).catch((reason) => {
        console.error(reason)
    })
    return false
}

function updateTable (json) {

    const table = document.getElementById('todoTable')
    let row = table.insertRow()



    let html =
        '<table id="todoTable">\n' +
        '        <tr>\n' +
        '            <th><strong>Task</strong></th>\n' +
        '            <th><strong>Creation Date</strong></th>\n' +
        '            <th><strong>Due Date</strong></th>\n' +
        '            <th><strong>Priority</strong></th>\n' +
        '            <th><strong>Edit</strong></th>\n' +
        '            <th><strong>Delete</strong></th>\n' +
        '        </tr>\n'
    let idx = 0
    for (let todo of json) {
        html += `<tr class="tableRow" id="${idx}">`
        html += '<th>' + todo.task + '</th>'
        html += '<th>' + new Date(todo.creation_date).toLocaleString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) + '</th>'
        html += '<th>' + new Date(todo.due_date).toLocaleString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) + '</th>'
        if (todo.priority === 'Late')
            html += '<th style="background-color: red; color: white">' + todo.priority + '</th>'
        else
            html += '<th>' + todo.priority + '</th>'
        html += '<th><button class="editTask">Edit</button></th>'
        html += '<th><button class="deleteTask">X</button></th>'
        html += '</tr>'
        idx++
    }
    html += '</table>'
    document.getElementById('todolist').innerHTML = html

    // Add edit button handlers
    const editButtons = document.getElementsByClassName('editTask')
    idx = 0
    for (let button of editButtons) {
        button.onclick = editTask
        button.id = 'edit' + idx
        idx++
    }

    // Add delete button handlers
    const deleteButtons = document.getElementsByClassName('deleteTask')
    idx = 0
    for (let button of deleteButtons) {
        button.onclick = deleteTask
        button.id = 'delete' + idx
        idx++
    }
}

const cancel = function (e) {
    document.getElementById('task').value = ''
    document.getElementById('due-date').value = ''
    document.getElementById('legend').textContent = 'Add a TODO'
    document.getElementById('todoSubmit').onclick = submit
}

window.onload = function () {
    // Show table immediately
    initialize()

    // Add submit functionality
    const todoSubmit = document.getElementById('todoSubmit')
    todoSubmit.onclick = submit

    const cancelButton = document.getElementById('cancel')
    cancelButton.onclick = cancel

    // Only enable submit button if fields are filled out
    const addTask = document.getElementById('addTask')[0]
    addTask.oninput = () => {
        document.getElementById('todoSubmit').disabled = document.getElementById('task').value.trim() === '' || document.getElementById('due-date').value.trim() === ''
    }
}