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
    // render input field. wait until user submitted

    const json = {
        "iid": e.parentNode.getAttribute("id")
    }
    const data = JSON.stringify(json)

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

        editItem(json);
        return response.json();
    })
}

// adds item to html
const appendItem = function(item) {
    const newLi = document.createElement("li");
    
    newLi.innerText = item.title;
    newLi.setAttribute("id", item.iid)

    newLi.appendChild(makeEditButton())
    newLi.appendChild(makeDeleteButton())

    todoList.appendChild(newLi);
}

// deletes item from html
const deleteItem = function(item) {
    const element = document.getElementById(item.iid);
    todoList.removeChild(element);
}

// edits item from html
const editItem = function(item) {
    console.log("EDIT")
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
    buttonEdit.setAttribute("onclick", "editTodo(this)");
    buttonEdit.innerText = "E";
    return buttonEdit;
}
  