window.onload = async function () {
  const request = await fetch("/task");
  // const data = await request.json();

  const data = [{ description: "hello" }];

  await fetch("/load", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
