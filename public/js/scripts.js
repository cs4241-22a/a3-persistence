let Todo = []
const task = document.getElementById('to_do')
const date = document.querySelector('#date')
const priority = document.querySelector('#priority')
const results = document.getElementById("results")
const add = document.querySelector('#add')

function isEmpty(){
    if (task.value === "" || date.value === "" || task.value === null || date.value === null || priority.value === "none" || priority.value === null){
        alert("Please fill out all fields")
        return true
    }
    return false
}

add.onclick = function (event){
    event.preventDefault()
    if (isEmpty() === false) {
        add_row()
    }
}
function add_row(){
    const json = {
        Task: task.value,
        Date: date.value,
        Priority: priority.value
    }


    const table_len = (results.rows.length)
    results.insertRow(table_len).innerHTML= "<tr id='row"+table_len+"'><td id='task_row"+table_len+"'>"+task.value+"</td><td id='date_row"+table_len+"'>"+date.value+"</td><td id='priority_row"+table_len+"'>"+priority.value+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input hidden type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>"

    Todo.push(json)
    task.value = ""
    date.value = ""
    priority.value = ""
    // fetch('/add', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(json)
    // })
    //     .then(response => response.json())
}
function edit_row(index)
{
    document.getElementById("edit_button"+index).style.display="none";
    document.getElementById("save_button"+index).style.display="block";

    let task=document.getElementById("task_row"+index);
    let date=document.getElementById("date_row"+index);
    let priority=document.getElementById("priority_row"+index);

    let task_data=task.innerHTML;
    let date_data=date.innerHTML;
    let priority_data=priority.innerHTML;

    task.innerHTML="<input type='text' id='task_text"+index+"' value='"+task_data+"'>";
    date.innerHTML="<input type='text' id='date_text"+index+"' value='"+date_data+"'>";
    priority.innerHTML="<input type='text' id='priority_text"+index+"' value='"+priority_data+"'>";
}

function save_row(index){

    let task_val=document.getElementById("task_text"+index).value;
    let date_val=document.getElementById("date_text"+index).value;
    let priority_val=document.getElementById("priority_text"+index).value;

    document.getElementById("task_row"+index).innerHTML=task_val;
    document.getElementById("date_row"+index).innerHTML=date_val;
    document.getElementById("priority_row"+index).innerHTML=priority_val;

    document.getElementById("edit_button"+index).style.display="block";
    document.getElementById("save_button"+index).style.display="none";

 //   fetch('/edit', {
//     method:'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body:JSON.stringify( json )
// })
//     .then( response => response.json())
}


function delete_row(){
    //document.getElementById("row"+index).outerHTML="";
    let i = event.target.parentNode
    let tr = i.parentNode
    tr.parentNode.removeChild(tr)

    // fetch('/delete', {
//     method:'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body:JSON.stringify( json )
// })
//     .then( response => response.json())
// }
}


