/**
 * Toggle the visibility of the text form
 * @param {boolean} state
 */
const toggleForm = (state) => {
  const emptyDOM = document.getElementById("empty-task");

  document.getElementById("form").reset();
  document.getElementById("description-edit").innerHTML = "";

  emptyDOM.style.display = state ? "block" : "none";
};

/**
 * Enable event listeners for buttons on window load
 */
window.onload = () => {
  const add = document.getElementById("add");
  const cancel = document.getElementById("cancel");

  add.addEventListener("click", () => toggleForm(true));
  cancel.addEventListener("click", (evt) => {
    evt.preventDefault();
    toggleForm(false);
  });
};
