const updateTable = (jsonData) => {
    // clear table
    const tTable = document.querySelector("#tTable");
    tTable.innerHTML = "";
  
    // append headers
    const head = document.createElement("tr");
    head.setAttribute("id", "tableheader");
    head.innerHTML = "<th>Task</th><th>Days to Complete</th><th>Start Date</th><th>End Date</th><th>Description</th>";
    tTable.appendChild(head);
  
    // map elements
    jsonData.map((val, index) => {
      const tableRowElement = document.createElement("tr");
      tableRowElement.innerHTML = ` <th>${val.task}</th>
                                      <th>${val.days}</th>
                                      <th>${val.start}</th>
                                      <th>${val.end}</th>
                                      <th>${val.description}</th>`;
      tableRowElement.dataset.ind = index;
      tTable.appendChild(tableRowElement);
    });
  
    document.body.appendChild(tTable);
  };
  
  const submit = function (e) {
    e.preventDefault();
    const currDate = new Date()
    const taskIn = document.querySelector("#taskInput");
    const daysIn = document.querySelector("#daysInput");
    const startDate = currDate.toLocaleDateString();
    const endDate = new Date(currDate.setDate(currDate.getDate() + +daysIn.value)).toLocaleDateString();
    const desIn = document.querySelector("#descriptionInput");
  
    const json = {
      task: taskIn.value,
      days: daysIn.value,
      start: startDate,
      end: endDate,
      description: desIn.value,
    };
    const body = JSON.stringify(json);
  
    fetch("/submit", {
      method: "POST",
      body,
    }).then(async (response) => {
      let newData = await response.json();
      updateTable(newData);
    });
  
    return false;
  };
  
  const getList = async () => {
    fetch("/getList").then(async (response) => {
      let newData = await response.json();
      updateTable(newData);
    });
  };
  
  window.onload = function () {
    const btnAddElement = document.querySelector(".btn-add");
    btnAddElement.onclick = submit;
    getList();
  };
  