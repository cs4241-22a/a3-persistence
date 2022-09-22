function getTableData() {
  fetch("/data", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((db) => {
      document.querySelector("#item_table").innerHTML =
        "    <tr>\n" +
        "        <th>Item Name</th>\n" +
        "        <th>Item Cost</th>\n" +
        "        <th>Item Quantity</th>\n" +
        "        <th>Payment Method</th>\n" +
        "        <th>Total Amount</th>\n" +
        "    </tr>";
      for (let i = 0; i < db.length; i++) {
        let item = db[i];
        let row = document.createElement("tr");
        row.setAttribute("class", "item_row");

        let nameCell = document.createElement("td");
        nameCell.appendChild(document.createTextNode(item.item_name));
        row.appendChild(nameCell);

        let costCell = document.createElement("td");
        costCell.appendChild(document.createTextNode(`$${item.item_cost}`));
        row.appendChild(costCell);

        let quantityCell = document.createElement("td");
        quantityCell.appendChild(document.createTextNode(item.item_quantity));
        let decreaseButton = document.createElement("button");
        decreaseButton.innerText = "Decrease";
        decreaseButton.className = "waves-effect waves-light btn deep-purple";
        decreaseButton.style = "float: right;";
        decreaseButton.addEventListener("click", () => {
          const json = {
            id: item._id,
          };
          const body = JSON.stringify(json);
          fetch("/decrease", {
            method: "POST",
            body,
            headers: {
              "Content-Type": "application/json",
            },
          }).then(function (response) {
            getTableData();
          });
        });
        quantityCell.appendChild(decreaseButton);

        row.appendChild(quantityCell);

        let paymentCell = document.createElement("td");
        paymentCell.appendChild(document.createTextNode(item.payment_method));
        row.appendChild(paymentCell);

        let amountCell = document.createElement("td");
        amountCell.appendChild(
          document.createTextNode(
            `$${(item.item_cost * item.item_quantity).toFixed(2)}`
          )
        );
        row.appendChild(amountCell);

        document.querySelector("#item_table").appendChild(row);
      }
    });
}

//https://stackoverflow.com/questions/25983603/how-to-submit-an-html-form-without-redirection
function formSubmit(event) {
  event.preventDefault();

  const name_form = document.querySelector("#item_name");
  const cost_form = document.querySelector("#item_cost");
  const quantity_form = document.querySelector("#item_quantity");
  const item_name = name_form.value;
  const item_cost = cost_form.value;
  const item_quantity = quantity_form.value;
  const payment_method = document.querySelector("#payment_method").value;

  if (
    item_name === "" ||
    item_cost === "" ||
    item_quantity === "" ||
    payment_method === ""
  )
    return false;

  const json = {
    item_name: item_name,
    item_cost: item_cost,
    item_quantity: item_quantity,
    payment_method: payment_method,
  };

  console.log(json);

  const body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then(function (response) {
    getTableData();
  });

  name_form.value = "";
  cost_form.value = "";
  quantity_form.value = "";
}

export { getTableData, formSubmit };
