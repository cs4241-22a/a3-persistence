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
    document.getElementById(id).innerHTML = "";
  } else {
    console.log("[ERROR] REST DELETE FAILED");
  }
};
