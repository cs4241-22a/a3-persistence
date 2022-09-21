window.onload = async function () {
  const request = await fetch("/task");
  const data = await request.json();

  console.log(data);
};
