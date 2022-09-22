// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const newsection = document.getElementById('entry-area');
const viewsection = document.getElementById('view-area');
const editsection = document.getElementById('edit-area');
const deletesection = document.getElementById('delete-area');

function hideAllViews() {
  viewsection.style.display = "none";
  editsection.style.display = "none";
  newsection.style.display = "none";
  deletesection.style.display = "none";
}

function editMsg(mid, name, msg) {
  console.log("edit " + mid)
  hideAllViews();
  document.getElementById("edit-mid").value = mid;
  document.getElementById("edit-message").value = msg;
  editsection.style.display = "block";
}

function deleteMsg(params) {
  console.log("delete " + params)
  hideAllViews();
  document.getElementById("del-mid").value = params;
  deletesection.style.display = "block";
}

function showNew() {
  hideAllViews();
  newsection.style.display = "block";
}

function showMessages() {
  hideAllViews();
  viewsection.style.display = "block";
}


const submitnew = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const msginput = document.getElementById("message")
  let json = { message: msginput.value, action: "new" }
  let body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })
    .then(function (response) {
      // do something with the reponse 
      console.log(response)
      document.getElementById('newsub').disabled = true;
      document.getElementById("newsub").textContent = "success!"
      updateList();
      setTimeout(function () {
        document.getElementById("message").value = ""
        document.getElementById("newsub").disabled = false;
        document.getElementById("newsub").textContent = "Submit"
      }, 100);
    })

  return false
}

const submitdelete = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const mid = document.querySelector('#del-mid')
  let json = { action: "delete", mid: mid.value }
  let body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })
    .then(function (response) {
      // do something with the reponse 
      console.log(response)
      document.getElementById('delcan').disabled = true;
      document.getElementById("delsub").disabled = true;
      document.getElementById("delsub").textContent = "deleting..."
      updateList();
      setTimeout(function () {
        showMessages();
        document.getElementById('delcan').disabled = false;
        document.getElementById("delsub").disabled = false;
        document.getElementById("delsub").innerHTML = "<i class=\"trash alternate icon\"></i> Delete"
      }, 100);
    })

  return false
}

const submitedit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const msginput = document.querySelector('#edit-message')
  const mid = document.querySelector('#edit-mid')
  let json = { message: msginput.value, action: "edit", mid: mid.value }
  let body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })
    .then(function (response) {
      // do something with the reponse 
      console.log(response)
      document.getElementById('editcan').disabled = true;
      document.getElementById("editsub").disabled = true;
      document.getElementById("editsub").textContent = "editing..."
      updateList();
      setTimeout(function () {
        showMessages();
        document.getElementById('editcan').disabled = false;
        document.getElementById("editsub").disabled = false;
        document.getElementById("editsub").textContent = "Submit"
      }, 100);
    })

  return false
}

const formCancel = function (e) {
  e.preventDefault();
  showMessages();
  return false;
}

function updateList(params) {
  //Update list view
  const msglist = document.getElementById('msglist');
  fetch('/getmsg', {
    method: 'GET'
  }).then(response => response.json())
    .then((json) => {
      //console.log(json)
      // do something with the reponse 
      msglist.innerHTML = ""
      let wordcounter = 0
      json.forEach(element => {
        wordcounter += element.wordcount
        if (element.name == document.getElementById("username").innerHTML) {
          msglist.innerHTML += (element.name + " said: " + element.message + "   <a href=\"#\" onclick=\"editMsg(" + element.mid + ",'" + element.name + "','" + element.message + "')\">Edit</a> <a href=\"#\" onclick=\"deleteMsg(" + element.mid + ")\">Delete</a><br/>");
        } else {
          msglist.innerHTML += (element.name + " said: " + element.message + "<br/>");
        }
      });
    })
}
function timeoutfetch(url, timeout = 300) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);
}
function updatePing() {
  const servconn = document.getElementById('serv-conn');
  timeoutfetch('/ping', 1300) // throw after max 5 seconds timeout error
    .then((result) => {
      servconn.textContent = "✓ Server Online"
      servconn.style.fontSize = 8;
      servconn.style.color = "#007700"
      updateList();
    })
    .catch((e) => {
      console.error(e)
      servconn.textContent = "✘ Server Unreachable!"
      servconn.style.color = "#ff0000"
    })
}

window.onload = function () {
  newsection.style.display = "block";

  const newbutton = document.getElementById('newsub');
  newbutton.onclick = submitnew

  const editbutton = document.getElementById('editsub');
  editbutton.onclick = submitedit

  const deletebutton = document.getElementById('delsub');
  deletebutton.onclick = submitdelete

  const delcanbutton = document.getElementById('delcan');
  delcanbutton.onclick = formCancel
  const editcanbutton = document.getElementById('editcan');
  editcanbutton.onclick = formCancel
  updateList();
  //updatePing();
  /*var intervalId = setInterval(function () {
    //console.log("Pinging server...")
    updatePing();
  }, 1500);*/
}
