// const { Collection } = require("mongodb");
// const { database } = require("../../config/keys");

window.onload = function () {
  //const sbutton = document.querySelector('button')
  const sbutton = document.getElementById("addrecord");
  sbutton.onclick = AddRecord;
  const ebutton = document.getElementById("editrecord");
  ebutton.onclick = returnEditedStudent;
};

const AddRecord = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();
  const firstPage = document.querySelector("#firstPage");
  //const table = document.createElement("table")
  //table.id = "storedData"
  const table = document.getElementById("storedData");
  table.innerHTML = "";
  table.innerHTML +=
    "<tr><th>Class</th>" +
    "<th>Assignment1 Score</th>" +
    "<th>Assignment2 Score</th>" +
    "<th>Project Score </th>" +
    "<th>Exam Score</th>" +
    "<th>Final Grade</th>" +
    "<th>Delete</th>"+
    "<th>Edit</th></tr>";
  //const firstPage = document.querySelector("#firstPage");
  const studentName = document.querySelector("#studentName"),
    a1score = document.querySelector("#a1score"),
    a2score = document.querySelector("#a2score"),
    projectSc = document.querySelector("#projectSc"),
    examScore = document.querySelector("#examScore");
  console.log("this is the recently added class" + studentName.value);
  
  const json = {
    studentName: studentName.value,
    a1score: a1score.value,
    a2score: a2score.value,
    projectSc: projectSc.value,
    examScore: examScore.value,
  };

  const body = JSON.stringify(json);
  console.log("Recently adding record (body): ------------")
  console.log(json)
  console.log("------------------------------")


// client: /AddRecord                      server: /AddRecord
// client expects: the whole database              add the record to the database, then Collection.find({})

  fetch("/AddRecord", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      // here the response is an array of the records in the whole database with the specific user
      //table.innerHTML = "<form>"
      console.log("getting all the records after fetching: ------------")
      console.log(json)
      console.log("------------------------------")
      json.forEach((student, index) => {
        table.innerHTML +=
          "<tr id=entry" +
          index +
          "><td id=class-entry"+student.index+">" +
          student.studentName +
          "</td>" +
          "<td id=a1-entry"+student.index+">" +
          student.a1score +
          "</td>" +
          "<td id=a2-entry"+student.index+">" +
          student.a2score +
          "</td>" +
          "<td id=p-entry"+student.index+">" +
          student.projectSc +
          "</td>" +
          "<td id=e-entry"+student.index+">" +
          student.examScore +
          "</td>" +
          "<td>" +
          student.final_score +
          "</td>" +
          //+ "<td>" + "<button type='button' onclick=deleteStudent("+ index + ")>X</button>" +"</td></tr>"
          "<td>" +
          "<button type='button' id =" + student.index +
          " onclick=deleteStudent(this.id)>X</button>" +
          "</td>" +
          "<td>" +
          "<button type='button' id =" + student.index +
          " onclick=editStudent(this.id)>O</button>" +
          "</td></tr>";
      });
      //table.innerHTML += "</form>"
    });
  //"<span class='glyphicon glyphicon-remove' />"
  //console.log(student.finalScore)
  document.body.appendChild(table);
  firstPage.reset(); // this resets the forms fields to empty

  // fetch("/getRecords", {
  //   method: "GET"
  // })
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log("Getting the records after fetching: ------------")
  //     console.log(json)
  //     console.log("------------------------------")
  //     json.forEach((student, index) => {
  //       table.innerHTML +=
  //         "<tr id=entry" +
  //         index +
  //         "><td>" +
  //         student.studentName +
  //         "</td>" +
  //         "<td>" +
  //         student.a1score +
  //         "</td>" +
  //         "<td>" +
  //         student.a2score +
  //         "</td>" +
  //         "<td>" +
  //         student.projectSc +
  //         "</td>" +
  //         "<td>" +
  //         student.examScore +
  //         "</td>" +
  //         "<td>" +
  //         student.final_score +
  //         "</td>" +
  //         //+ "<td>" + "<button type='button' id ="+index+" onclick=deleteStudent("+ index + ")>X</button>" +
  //         //"</td></tr>"
  //         "<td>" +
  //         "<button type='button' id =" + student.index +
  //         " onclick=deleteStudent(this.id)>X</button>" +
  //         "</td></tr>";
  //     });
  //   });

  return false;

};

