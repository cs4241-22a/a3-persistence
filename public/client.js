// client-side js
// run by the browser each time your view template is loaded

//console.log("hello world :o");

// our default array of dreams

// define variables that reference elements on our page
const Form = document.forms[0];
const destInput = Form.elements["destination"]; //miles,average
const milesInput = Form.elements["miles"];
const averageInput = Form.elements["average"];
const table = document.getElementById("results");
const modifybtn = document.getElementById("modifybtn");
const btn = document.getElementById("btn");
const loginbtn = document.getElementById("loginbtn");
const Form2 = document.forms[1];
const usernameInput = Form2.elements["username"];
const passwordInput = Form2.elements["password"];
const loginPage = document.getElementById("login");
const plannerPage = document.getElementById("planner");
const registerbtn = document.getElementById("registerbtn");
const warn = document.getElementById("warn");
let temp_item = null;
let user, pass;

// a helper function that creates a list item for a given dream

const updateTable = function () {
  //get request for info from mongo, reset table
  const rows = table.rows.length;
  for (let i = rows - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  fetch("/get", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: user }),
  })
    .then((response) => response.json())
    .then((json) => {
      //console.log("---");
      //console.log( json )
      json.forEach((item) => {
        const row = table.insertRow(1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        cell1.innerHTML = item.dest;
        cell2.innerHTML = item.miles;
        cell3.innerHTML = item.avg;
        cell4.innerHTML = item.time;
        cell5.innerHTML = "   X   ";
        cell6.innerHTML = "   ?   ";
        cell5.addEventListener("click", function () {
          del(item); //remove item
        });
        cell6.addEventListener("click", function () {
          modify(item); //remove item
        });
        cell5.classList.add("deleter");
      });
    });
};

const del = function (item) {
  modifybtn.setAttribute("hidden", "hidden");
  btn.removeAttribute("hidden");
  //console.log(item._id);
  fetch("/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then((json) => updateTable(json));
  //.then(updateTable);
  return false;
};

// iterate through every dream and add it to our page

// listen for the form to be submitted and add a new dream when it is
//Form.onsubmit = function (event) {

//};

const onclickSubmit = function () {
  // stop our form submission from refreshing the page
  event.preventDefault();

  const destvalue = destInput.value,
    milesvalue = milesInput.value,
    avgvalue = averageInput.value,
    time =
      (Math.round((milesvalue / avgvalue) * 100) / 100).toString(10) + " hours";

  fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dest: destvalue,
      miles: milesvalue,
      avg: avgvalue,
      time: time,
      username: user,
    }),
  })
    .then((response) => response.json())
    .then(updateTable(user));
  //.then((json) => console.log("json"))
  //.then(updateTable())
};

window.onload = function () {
  //console.log(user)
  if (typeof user !== "undefined") {
    updateTable();
    //console.log(user)
  } else {
    plannerPage.setAttribute("hidden", "hidden");
    loginPage.removeAttribute("hidden");
  }
};

const onclickModify = function () {
  modifybtn.setAttribute("hidden", "hidden");
  btn.removeAttribute("hidden");
  temp_item.dest = destInput.value;
  temp_item.miles = milesInput.value;
  temp_item.avg = averageInput.value;
  temp_item.time =
    (Math.round((temp_item.miles / temp_item.avg) * 100) / 100).toString(10) +
    " hours";
  fetch("/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(temp_item),
  })
    .then((response) => response.json())
    .then(updateTable());
  //.then((json) => console.log("json"))
  return false;
};

const modify = function (item) {
  temp_item = item;
  btn.setAttribute("hidden", "hidden");
  modifybtn.removeAttribute("hidden");
  destInput.value = item.dest;
  milesInput.value = item.miles;
  averageInput.value = item.avg;
  return false;
};

const onClickLogin = function () {
  user = usernameInput.value;
  pass = passwordInput.value;

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user,
      password: pass,
    }),
  })
    .then((response) => response.json())
    .then((login) => {
      if (login) {
        loginPage.setAttribute("hidden", "hidden");
        plannerPage.removeAttribute("hidden");
        updateTable(user);
        warn.innerHTML = "";
      } else {
        warn.innerHTML = "incorrect username or password";
      }
    });

  return false;
};

const onClickRegister = function () {
  user = usernameInput.value;
  pass = passwordInput.value;

  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user,
      password: pass,
    }),
  })
    .then((response) => response.json())
    .then((reg) => {
      if (reg) {
        onClickLogin();
        warn.innerHTML = "registered";
      } else {
        warn.innerHTML = "username taken";
      }
    });

  return false;
};

loginbtn.onclick = onClickLogin;
modifybtn.onclick = onclickModify;
btn.onclick = onclickSubmit;
registerbtn.onclick = onClickRegister;
