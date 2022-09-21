const remove = async (evt) => {
  evt.preventDefault();
  const id = evt.target.id;

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