function deleteStudent(buttonId) {
  const table = document.getElementById("storedData");
  /* table.innerHTML += "<tr><th>Student</th>"
      + "<th>Assignment1 Score</th>"
      + "<th>Assignment2 Score</th>"
      + "<th>Project Score </th>"
      + "<th>Exam Score</th>"
      + "<th>Final Grade</th>"
      + "<th>Delete</th></tr>" */

  let json = {
    index: buttonId,
  };
  console.log("Json of the record we are trying to delete: ------------")
  console.log(json)
  console.log("------------------------------")

  let body = JSON.stringify(json);
  fetch("/deleteRecord", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("returning json record after deleting: ------------")
      console.log(json)
      console.log("------------------------------")
      //table.innerHTML = "<form>"
      table.innerHTML = "";
      //let table =
      table.innerHTML +=
        "<tr><th>Class</th>" +
        "<th>Assignment1 Score</th>" +
        "<th>Assignment2 Score</th>" +
        "<th>Project Score </th>" +
        "<th>Exam Score</th>" +
        "<th>Final Grade</th>" +
        "<th>Delete</th>"+
        "<th>Edit</th></tr>";

      json.forEach((student, index) => {
        console.log(student);
        table.innerHTML +=
          "<tr id=entry" +
          index +
          "><td id=class-entry"+student.index+">" +
          student.studentName +
          "</td>" +
          "<td id=a1-entry"+student.index+">" +
          student.a1score +
          "</td>" +
          "<td id=a2-entry"+student.index+">" +
          student.a2score +
          "</td>" +
          "<td id=p-entry"+student.index+">" +
          student.projectSc +
          "</td>" +
          "<td id=e-entry"+student.index+">" +
          student.examScore +
          "</td>" +
          "<td>" +
          student.final_score +
          "</td>" +
          //+ "<td>" + "<button type='button' onclick=deleteStudent("+ index + ")>X</button>" +"</td></tr>"
          "<td>" +
          "<button type='button' id =" + student.index +
          " onclick=deleteStudent(this.id)>X</button>" +
          "</td>" +
          "<td>" +
          "<button type='button' id =" + student.index +
          " onclick=editStudent(this.id)>O</button>" +
          "</td></tr>";
      });
      //table.innerHTML += "</form>"
    });
  //const table = document.getElementById("storedData")

  //firstPage.reset(); // this resets the forms fields to empty
  //table.innerHTML = ""

  return false;
}


function editStudent(buttonId) {
  const table = document.getElementById("storedData");
  /* table.innerHTML += "<tr><th>Student</th>"
      + "<th>Assignment1 Score</th>"
      + "<th>Assignment2 Score</th>"
      + "<th>Project Score </th>"
      + "<th>Exam Score</th>"
      + "<th>Final Grade</th>"
      + "<th>Delete</th></tr>" */
  
  //const inputForm = document.forms("firstPage");

  sessionStorage.setItem("index", buttonId)

  document.querySelector("#studentName").value = document.querySelector("#class-entry"+buttonId).innerHTML;
  document.querySelector("#a1score").value = document.querySelector("#a1-entry"+buttonId).innerHTML;
  document.querySelector("#a2score").value = document.querySelector("#a2-entry"+buttonId).innerHTML;
  document.querySelector("#projectSc").value = document.querySelector("#p-entry"+buttonId).innerHTML;
  document.querySelector("#examScore").value = document.querySelector("#e-entry"+buttonId).innerHTML;

  const studentName = document.querySelector("#studentName"),
    a1score = document.querySelector("#a1score"),
    a2score = document.querySelector("#a2score"),
    projectSc = document.querySelector("#projectSc"),
    examScore = document.querySelector("#examScore");
  
  let json = {
    studentName: studentName.value,
    a1score: a1score.value,
    a2score: a2score.value,
    projectSc: projectSc.value,
    examScore: examScore.value,
    index: buttonId,
  };
  console.log("Json of the record we are trying to edit: ------------")
  console.log(json)
  console.log("------------------------------")

  let body = JSON.stringify(json);
  //const table = document.getElementById("storedData")

  //firstPage.reset(); // this resets the forms fields to empty
  //table.innerHTML = ""

  console.log("*************")
  console.log(body)
  console.log("*************")
  return false;
}



