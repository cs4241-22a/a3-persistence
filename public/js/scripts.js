const submit = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    let myForm = document.getElementById('mainform')
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

    for (let i = 0; i < myForm.elements.length; i++) {
        myForm.elements[i].value = ""
    }

    fetch('/api/newreminder', {
        method: 'POST',
        body: JSON.stringify(output)
    }).then((response) => {
        // sucessfully posted new data to server
        if (response.status === 200) {
            // now update the table on html side
            updateTable()
        } else {
            alert('')
        }
    })

    return false
}

window.onload = () => {
    updateTable()
    const button = document.querySelector('button')
    button.onclick = submit
}

const updateTable = () => {  
    fetch('/api/getdata', {
        method:'GET'
    })
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('dataTable')
        table.innerHTML = '<tr><th>Delete</th><th>Title</th><th>Notes</th><th>URL</th><th>Date</th><th>Time</th><th>Location</th></tr>'
        for (let information of data) {
            let rowLength = table.rows.length
            let row = table.insertRow(rowLength)
            let deleteButton = document.createElement('input')
            let btnName = 'Delete'
            
            deleteButton.type = 'button'
            deleteButton.id = rowLength + 1
            deleteButton.className = btnName
            deleteButton.style.background =  'rgba(255, 0, 0, 1)'
            deleteButton.setAttribute('value', btnName)
            deleteButton.onclick = (event) => {
                removeRow(event)
            }
            row.insertCell(0).appendChild(deleteButton)

            for (let i = 0; i < Object.keys(information).length; i++) {
                let cell = row.insertCell(i+1)
                cell.id = Object.keys(information)[i]
                cell.innerHTML = information[Object.keys(information)[i]]
            }
        }
    })  
}

const removeRow = (event) => {
    let table = document.getElementById('dataTable')
    let left = 1
    let right = table.rows.length-1

    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        console.log(mid)
        let cells = table.rows[mid].cells
        let pos = cells[0].children[0].id

        if (pos === event.target.id) {
            let output = {}
            for (let j = 1; j < cells.length; j++) {
                output[cells[j].id] = cells[j].innerHTML
            }
            deleteReminder(output)
            console.log('deleteing reminder')
            break
        } else if (parseInt(pos) < parseInt(event.target.id)) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
}

const deleteReminder = (output) => {
    fetch('/api/deletereminder', {
        method: 'POST',
        body: JSON.stringify(output)
    }).then((response) => {
        console.log('HERE')
        if (response.status === 200) {
            console.log('succesfully posted delete')
            updateTable()
        }
    })
}
