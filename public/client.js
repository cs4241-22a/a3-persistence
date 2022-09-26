const add = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const climbName = document.querySelector( '#climbName' ),
        grade = document.querySelector( '#grade' ),
        height = document.querySelector( '#height' ),
        json = { name: name.value, grade: grade.value, height: height.value},
        body = JSON.stringify( json )

    climbName.value = ''
    grade.value = ''
    height.value = ''

    fetch( '/addClimb', {
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: body,
    })
        .then( function( response ) {
            console.log( response )
        }).then(showData)

    return false
}

const update = function ( e ) {
    e.preventDefault()

    const user = user,
        name = document.querySelector ( '#update' ),
        json = { nameToUpdate: name.value },
        body = JSON.stringify( json )

    name.value = ''

    fetch(  '/update', {
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
        .then( function( response ) {
            console.log( response )
        }).then(showData)

    return false

}

const remove = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const climbName = document.querySelector( '#removeName' ),
        json = { nameToRemove: name.value },
        body = JSON.stringify( json )

    climbName.value = ''

    fetch( '/removeClimb', {
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
        .then( function( response ) {
            console.log( response )
        })
        .then(showData)

    return false
}

const showData = function() {
    fetch( '/show', {
        method:'GET'
    })
        .then( response => response.json())
        .then( json => initTable(json))

    return false

}



const initTable = function (json) {
    console.log("Initializing table")

    // Find a <table> element with id="myTable":
    var table = document.getElementById("dataTable");

    var rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    json.forEach(function(x) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(-1);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);


// Add some text to the new cells:
        cell1.innerHTML = x.name;
        cell2.innerHTML = x.grade;
        cell3.innerHTML = x.height;
    })

}

window.onload = function() {
    const submitButton = document.querySelector('#submitButton')
    submitButton.onclick = add
    const removeButton = document.querySelector('#removeButton')
    removeButton.onclick = remove

    showData()
}