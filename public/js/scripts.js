
function updateCourseList(data) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = new Date(mm + "/" + dd + "/" + yyyy);

  let table = document.getElementById("courseTab");
  let courses = data;

  for (let i = 0; i < courses.length; i++) {
    let termEnd = new Date();
    switch (courses[i].term) {
      case "a":
        termEnd = new Date("10/14/2022");
        break;
      case "b":
        termEnd = new Date("12/17/2022");
        break;
      case "c":
        termEnd = new Date("03/04/2023");
        break;
      case "d":
        termEnd = new Date("05/04/2023");
        break;
      default:
        termEnd = new Date("00/00/0000");
    }

    let timeDiff = termEnd.getTime() - today.getTime();
    let dayDiff = timeDiff / (1000 * 3600 * 24);
    let remaining = (dayDiff / 7) * courses[i].weekly;

    let row = `<tr>
        				    <td>${courses[i].cname}</td>
                    <td>${Math.round(remaining)}</td>
        		      </tr>`;
    table.innerHTML += row;
  }

  let select = document.getElementById("coursesel");

  for (let i = 0; i < courses.length; i++) {
    let row = `<option value="${courses[i].cname}">${courses[i].cname}</option>`;
    select.innerHTML += row;
  }
}

function updateAssignList(data) {
  let table = document.getElementById("assignmentsTab");
  let assignments = data;

  for (let i = 0; i < assignments.length; i++) {
    let row = `<tr>
    				        <td>
                      <input
                        type="checkbox"
                        id="${i}"
                        name="headerbox"
                        onclick="delAssignment(this)"
                      />
                    </td>
                    <td>${assignments[i].assignment}</td>
                    <td>${assignments[i].coursesel}</td>
                    <td>${assignments[i].due}</td>
                    <td>${assignments[i].priority}</td>
    				      </tr>`;
    table.innerHTML += row;
  }
}

const delAssignment = function (e) {
  const table = document.getElementById("assignmentsTab");
  const rowIndex = e.parentNode.parentNode.rowIndex;
  table.deleteRow(rowIndex - 1);

  fetch("/delAssignment", {
    method: "POST",
    body: e.parentNode.getAttribute("id"),
  }).then((response) => {
    return response.json();
  });
  // .then((data) => updateAssignList(data))

  return false;
};
