
let editModal = null
let saveEditBtn = null
let editId = null
let csrf = null
let user = null

const editData = (id, note) => {
    document.getElementById('editedText').setAttribute('value', note)
    editId.setAttribute('value', id)
    //open modal
    editModal.show()
}

const submitEdits = () => {
    var id = editId.getAttribute('value')
    var text = document.getElementById('editedText').value
    
    if (id !== "" && id != "-1") {
        editModal.hide()
        editId.setAttribute('value', '-1')
        document.getElementById('editedText').setAttribute('value', '')
        fetch(`/edit`, {
            method: "POST",
            headers: {"X-CSRF-TOKEN": csrf, "Content-Type": "application/json"},
            body: JSON.stringify({_id: id, note: text, owner_id: user})
        })
            .then(async function (response) {
                var data = await response.json()
                console.log(data)
                console.log("response ^")
                updateTable(data)
            });
    }
}


const deleteData = function (id) {
    console.log("Deleting id: %s", id)
    fetch(`/delete`, {
        method: "POST",
        headers: {"X-CSRF-TOKEN": csrf, "Content-Type": "application/json"},
        body: JSON.stringify({_id: id, owner_id: user})
    })
        .then(async function( response ) {
            var data = await response.json()
            console.log( data )
            console.log("response ^")
            updateTable(data)
        });
}

const handleSubmit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const form = e.target
    var data = {};
    for (var i = 0, ii = form.length; i < ii; ++i) {
        var input = form[i];
        if (input.name) {
            data[input.name] = input.value;
        }
    }
    
    const body = JSON.stringify(data)
    console.log(body)

    fetch( '/addItem', {
        method:'POST',
        headers: {"X-CSRF-TOKEN": csrf, "Content-Type": "application/json"},
        body
    })
        .then(async function( response ) {
            var data = await response.json()
            console.log( data )
            console.log("response ^")
            form.reset()
            updateTable(data)
        })

    return false
}

const updateTable = (dataJ) => {
    const table = document.querySelector('tbody')
    table.innerHTML = ""
    
    document.getElementById('noData').hidden = dataJ.length > 0
    
    dataJ.map((value, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${index+1}</th>
                        <td>${value.note}</td>
                        <td><button type="button" id="edit_${value._id}" class="btn btn-sm btn-outline-primary">Edit</span></button><button type="button" id="delete_${value._id}" class="btn btn-sm btn-danger">Delete</button></td>`;
        row.dataset.ind = index;
        
        table.appendChild(row);
        document.getElementById(`delete_${value._id}`).onclick = () => {deleteData(value._id); return false;}
        document.getElementById(`edit_${value._id}`).onclick = () => {editData(value._id, value.note)}
    });
}

window.onload = function() {
    editModal = new bootstrap.Modal(document.getElementById('editModal'), {
        backdrop: true,
        keyboard: false,
        focus: false
    })
    csrf = document.getElementById("csrf").getAttribute('value')
    user = document.getElementById("user")
    if (user != null){
        user = parseInt(user.getAttribute('value'))
        saveEditBtn = document.getElementById("saveEditBtn")
        editId = document.getElementById('editId');
        
        const form = document.getElementById('noteForm')
        form.addEventListener('submit', handleSubmit);
        saveEditBtn.addEventListener('click', submitEdits)
        console.log("Window loaded")
    
    
        fetch( '/getNotes', {
            method: 'POST',
            headers: {"X-CSRF-TOKEN": csrf, "Content-Type": "application/json"},
            body: JSON.stringify({"owner_id": user})
        }).then(
            async function( response ) {
                var data = await response.json()
                console.log(data)
                console.log("response ^")
                updateTable(data)
            }
        );
    }
    else {
        console.log("User not logged in!")
    }
}