const returnEditedStudent = function(e){
  
  //let index = editStudent(buttonId);

  e.preventDefault();
  const firstPage = document.querySelector("#firstPage");
  //const table = document.createElement("table")
  //table.id = "storedData"
  const table = document.getElementById("storedData");
  table.innerHTML = "";
  table.innerHTML +=
    "<tr><th>Class</th>" +
    "<th>Assignment1 Score</th>" +
    "<th>Assignment2 Score</th>" +
    "<th>Project Score </th>" +
    "<th>Exam Score</th>" +
    "<th>Final Grade</th>" +
    "<th>Delete</th>"+
    "<th>Edit</th></tr>";
  //const firstPage = document.querySelector("#firstPage");
  const studentName = document.querySelector("#studentName"),
    a1score = document.querySelector("#a1score"),
    a2score = document.querySelector("#a2score"),
    projectSc = document.querySelector("#projectSc"),
    examScore = document.querySelector("#examScore");
  console.log("this is the recently edited class" + studentName.value);
  
  const json = {
    studentName: studentName.value,
    a1score: a1score.value,
    a2score: a2score.value,
    projectSc: projectSc.value,
    examScore: examScore.value,
    index: sessionStorage.getItem("index")
  };

  const body = JSON.stringify(json);
  console.log("Recently editing record (body): ------------")
  console.log(json)
  console.log("------------------------------")

  fetch("/editRecord", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("returning all records after updating: ------------")
      console.log(json)
      console.log("------------------------------")
      //table.innerHTML = "<form>"
      table.innerHTML = "";
      //let table =
      table.innerHTML +=
        "<tr><th>Class</th>" +
        "<th>Assignment1 Score</th>" +
        "<th>Assignment2 Score</th>" +
        "<th>Project Score </th>" +
        "<th>Exam Score</th>" +
        "<th>Final Grade</th>" +
        "<th>Delete</th>"+
        "<th>Edit</th></tr>";

      json.forEach((student, index) => {
        console.log(student);
        table.innerHTML +=
        "<tr id=entry" +
        index +
        "><td id=class-entry"+student.index+">" + 
        student.studentName +
        "</td>" +
        "<td id=a1-entry"+student.index+">" + 
        student.a1score +
        "</td>" +
        "<td id=a2-entry"+student.index+">" +
        student.a2score +
        "</td>" +
        "<td id=p-entry"+student.index+">" +
        student.projectSc +
        "</td>" +
        "<td id=e-entry"+student.index+">" +
        student.examScore +
        "</td>" +
        "<td>" +
        student.final_score +
        "</td>" +
        //+ "<td>" + "<button type='button' onclick=deleteStudent("+ index + ")>X</button>" +"</td></tr>"
        "<td>" +
        "<button type='button' id =" + student.index +
        " onclick=deleteStudent(this.id)>X</button>" +
        "</td>" +
        "<td>" +
        "<button type='button' id =" + student.index +
        " onclick=editStudent(this.id)>O</button>" +
        "</td></tr>";
      });
      //table.innerHTML += "</form>"
    });
    document.body.appendChild(table);
    firstPage.reset(); 

    return false;
}



