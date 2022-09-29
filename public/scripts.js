// Functionality for add button
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const todoForm = document.querySelector(".needs-validation")

    if (!todoForm.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        todoForm.classList.add("was-validated")
        return
    }

    const task = document.querySelector("#task"),
          category = document.querySelector("#category"),
          deadline = document.querySelector("#deadline"),
          priority = document.querySelector("#priority"),
          json = {
            task: task.value,
            category: category.value,
            deadline: deadline.value,
            priority: priority.value
          },
          body = JSON.stringify( json )

    fetch( '/add', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body 
    })
    .then( response => response.json() )
    .then( json => {
        getData()

        // Clear input fields
        task.value = ""
        category.selectedIndex = 0
        deadline.value = ""
        priority.selectedIndex = 0
    })

    todoForm.classList.remove("was-validated")

    return false
}

// Functionality for remove button
const remove = function( e, id ) {
    e.preventDefault()
    
    const json = {
        _id: id
    },
    body = JSON.stringify( json )

    fetch( '/remove', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
    .then( response => response.json() )
    .then( json => {
        getData()
    })
    
    return false
}

// Functionality for modify button
const update = function( e, id ) {
    e.preventDefault()

    let row = document.getElementById(id)
    let data = row.children
    let task = data[0].innerText
    let category = data[1].innerText
    let deadline = data[2].innerText
    let priority = data[3].innerText
    let saveButton = data[4].children[0]
    saveButton.innerText = "Save"
    let cancelButton = data[4].children[1]
    cancelButton.innerText = "Cancel"

    // Create task input
    const taskInput = document.createElement("input")
    taskInput.className = "form-control user-input"
    taskInput.type = "text"
    taskInput.value = task
    if (data[0].firstChild !== null) {
        data[0].removeChild(data[0].firstChild)
    }
    data[0].appendChild(taskInput)

    // Create category dropdown
    if (data[1].firstChild !== null) {
        data[1].removeChild(data[1].firstChild)
    }
    const categorySelect = document.createElement("select")
    categorySelect.className = "form-select user-input"

    // Create the category dropdown options
    const school = document.createElement("option")
    school.value = "School"
    school.innerText = "School"
    const work = document.createElement("option")
    work.value = "Work"
    work.innerText = "Work"
    const personal = document.createElement("option")
    personal.value = "Personal"
    personal.innerText = "Personal"
    const health = document.createElement("option")
    health.value = "Health"
    health.innerText = "Health"
    const other = document.createElement("option")
    other.value = "Other"
    other.innerText = "Other"

    // Set the selected value for category
    if (category === "School") {
        school.selected = "selected"
    } else if (category === "Work") {
        work.selected = "selected"
    } else if (category === "Personal") {
        personal.selected = "selected"
    } else if (category === "Health") {
        health.selected = "selected"
    } else if (category === "Other") {
        other.selected = "selected"
    }

    // Add the options to the category dropdown
    categorySelect.appendChild(school)
    categorySelect.appendChild(work)
    categorySelect.appendChild(personal)
    categorySelect.appendChild(health)
    categorySelect.appendChild(other)
    data[1].appendChild(categorySelect)

    // Create deadline input
    const deadlineInput = document.createElement("input")
    deadlineInput.className = "form-control user-input"
    deadlineInput.type = "date"
    deadlineInput.value = deadline
    if (data[2].firstChild !== null) {
        data[2].removeChild(data[2].firstChild)
    }
    data[2].appendChild(deadlineInput)

    // Create priority dropdown
    if (data[3].firstChild !== null) {
        data[3].removeChild(data[3].firstChild)
    }
    const prioritySelect = document.createElement("select")
    prioritySelect.className = "form-select user-input"

    // Create the priority dropdown options
    const low = document.createElement("option")
    low.value = "Low"
    low.innerText = "Low"
    const medium = document.createElement("option")
    medium.value = "Medium"
    medium.innerText = "Medium"
    const high = document.createElement("option")
    high.value = "High"
    high.innerText = "High"

    // Set the selected value for priority
    if (priority === "Low") {
        low.selected = "selected"
    } else if (priority === "Medium") {
        medium.selected = "selected"
    } else if (priority === "High") {
        high.selected = "selected"
    }

    // Add the options to the priority dropdown
    prioritySelect.appendChild(low)
    prioritySelect.appendChild(medium)
    prioritySelect.appendChild(high)
    data[3].appendChild(prioritySelect)

    // Functionality for save button
    saveButton.addEventListener("click", event => {
        event.preventDefault()
        const json = {
            _id: id,
            task: taskInput.value,
            category: categorySelect.value,
            deadline: deadlineInput.value,
            priority: prioritySelect.value
          }
        fetch( '/update', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( json )
        })
        .then( response => response.json() )
        .then( data => {
            getData()
        })
    })

    // Functionality for cancel button
    cancelButton.onclick = event => {
        event.preventDefault()
        getData()
    }
}

