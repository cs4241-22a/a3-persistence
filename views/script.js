const submit = function (e) {
    // const characters = 'abcdefghijklmnopqrstuvwxyz';
    let id = '';
    // const charactersLength = 12;
    for(let i = 0; i < 12; i++) {
        id += 
        String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    console.log( id );
    
    e.preventDefault();
  
    let item = document.querySelector("#item");
    let qty = document.querySelector("#qty");
    let brand = document.querySelector("#brand");
    // TODO: add units before entering into db
    let json = {
      _id: id,
      item: item.value,
      qty: qty.value,
      units: "",
      brand: brand.value,
    };
    let body = JSON.stringify(json);
    console.log(body);
    fetch("/submit", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async function (response) {
      let newData = await response.json();
      refreshData(newData);
      //console.log(newData);
    });
  
    return false;
  };
  
  function refreshData(newData) {
    // convert json response to array
    console.log("new data: ");
    // console.log( newData );
    fetch("/alldata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async function (response) {
      let newData = await response.json();
      // let result = [];

      // for(var i in newData)
      //     result.push([i, newData [i]]);
      // console.log( result );

      const itemList = document.getElementById("items");
      itemList.innerHTML = "";
      const qtyList = document.getElementById("qtys");
      qtyList.innerHTML = "";
      const unitList = document.getElementById("units");
      unitList.innerHTML = "";
      const brandList = document.getElementById("brands");
      brandList.innerHTML = "";
    
      newData.forEach((element, index) => {
        itemList.innerHTML += "<li>" + element.item + "</li>";
        qtyList.innerHTML += "<li>" + element.qty + "</li>";
        unitList.innerHTML += "<li>" + element.units + "</li>";
        brandList.innerHTML += "<li>" + element.brand + "</li>";
      });
    
      const itemEntry = document.getElementById("item");
      itemEntry.value = "";
      const qtyEntry = document.getElementById("qty");
      qtyEntry.value = "";
      const brandEntry = document.getElementById("brand");
      brandEntry.value = "";
      const deleteEntry = document.getElementById("deleted-item");
      deleteEntry.value = "";
    });
  }
  
  const deleteItem = function (e) {
    e.preventDefault();
  
    let deletedItem = document.querySelector("#deleted-item");
    let json = {
      item: deletedItem.value,
      qty: "",
      units: "",
      brand: "",
    };
    let body = JSON.stringify(json);
    fetch("/delete", {
      method: "POST",
      body,
    }).then(async function (response) {
      let newData = await response.json();
      refreshData(newData);
      console.log(newData);
    });
  
    return false;
  };
  
  window.onload = function () {
    const addButton = document.querySelector("#add-button");
    addButton.onclick = submit;
    const deleteButton = document.querySelector("#delete-button");
    deleteButton.onclick = deleteItem;
  };  