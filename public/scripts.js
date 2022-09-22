let rowsAdded = 0 //keeps track of how many rows of data our table has (useful for clearing the table)
let dataUpdated = 0 //lets the page know that the data has been displayed to the user on first opening
//let deletedRow = 0 //tells the page which row to delete when the user presses a delete row button

//updates the table with the data that the server sends back
const updateTable = function ( json ) {
    const table = document.getElementById("datatable")
    const dataLength = json.length
    //if no trail name specified, we cleared the server so we need to clear the table
    if(dataLength === 0) {
        //no data found for this user yet. display a placeholder until the user adds data
        const user = document.getElementById('userdisplay')
        user.innerText = "No existing data found for current user."
        for(let i = 0; i < rowsAdded; i++) {
            table.deleteRow(-1) //will remove the last row always
        }
        rowsAdded = 0
    } else {
        //clear all rows
        for(let i = 0; i < rowsAdded; i++) {
            table.deleteRow(-1) //will remove the last row always
        }
        rowsAdded = 0
        //add all the data back

        //display logged in user
        //all our sent back data will have the same user, so we can always just look at the first one
        const user = document.getElementById('userdisplay')
        user.innerText = "Displaying data for user: " + json[0].username

        //this is so that all the rows are displayed on page load and not just the last one
        for(let i = 0; i < dataLength; i++) {
            //insert row for new data
            const row = table.insertRow()
            rowsAdded++
            //insert cells for this row
            let cell = row.insertCell()
            cell.innerHTML = json[i].name
            cell = row.insertCell()
            cell.innerHTML = json[i].length
            cell = row.insertCell()
            cell.innerHTML = json[i].elevation
/*            //create the button for this row
            let btn = document.createElement('input')
            btn.type = "button";
            btn.className = "deletebutton";
            btn.value = "Delete";
            btn.id = "Delete" + rowsAdded
            cell.appendChild(btn)*/
        }
    }
}

/*const deleteRow = function () {

    const json = {
        name: "!delete",
        rownum: deletedRow
    }

    fetch( '/submit', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( json )
    })
        .then( response => response.json() )
        .then( json => {
            updateTable(json)
        })
    return false
}*/

const clear = function () {

    const json = {
        name: "!clear"
    }

    fetch( '/clear', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( json )
    })
        .then( response => response.json() )
        .then( json => {
            update()
        })
    return false
}

const update = function () {
    const json = {
        name: "!update"
    }

    fetch( '/update', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( json )
    })
        .then( response => response.json() )
        .then( json => {
            updateTable(json)
        })
    return false
}

const submit = function() {

    const input = {
        name: document.querySelector( '#trailname' ),
        length: document.querySelector( '#traillength' ),
        elevation: document.querySelector( '#trailelevation' ),
    }
    const json = {
        name: input.name.value,
        length: input.length.value,
        elevation: input.elevation.value,
    }

    fetch( '/submit', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( json )
    })
        .then( response => response.json() )
        .then( json => {
            update()
        })
    return false
}

window.onload = function() {
    //clear the data from the last session that is 'stuck' on the server so this session doesn't have leftovers
    //we can do this by just submitting the empty fields right as the window loads the first time
    if(dataUpdated === 0) {
        update()
        dataUpdated = 1
    }

    const submitbutton = document.getElementById( 'submitbutton' )
    const clearbutton =  document.getElementById( 'clearbutton' )
//    let deletebutton = document.getElementsByClassName('deletebutton')
    submitbutton.onclick = function(e) {
        //just in case button type=button doesn't prevent the submit action
        e.preventDefault()

        //make sure the user filled in all the fields
        const trail = document.querySelector( '#trailname' ).value
        const len = document.querySelector( '#traillength' ).value
        const elev = document.querySelector( '#trailelevation' ).value
        if(trail === '' || len === '' || elev === '') {
            alert("please fill in all the fields.")
        } else {
            submit()
        }
    }
    clearbutton.onclick = function(e) {
        e.preventDefault()
        clear()
    }
/*    deletebutton.onclick = function(e) {
        e.preventDefault()
        //get row of clicked button
        let buttonid = e.target.id
        deletedRow = parseInt(buttonid.slice(6)) //slices number off of button id
        //delete the row
        deleteRow()

        //update the buttons
    }*/

}