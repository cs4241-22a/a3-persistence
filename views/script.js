function refreshData(user) {
  fetch("/alldata", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async function (response) {
    let newData = await response.json();
    console.log("refreshing data...");

    const itemList = document.getElementById("items");
    itemList.innerHTML = "";
    const qtyList = document.getElementById("qtys");
    qtyList.innerHTML = "";
    const unitList = document.getElementById("units");
    unitList.innerHTML = "";
    const brandList = document.getElementById("brands");
    brandList.innerHTML = "";

    newData.forEach((element, index) => {
      if (element.user == user) {
        itemList.innerHTML += "<li>" + element.item + "</li>";
        qtyList.innerHTML += "<li>" + element.qty + "</li>";
        unitList.innerHTML += "<li>" + element.units + "</li>";
        if (element.brand == "") {brandList.innerHTML += "<li> &nbsp; </li>"}
        else { brandList.innerHTML += "<li>" + element.brand + "</li>"; }
      }
    });

    const itemEntry = document.getElementById("item");
    itemEntry.value = "";
    const qtyEntry = document.getElementById("qty");
    qtyEntry.value = "";
    const brandEntry = document.getElementById("brand");
    brandEntry.value = "";
    const itemUpdate = document.getElementById("item-u");
    itemUpdate.value = "";
    const qtyUpdate = document.getElementById("qty-u");
    qtyUpdate.value = "";
    const brandUpdate = document.getElementById("brand-u");
    brandUpdate.value = "";
    const deleteEntry = document.getElementById("deleted-item");
    deleteEntry.value = "";
  });
}

const submit = function (e) {
  let id = 0;
  id = Math.floor(Math.random() * 10000);

  e.preventDefault();

  let item = document.querySelector("#item");
  let qty = document.querySelector("#qty");
  let brand = document.querySelector("#brand");
  let units = "Ct";
  if (item.value == "Eggs" || item.value == "eggs" || item.value == "Ice cream" || item.value == "ice cream") { units = "Carton"; } 
  else if ( item.value == "Chicken" || item.value == "Pork" || item.value == "Beef" ) { units = "Lb"; } 
  else if ( item.value == "Peanut butter" || item.value == "Jam" || item.value == "Jelly" ) { units = "Jar"; }
  if (qty.value != "1" && units != "Ct") { units += "s"; }

  let json = {
    _id: id,
    item: item.value,
    qty: qty.value,
    units: units,
    brand: brand.value,
  };
  let body = JSON.stringify(json);
  console.log(body);
  fetch("/submit", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async function (response) {
    let newData = await response.json();
    const user = document.querySelector("user"); 
    refreshData(user);
    // console.log(newData);
  });

  return false;
};

const retrieveAndUpdateItem = function (e) {
  e.preventDefault();
  
  let updatedItem = document.querySelector("#item-u");
  let json = {
    item: updatedItem.value,
    qty: "",
    units: "",
    brand: "",
  };
  let body = JSON.stringify(json);
  // console.log( body.value );
  
  // retrieve object based on item name to obtain object id so it can be updated
  fetch("/singleentry", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    }
  }).then(async function (response) {
    let newData = await response.json();
    body = newData;
    console.log("retrieved, updating: ");
    console.log( body );
    updateItem(body);
  });

  return false;
};

function updateItem(body) {
  let item = document.querySelector("#item-u");
  let qty = document.querySelector("#qty-u");
  let brand = document.querySelector("#brand-u");
  let units = "Ct";
  if (item.value == "Eggs" || item.value == "eggs" || item.value == "Ice cream" || item.value == "ice cream") { units = "Carton"; } 
  else if ( item.value == "Chicken" || item.value == "Pork" || item.value == "Beef" ) { units = "Lb"; } 
  else if ( item.value == "Peanut butter" || item.value == "Jam" || item.value == "Jelly" ) { units = "Jar"; }
  if (qty.value != "1" && units != "Ct") { units += "s"; }
  
  let json = {
    _id: body._id,
    item: item.value,
    qty: qty.value,
    units: units,
    brand: brand.value,
  };
  body = JSON.stringify(json);
  console.log(body);
  fetch("/update", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async function (response) {
    let newData = await response.json();
    const user = document.querySelector("user"); 
    refreshData(user);
    //console.log(newData);
  });
}

const retrieveAndDeleteItem = function (e) {
  e.preventDefault();

  let deletedItem = document.querySelector("#deleted-item");
  console.log ( deletedItem.value );
  let json = {
    item: deletedItem.value,
    qty: "",
    units: "",
    brand: ""
  };
  let body = JSON.stringify(json);
  console.log( body );
  fetch("/delete", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    }
  }).then(async function (response) {
    let newData = await response.json();
    const user = document.querySelector("user"); 
    console.log(newData);
    refreshData(user);
  });

  return false;
};

// function deleteItem(body) {
//   // console.log("trying to find correct part of body: ")
//   // console.log(body[0]._id);
  
// }

window.onload = function () {
  const user = document.querySelector("user");
  const addButton = document.querySelector("#add-button");
  addButton.onclick = submit;
  const updateButton = document.querySelector("#update-button");
  updateButton.onclick = retrieveAndUpdateItem;
  const deleteButton = document.querySelector("#delete-button");
  deleteButton.onclick = retrieveAndDeleteItem;
  refreshData(user);
};
