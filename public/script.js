//add player
const addPlayer = function(e) {
  //prevent default form action from being carried out
  e.preventDefault()
  const input1 = document.querySelector('#fplayerName')
  const input2 = document.querySelector('#fjerseyNumber')
  const input3 = document.querySelector('#fposition')
  const input4 = document.querySelector('#fclassYear')
  var json = { playerName: input1.value, jerseyNumber: input2.value, position: input3.value, classYear: input4.value},
      body = JSON.stringify(json);
  
  fetch('/addPlayer', {
    method:'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(function(response) {
    //do something with response
    var newContent = ""
    if(Array.isArray(response)){
      for(let i = 0; i < response.length; i++) {
        const thing = response[i]
        newContent += "<tr>" +
          "<td>" + thing.playerName + "</td>" +
          "<td>" + thing.jerseyNumber + "</td>" +
          "<td>" + thing.position + "</td>" +
          "<td>" + thing.classYear + "</td>" +
          "</tr>"
      }
    }
    newContent = "<table><tr><th>Player Name</th><th>JerseyNumber</th><th>Position</th><th>ClassYear</th></tr>" + newContent + "</table>"
    document.getElementById("dataTable").innerHTML = newContent;
  })
  
  return false
}



//delete player
const deletePlayer = function(e) {
  e.preventDefault()
  const input1 = document.querySelector('#dplayerName')
  var json = {playerName: input1.value},
  body = JSON.stringify(json);
  
    fetch('/deletePlayer', {
    method:'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(function(response) {
      //do something with response
    var newContent = ""
    if(Array.isArray(response)){
      for(let i = 0; i < response.length; i++) {
        const thing = response[i]
        newContent += "<tr>" +
          "<td>" + thing.playerName + "</td>" +
          "<td>" + thing.jerseyNumber + "</td>" +
          "<td>" + thing.position + "</td>" +
          "<td>" + thing.classYear + "</td>" +
          "</tr>"
      }
    }
    newContent = "<table><tr><th>Player Name</th><th>JerseyNumber</th><th>Position</th><th>ClassYear</th></tr>" + newContent + "</table>"
    document.getElementById("dataTable").innerHTML = newContent;
  })
  
  return false
}
  


//get table data from database system
const loadTable = function(e) {
  e.preventDefault()
  var json = { },
  body = JSON.stringify(json);
  
    fetch('/getTable', {
    method:'POST',
    body
  })
  .then(response => response.json())
  .then(function(response) {
    var newContent = ""
    if(Array.isArray(response)){
      for(let i = 0; i < response.length; i++) {
        const thing = response[i]
        newContent += "<tr>" +
          "<td>" + thing.playerName + "</td>" +
          "<td>" + thing.jerseyNumber + "</td>" +
          "<td>" + thing.position + "</td>" +
          "<td>" + thing.classYear + "</td>" +
          "</tr>"
      }
    }
    newContent = "<tr><th>Player Name</th><th>JerseyNumber</th><th>Position</th><th>ClassYear</th></tr>" + newContent
    document.getElementById("dataTable").innerHTML = newContent;
  })
  
  return false;
}
  

const updatePlayer = function(e) {
  e.preventDefault()
  const input1 = document.querySelector('#newplayerName')
  const input2 = document.querySelector('#newjerseyNumber')
  const input3 = document.querySelector('#newposition')
  const input4 = document.querySelector('#newclassYear')
  var json = {playerName: input1.value, jerseyNumber: input2.value, position: input3.value, classYear: input4.value},
  body = JSON.stringify(json);
  
    fetch('/update', {
    method:'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(function(response) {
    var newContent = ""
    if(Array.isArray(response)){
      for(let i = 0; i < response.length; i++) {
        const thing = response[i]
        newContent += "<tr>" +
          "<td>" + thing.playerName + "</td>" +
          "<td>" + thing.jerseyNumber + "</td>" +
          "<td>" + thing.position + "</td>" +
          "<td>" + thing.classYear + "</td>" +
          "</tr>"
      }
    }
    newContent = "<table><tr><th>Player Name</th><th>JerseyNumber</th><th>Position</th><th>ClassYear</th></tr>" + newContent + "</table>"
    document.getElementById("dataTable").innerHTML = newContent;
  })
  
  return false
}
  
window.onload = function() {
  const button1 = document.getElementById( 'addButton' )
  button1.onclick = addPlayer

  const button2 = document.getElementById( 'deleteButton' )
  button2.onclick = deletePlayer

  const button3 = document.getElementById( 'loadTable' )
  button3.onclick = loadTable

  const button4 = document.getElementById( 'updateButton' )
  button4.onclick = updatePlayer
}