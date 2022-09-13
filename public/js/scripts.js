const submitAssignment = function () {

    const input_assignment = document.getElementById('assignment')
    const input_subject = document.getElementById('subject')
    const input_date = document.getElementById('deadline')
    const json = {assignment: input_assignment.value, subject: input_subject.value, dead_line: input_date.value}
    const body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    }).then(async response => {
        createTable(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })

    input_assignment.value = ''
    input_subject.value = ''
    input_date.value = ''

    return false
}

const deleteAssignment = function (e) {

    fetch('/' + e.target.id.substring(6), {
        method: 'DELETE'
    }).then(async response => {
        createTable(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })
}

const createTable = function (json) {
    let html =
        '<table>\n' +
        '        <tr>\n' +
        '            <th>Assignment</th>\n' +
        '            <th>Subject</th>\n' +
        '            <th>Deadline</th>\n' +
        '            <th>Priority</th>\n' +
        '            <th>Delete</th>\n' +
        '        </tr>\n'
    let idx = 0
    for (let i of json) {
        html += `<tr class="tableRow" id="${idx}">`
        html += '<th>' + i.assignment + '</th>'
        html += '<th>' + i.subject + '</th>'
        html += '<th>' + i.dead_line + '</th>'
        html += '<th>' + i.priority + '</th>'
        html += '<th><button class="deleteAssignment">X</button></th>'
        html += '</tr>'
        idx++
    }
    html += '</table>'
    document.getElementById('assignmentTable').innerHTML = html

    const deleteButtons = document.getElementsByClassName('deleteAssignment')
    idx = 0
    for (let button of deleteButtons) {
        button.onclick = deleteAssignment
        button.id = 'delete' + idx
        idx++
    }
}

const showTable = function () {
    fetch('/list', {
        method: 'GET'
    }).then(async response => {
        createTable(await response.json())
    }).catch((reason) => {
        console.log(reason)
    })
}

window.onload = function () {
    showTable()

    const submit = document.getElementById('submit')
    submit.onclick = submitAssignment

}