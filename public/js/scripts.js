const submit = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    let myForm = document.getElementById('primary')
    const output = {}

    for (let i = 0; i < myForm.elements.length; i++) {
        let element = myForm.elements[i]
        if (element.nodeName === 'INPUT') {
            if (element.value.length === 0) {
                alert('Empty input on', element.id)
                return
            }
            output[element.id] = element.value
        }
    }

    fetch('/api/newreminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(output)
    }).then((response) => {
        if (response.status === 200) { // sucessfully posted new data to server
            for (let i = 0; i < myForm.elements.length; i++) {
                myForm.elements[i].value = ''
            }
            // now update the table on html side
            updateTable()
        } else {
            alert('')
        }
    })

    return false
}

window.onload = () => {
    console.log('on loading')
    updateTable()
    const button = document.querySelector('button')
    button.onclick = submit
}

const updateTable = () => {  
    fetch('/api/getdata', {
        method:'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('dataTable')
        table.innerHTML = '<tr><th>Delete</th><th>Edit</th><th>Title</th><th>Notes</th><th>URL</th><th>Date</th><th>Time</th><th>Location</th></tr>'
        for (let information of data) {
            let rowLength = table.rows.length
            let row = table.insertRow(rowLength)

            row.id = information._id

            // make id the object id
            let deleteButton = document.createElement('input')            
            deleteButton.type = 'button'
            deleteButton.id = information._id
            deleteButton.className = 'Delete'
            deleteButton.style.background =  'rgba(255, 0, 0, 1)'
            deleteButton.setAttribute('value', 'Delete')
            deleteButton.onclick = (event) => {
                deleteReminder(event)
            }
            row.insertCell(0).appendChild(deleteButton)

            let editButton = document.createElement('input')            
            editButton.type = 'button'
            editButton.id = information._id
            editButton.className = 'Edit'
            editButton.style.background =  'rgba(0, 255, 0, 1)'
            editButton.setAttribute('value', 'Edit')
            editButton.onclick = (event) => {
                updateReminder(event)
            }
            row.insertCell(1).appendChild(editButton)

            console.log(information)
            let i = 2
            for (let title of ['title', 'notes', 'url', 'date', 'time', 'location']) {
                let cell = row.insertCell(i)
                cell.id = title + "_primary"
                cell.innerHTML = information[title.toLowerCase()]
                i++
            }
        }
    })  
}

const deleteReminder = (event) => {
    console.log('DELETEING REMINDER')
    fetch('/api/deletereminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({_id: event.target.id})
    }).then((response) => {
        console.log('HERE')
        if (response.status === 200) {
            console.log('succesfully posted delete')
            updateTable()
        }
    })
}

const updateReminder = (event) => {
    console.log('updateing reminder')
    document.getElementById(event.target.id).childNodes.forEach(e => {
        if (e.id !== '') {
            document.getElementById(e.id + '_edit').value = e.innerText

        }
    })

    document.querySelector('#button_edit').onclick = (e) => {
        e.preventDefault()
        let myForm = document.getElementById('edit')
        const output = {}

        for (let i = 0; i < myForm.elements.length; i++) {
            let element = myForm.elements[i]
            if (element.nodeName === 'INPUT') {
                if (element.value.length === 0) {
                    alert('Empty input on', element.id)
                    return
                }
                output[element.id.substring(0, element.id.length-5)] = element.value
            }
        }
        console.log(output)

        output['_id'] = event.target.id

        fetch('/api/updatereminder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(output)
        }).then((response) => {
            if (response.status === 200) {
                console.log('succesfully posted update')
                for (let i = 0; i < myForm.elements.length; i++) {
                    myForm.elements[i].value = ''
                }
                updateTable()
            }
        })
    }
}