function getData() {
    fetch( '/docs', {
        method:'POST'
    })
    .then( response => response.json() )
    .then( data => {
        createTable(data)
    })
}

// Create table from the data
function createTable( data ) {
    document.querySelector("#todo-table").innerHTML = ""

    const header = document.createElement("thead")

    if (data.length > 0) {
        const headerRow = document.createElement("tr")

        // Create and add headers to table
        const taskHeader = document.createElement("th")
        taskHeader.innerText = "Task"
        const categoryHeader = document.createElement("th")
        categoryHeader.innerText = "Category"
        const deadlineHeader = document.createElement("th")
        deadlineHeader.innerText = "Deadline"
        const priorityHeader = document.createElement("th")
        priorityHeader.innerText = "Priority"
        const actionsHeader = document.createElement("th")
        actionsHeader.innerText = "Actions"

        headerRow.appendChild(taskHeader)
        headerRow.appendChild(categoryHeader)
        headerRow.appendChild(deadlineHeader)
        headerRow.appendChild(priorityHeader)
        headerRow.appendChild(actionsHeader)

        header.appendChild(headerRow)
        document.querySelector("#todo-table").appendChild(header)
    }

    const body = document.createElement("tbody")

    // Create table rows
    data.forEach( item => {
        const dataRow = document.createElement("tr")
        dataRow.id = item._id

        const taskData = document.createElement("td")
        taskData.innerText = item.task
        const categoryData = document.createElement("td")
        categoryData.innerText = item.category
        const deadlineData = document.createElement("td")
        deadlineData.innerText = item.deadline

        const priorityData = document.createElement("td")
        const badge = document.createElement("span")

        if (item.priority === "Low") {
            badge.className = "badge text-bg-success"
        } else if (item.priority === "Medium") {
            badge.className = "badge text-bg-warning"
        } else if (item.priority === "High") {
            badge.className = "badge text-bg-danger"
        }
        
        badge.innerText = item.priority
        priorityData.appendChild(badge)

        dataRow.appendChild(taskData)
        dataRow.appendChild(categoryData)
        dataRow.appendChild(deadlineData)
        dataRow.appendChild(priorityData)

        const buttonData = document.createElement("td")

        // Create modify button
        const modifyButton = document.createElement("button")
        modifyButton.innerText = "Modify"
        modifyButton.className = "btn btn-outline-secondary btn-sm me-2"
        modifyButton.onclick = (e) => {update(e, item._id)}

        // Create remove button
        const removeButton = document.createElement("button")
        removeButton.innerText = "Remove"
        removeButton.className = "btn btn-outline-secondary btn-sm remove-button"
        removeButton.onclick = (e) => {remove(e, item._id)}

        buttonData.appendChild(modifyButton)
        buttonData.appendChild(removeButton)
        
        dataRow.appendChild(buttonData)

        body.appendChild(dataRow)
    })
    document.querySelector("#todo-table").appendChild(body)
}

window.onload = function() {
    fetch( '/user', {
        method:'POST'
    })
    .then( response => response.json() )
    .then( user => {
        document.getElementById("message").innerHTML = `Hello, ${user.username}! Welcome to your personal to-do list.`

        if (user.newUser) {
            alert("Your user account has been created.")
        }
    })

    getData()

    const addButton = document.getElementById("add-button")
    addButton.onclick = submit
}
