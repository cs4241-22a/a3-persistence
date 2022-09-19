
let numResponse = 1;

window.onload = function () {
  const button = document.getElementById("add_btn");
  button.onclick = addResponseWindow;
  update();
};


const addResponseWindow = function(){
  document.getElementById('popup_addResponse').classList.toggle("is-active")
  const button = document.getElementById( 'addRes_btn' )
  button.onclick = submit 
}

const editResponseWindow = function(id){
  fetch('/getItem', {
    method:'POST',
    body: JSON.stringify({id: id}),
    headers:{
      "Content-Type":"application/json"
    }
  })
  .then(function (response) {
    return response.json()
  })
  .then( json => {
    
    let value = Object.values(json)
        document.getElementById("editname").value = value[1]
        document.getElementById("edityear").value = value[2]
        document.getElementById("editgender").value = value[3]
        document.getElementById("editcalories").value = value[4]
        document.getElementById("editfruit").value = value[6]

    const edit_btn = document.getElementById('edit_btn')
    
    edit_btn.onclick = function() {
      updateItem(id)
    }

    document.getElementById("popup_editResponse").classList.toggle("is-active")
  })
  
}

function closePopup() {
  document.getElementById("popup_addResponse").classList.remove("is-active")
  document.getElementById('inptName').value = ""
  document.getElementById('inptEmail').value = ""
  document.getElementById('inptNumber').value = ""
  document.getElementById('inptNotes').value = ""
  document.getElementById('inptAge').value = ""
  document.getElementById('counter').innerHTML=""
}

function closeEditWindow() {
  document.getElementById("popup_editResponse").classList.remove("is-active")
}

const getData = function() {
  fetch('getData', {
    method: 'GET'
  })
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    const text = document.getElementById( 'response_id' )
    text.innerHTML = 'Number of Responses: ' + Object.values(data).length
    buildTable('dataTable', data);
  })
}

const buildTable = function(tableId, data){
  let tableRef = document.getElementById(tableId)
  for(var i = tableRef.rows.length - 1; i > 0; i--)
      tableRef.deleteRow(i)


      let row = 1
  data.map( function (item){
      let newRow = tableRef.insertRow(-1)
      newRow.classList += "itemRow"
      
      
      let columnNum = tableRef.rows[0].cells.length
      

      for(let i=0; i < columnNum; i++){ 
       
          let newCell =  document.createElement("td")
          newCell.style.cssText += 'flex-wrap: wrap;'
          let value = Object.values(item)
          let newText 
         
          if(i == 0)
            newText = document.createTextNode(row)
          else 
            newText = document.createTextNode(value[i])

          newCell.appendChild(newText)
          newRow.appendChild(newCell)
      }
    newRow.onclick= function(){
      showEditWindow(item['_id'])
    }
    
      row++

  })

} 

function clear() {
  document.getElementById("name").value = "";
  document.getElementById("calories").value = "";
  document.getElementById("favoritefruit").value = "";
}
const submit = function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const year = document.getElementById("year").value;
  const gender = document.getElementById("gender").value;
  const calories = document.getElementById("calories").value;
  const favoritefruit = document.getElementById("favoritefruit").value;

  if (name.trim() === "" || calories.trim() === "" || favoritefruit.trim() === "") {
    alert("Please complete all fields.");
    return false;
  } else {
    numResponse++;

    const jsonData = {
      responseNum: numResponse,
      name: name,
      year: year,
      gender: gender,
      calories: calories,
      fiber: amountFiber(calories),
      favoritefruit: favoritefruit,
    };

    let body = JSON.stringify(jsonData);

    fetch("/submit", {
      method: "POST",
      body,
    })
    .then( response => response.json() )
    .then( json => {
      document.getElementById("name").value = "";
      document.getElementById("calories").value = "";
      document.getElementById("favoritefruit").value = "";
      closePopup()
      addToTable(json, json._id)
    })

    return true;
  }
};

function amountFiber(calories) {
  let fiber = 0;
  fiber = calories * 14 / 1000
  return fiber;
}

function signOut() {
  fetch( '/signOut', {
    method:'POST',
    body: JSON.stringify({test: 1}),
    headers:{
      "Content-Type":"application/json"
    }
  }).then( window.location.replace('/index.html') )
}

function update() {
  let table = document.getElementById("responses");
  table.innerHTML =
    "<tr><th>Response #</th><th>Name</th><th>Academic Year</th><th>Sex</th><th>Calories Consume Daily</th><th>Amount of Fiber Recommended Daily (g)<sup><a href='#fiberinfo'>2</a></sup></th><th>Favorite Fruit?</th><th>Delete/Edit Response</th></tr>";
  fetch("/getResponses", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (json) {
      let index = 0;
      for (let response of json) {
        
        response.responseNum = index;
        let row = table.insertRow(-1);
        console.log(index);
        let responseNum = row.insertCell(0);
        let name = row.insertCell(1);
        let year = row.insertCell(2);
        let gender = row.insertCell(3);
        let calories = row.insertCell(4);
        let fiber = row.insertCell(5);
        let favoritefruit = row.insertCell(6);
        let modify = row.insertCell(7);

        response.responseNum = index + 1;
        
        row.cells[0].innerHTML = response.responseNum;
        row.cells[1].innerHTML = response.name;
        row.cells[2].innerHTML = response.year;
        row.cells[3].innerHTML = response.gender;
        row.cells[4].innerHTML = response.calories;
        row.cells[5].innerHTML = response.fiber;
        row.cells[6].innerHTML = response.favoritefruit;      
        row.cells[7].innerHTML =
          `<button class='deleteButton' onclick=deleteRow(${index})>Delete</button>`
          `<button class='editButton' onclick=editRow(${index})>Edit</button>`;
        index++;
        
      }
    });
}
function deleteRow(rowIndex) {
  let confirmDelete = confirm(
    "Are you sure you want to delete this response?"
  );
  if (confirmDelete) {
    const json = {
      deletingResponse: rowIndex,
    };

    let body = JSON.stringify(json);
    fetch("/delete", {
      method: "POST",
      body,
    }).then(function () {
      update();
    });
  }
}
