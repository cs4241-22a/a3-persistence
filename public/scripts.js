const updateTable = function(){
  fetch('/NotesBase',{
    method: "GET"
  }).then(function(response){
    let tbl = document.getElementById("list");
    //cllean table for new data
    for( let x = tbl.rows.length - 1; x > 0; x--){
      tbl.deleteRow(x);
    }
    for(let y = 0; y < response.length; y++){
      //new row
      const nrow = tbl.insertRow(y+1);
      //new cells
      const ntitle = nrow.insertCell(0);
      const ncontents = nrow.insertCell(1);
      ntitle.innerHTML = response[y].title;
      ncontents.innerHTML = response[y].contents;
    }
  })
}

const addNote = function(e){
  e.preventDefault();
  const rtitle = document.querySelector("#title");
  const rcontents = document.querySelector("#contents");
  const json = {title: rtitle.value, contents: rcontents.value};
  const body = JSON.stringify(json);
  
  fetch('/add', {
    method: "POST", headers: {"Content-Type": "application/json"},
    body}).then(function(response){
    console.log("posted")
  })
  updateTable();
}

const deleteNote = function(e){
  e.preventDefault();
  const rdelete = document.querySelector("#index");
  const json = {removed: rdelete.value};
  const body = JSON.stringify(json);
  
  fetch("/remove",{
    method:"POST", headers: {"Content-Type": "application/json"},
    body
  }).then(function(response){
    console.log("removed")    
  })
  updateTable();
}

window.onload = function(){
  updateTable();
  const addBtn = document.querySelector("#add");
  const deleteBtn = document.querySelector("#delete")
  addBtn.onclick= addNote;
  deleteBtn.onclick= deleteNote;
}
