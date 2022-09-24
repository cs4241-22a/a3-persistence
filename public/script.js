const todoList = document.getElementById("todoitems");
const todoForm = document.body.querySelector("form");

fetch("/todolist")
.then(response => response.json())
.then(todoItems => {
    todoItems.forEach(appendItem);

    todoForm.addEventListener("submit", event => {
        event.preventDefault();
  
        let itemTitle = todoForm.elements.todoitem.value;
        addTodo(itemTitle)
  
        // reset form
        todoForm.reset();
        todoForm.elements.todoitem.focus();
    });
})

// adds to db
const addTodo = function(e) {
    const title = document.querySelector("#todoitem")
    const iid = Math.random().toString(36).substring(2); // item id
    const json = { 
        "title": title.value, 
        "iid": iid 
    }
    const data = JSON.stringify(json)
    
    console.log("new todo: " + data);
    fetch("/add", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
    })

    .then (response => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        appendItem(json);
        return response.json();
    })
}

// deletes from db
const deleteTodo = function(e) {
    const json = {
        "iid": e.parentNode.getAttribute("id")
    }
    const data = JSON.stringify(json)

    fetch("/delete", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    })

    .then (response => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }

        deleteItem(json);
        return response.json();
      })
}

// edits in db
const editTodo = function(e) {
    const json = {
        "title": document.getElementById(e.parentNode.getAttribute("id")).querySelector("p").innerText,
        "iid": e.parentNode.getAttribute("id")
    }
    const data = JSON.stringify(json)
    console.log(data)

    fetch("/edit", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    })

    .then (response => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
    })
}

// adds item to html
const appendItem = function(item) {
    const newLi = document.createElement("li");
    const p = document.createElement("p");
    p.innerText = item.title;

    newLi.setAttribute("id", item.iid)
    p.setAttribute("contenteditable", false);

    newLi.appendChild(p);
    newLi.appendChild(makeEditButton())
    newLi.appendChild(makeDeleteButton())

    todoList.appendChild(newLi);
}

// deletes item from html
const deleteItem = function(item) {
    const element = document.getElementById(item.iid);
    todoList.removeChild(element);
}

const makeDeleteButton = function() {
    const buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("class", "delete");
    buttonDelete.setAttribute("onclick", "deleteTodo(this)");
    buttonDelete.innerText = "X";
    return buttonDelete;
}

const makeEditButton = function() {
    const buttonEdit = document.createElement("button");
    buttonEdit.setAttribute("class", "edit");
    buttonEdit.setAttribute("onclick", "makeEditable(this)");
    buttonEdit.innerText = "E";
    return buttonEdit;
}

// make text editable, turns edit button to submit button, delete button to cancel
const makeEditable = function(e) {
    const element = document.getElementById(e.parentNode.getAttribute("id"))
    const p = element.querySelector("p")
    p.setAttribute("contenteditable", true);
    p.focus();

    const buttonEdit = element.querySelector(".edit")
    buttonEdit.setAttribute("onclick", "submitEdit(this)");
    buttonEdit.innerText = "S"
}

const submitEdit = function(e) {
    const element = document.getElementById(e.parentNode.getAttribute("id"))
    const p = element.querySelector("p")
    const buttonEdit = element.querySelector(".edit")
    buttonEdit.setAttribute("onclick", "makeEditable(this)");
    buttonEdit.innerText = "E";
    p.setAttribute("contenteditable", false);
    editTodo(e);
}