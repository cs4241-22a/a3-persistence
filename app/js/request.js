const edit = (evt, element) => {
  evt.preventDefault();

  const emptyDOM = document.getElementById("empty-task");
  emptyDOM.style.display = "block";

  const id = element.closest(".card").id;
  const task = document.getElementById(id);

  document.getElementById("task-id").value = task.id;

  const title = task.querySelector("#title-task").innerHTML;
  document.getElementById("title-edit").value = title;

  const description = task.querySelector("#description-task").innerHTML;
  document.getElementById("description-edit").innerHTML = description;

  const type = task.querySelector("#type-task").innerHTML;
  document.getElementById("type-edit").value = type;

  const priority = task
    .querySelector("#priority-task")
    .innerHTML.split(" ")[0]
    .trim();
  document.getElementById("priority-edit").value = priority;

  const date = new Date(task.querySelector("#deadline-task").innerHTML);
  const deadline = date.toISOString().substring(0, 10);
  document.getElementById("deadline-edit").value = deadline;
};

const remove = async (evt, element) => {
  evt.preventDefault();

  const id = element.closest(".card").id;

  const requestDelete = await fetch("/task", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
    }),
  });

  if (requestDelete.status == 200) {
    document.getElementById(id).remove();
  } else {
    console.log("[ERROR] REST DELETE FAILED");
  }
};

const add = async (evt) => {
  evt.preventDefault();

  const form = document.getElementById("form");
  const EXPECTED_FIELDS = 5;

  const data = new FormData(form),
    json = Object.fromEntries(data.entries());

  if (Object.keys(json).length !== EXPECTED_FIELDS) {
    return;
  } else {
    json.creation_date = new Date().toISOString().split("T")[0];

    const id = document.getElementById("task-id").value;
    if (id !== "none") {
      json._id = id;
    }

    const requestAdd = await fetch("/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });

    if (requestAdd.status == 200) {
      await fetch("/load");
      location.reload();
    } else {
      console.log("[ERROR] REST ADD FAILED");
    }
  }
};
