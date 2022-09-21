const handle = function () {
  fetch("/delete", {
    method: "POST",
    body: id,
  })
    .then((response) => response.json())
    .then((json) => {
      display(json);
    });
};

const display = function () {};
