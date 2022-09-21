window.onload = function () {
    getAppdata();
};

function success() {
    if (document.getElementById("new-task-input").value === "") {
        document.getElementById("new-task-submit").disabled = true;
    } else {
        document.getElementById("new-task-submit").disabled = false;
    }
}

function addTasks(todos) {
    for (let i = 0; i < todos.length; i++) {
        console.log(todos[i]);
        addTodo(todos[i]);
    }
}

function getAppdata() {
    const data = fetch("/getData", {
        method: "GET",
    })
        .then((response) => {
            //handle response
            return response.json();
        })
        .then((data) => {
            //handle data
            console.log(data);
            addTasks(data);
            return data;
        });
    return data;
}

sortButton.addEventListener("click", () => {
    location.reload();
});

window.addEventListener("load", () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const time = document.querySelector("#new-task-time");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        (json = { todo: input.value, time: time.value }),
            (body = JSON.stringify(json));

        fetch("/submit", {
            method: "POST",
            body,
        }).then(function (response) {
            // do something with the reponse
            console.log(response);
            //reload page for server logic (ordering) to work
            //location.reload();
        });

        createHTML(input.value, time.value);
    });
});

function deleteFromServer(task) {
    (json = { todo: task }), (body = JSON.stringify(json));

    fetch("/remove", {
        method: "DELETE",
        body,
    }).then(function (response) {
        // do something with the reponse
        console.log(response);
    });
}

function addTodo(todo) {
    createHTML(todo.todo, todo.time);
}

function createHTML(task, time) {
    const list_el = document.querySelector("#tasks");
    const input = document.querySelector("#new-task-input");

    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    //const task_edit_el = document.createElement('button');
    //task_edit_el.classList.add('edit');
    //task_edit_el.innerText = 'Edit';

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Delete";

    //html for countdown
    const task_countdown = document.createElement("p");
    //task_countdown.classList.add('countdown');
    task_countdown.setAttribute("id", task);
    //    task_countdown.innerText = 'Countdown';

    addCountdown(task, time);

    task_actions_el.appendChild(task_delete_el);
    task_actions_el.appendChild(task_countdown);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    input.value = "";

    /* task_edit_el.addEventListener('click', (e) => {
          if (task_edit_el.innerText.toLowerCase() == "edit") {
              task_edit_el.innerText = "Save";
              task_input_el.removeAttribute("readonly");
              task_input_el.focus();
          } else {
              task_edit_el.innerText = "Edit";
              task_input_el.setAttribute("readonly", "readonly");
          }
      }); */

    task_delete_el.addEventListener("click", (e) => {
        list_el.removeChild(task_el);
        deleteFromServer(task);
    });
}

function addCountdown(task, time) {
    let countDownDate = new Date(time).getTime();

    // Update the count down every 1 second
    let x = setInterval(function () {
        let now = new Date().getTime();
        let distance = countDownDate - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //preceeding zero
        if (days < 10) {
            days = "0" + days;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (document.getElementById(task) === null) {
            clearInterval(x);
        }
        document.getElementById(task).innerHTML =
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        // If countdown is finished
        if (distance < 0) {
            clearInterval(x);
            document.getElementById(task).innerHTML = "Time Over!";
        }
    }, 1000);
}
