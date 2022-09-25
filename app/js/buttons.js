const toggleForm = (state) => {
  const emptyDOM = document.getElementById("empty-task");

  emptyDOM.style.display = state ? "block" : "none";
};

window.onload = () => {
  const addBtn = document.getElementById("add");
  const cancelBtn = document.getElementById("cancel");

  addBtn.addEventListener("click", () => toggleForm(true));
  cancelBtn.addEventListener("click", () => toggleForm(false));
};
