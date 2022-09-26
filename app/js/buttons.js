const toggleForm = (state) => {
  const emptyDOM = document.getElementById("empty-task");

  document.getElementById("form").reset();
  document.getElementById("description-edit").innerHTML = "";

  emptyDOM.style.display = state ? "block" : "none";
};

window.onload = () => {
  const add = document.getElementById("add");
  const cancel = document.getElementById("cancel");

  add.addEventListener("click", () => toggleForm(true));
  cancel.addEventListener("click", (evt) => {
    evt.preventDefault();
    toggleForm(false);
  });
};
