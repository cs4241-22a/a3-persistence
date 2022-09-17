// const addCollection = (e) =>{
//     // prevent default form action from being carried out
//     e.preventDefault();

//     const collectionName = document.getElementById('addcollectionname'),
//         json = {name: collectionName},
//         body = JSON.stringify(json);

//     fetch('/addcollection', {
//         method: 'POST',
//         body
//     })

//     return false
// }

/**
 * Gets items of a collection from the database.
 * @returns false if error occurs
 */
function getItems() {
    fetch( '/items', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "collectionName":document.getElementById("collectionchoice").value})
    })
    .then( response => response.json() )
    .then( json => showItems(json))

    return false;
}
function showItems(json) {
    json.sort((item1, item2) => compareAlphabetical(item1.name, item2.name));
    document.getElementById('shownItems').innerHTML = "<tr><th>Name</th><th>Date Collected</th><th>Link</th></tr>";
    const shownItems = document.getElementById('shownItems').getElementsByTagName("tbody")[0];
    for (let item of json) {
        const row = document.createElement("tr");
        const name = document.createElement("td");
        name.innerHTML = item.name;
        const dateCol = document.createElement("td");
        dateCol.innerHTML = item.dateCol;
        const link = document.createElement("td");
        link.innerHTML = `<a href="${item.link}">${item.link}</a>`;
        row.appendChild(name);
        row.appendChild(dateCol); 
        row.appendChild(link); 
        shownItems.appendChild(row);
    }
}
function compareAlphabetical(str1, str2) {
    return str1.toLowerCase() > str2.toLowerCase() ? 1 : -1;
}

function showCRUDOptions() {
    const addDrop = document.getElementById("additemdrop");
    const deleteDrop = document.getElementById("deleteitemdrop");
    const updateDrop = document.getElementById("updateitemdrop");
    addDrop.style.visibility = 'visible';
    deleteDrop.style.visibility = 'visible';
    updateDrop.style.visibility = 'visible';

    if(addDrop.disabled === true) {
        addDrop.disabled = false;
        addDrop.click();
    } else if(deleteDrop.disabled === true) {
        deleteDrop.disabled = false;
        deleteDrop.click();
    } else if(updateDrop.disabled === true) {
        updateDrop.disabled = false;
        updateDrop.click();
    }
}
document.getElementById("additemdrop").onclick = () => {
    document.getElementById("crudspace").innerHTML = 
    `<form id="additem" class="">
    <div class="">
      <label for="nameadd">Name:</label>
      <input type="text" id="nameadd" placeholder="Enter item name">
    </div>
    <div class="">
      <label for="dateadd">Date Collected:</label>
      <input type="date" id="datecoladd" placeholder="Pick date collected">
    </div>
    <div class="">
      <label for="linkadd">Link:</label>
      <input type="url" id="linkadd"placeholder="Enter link to more info">
    </div>
    <button type="submit" id="additembtn">submit</button>
    </form>`;

    const addItemBtn = document.getElementById("additembtn");
    addItemBtn.onclick = addItem;

    document.getElementById("additemdrop").disabled = true;
    document.getElementById("deleteitemdrop").disabled = false;
    document.getElementById("updateitemdrop").disabled = false;
}
document.getElementById("deleteitemdrop").onclick = () => {
    document.getElementById("crudspace").innerHTML = 
    `<form id="deleteitem">
    <div class="">
      <label for="deleteitemselect">Pick item to delete:</label>
      <select type="text" id="deleteitemselect"></select>
    </div>
    <button type="submit" id="deleteitembtn">submit</button>
    </form>`;

    const deleteItemBtn = document.getElementById("deleteitembtn");
    deleteItemBtn.onclick = deleteItem;

    fetch( '/items', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "collectionName":document.getElementById("collectionchoice").value})
    })
    .then( response => response.json() )
    .then( json => {
        json.sort((item1, item2) => compareAlphabetical(item1.name, item2.name));
        for (let item of json) {
            const option = document.createElement("option");
            option.text = item.name;
            option.value = item._id;
            document.getElementById("deleteitemselect").appendChild(option);
        }
    });

    document.getElementById("additemdrop").disabled = false;
    document.getElementById("deleteitemdrop").disabled = true;
    document.getElementById("updateitemdrop").disabled = false;
}
document.getElementById("updateitemdrop").onclick = () => {
    document.getElementById("additem").style.visibility = "hidden";
    // document.getElementById("deleteitem").style.visibility = "hidden";
    // document.getElementById("updateitem").style.visibility = "visible";

    document.getElementById("additemdrop").disabled = false;
    document.getElementById("deleteitemdrop").disabled = false;
    document.getElementById("updateitemdrop").disabled = true;
}

const addItem = e => {
    e.preventDefault();
    const itemName = document.getElementById('nameadd'),
        itemDateCol = document.getElementById('datecoladd'),
        itemLink = document.getElementById('linkadd'),
        json = { name: itemName.value, dateCol: itemDateCol.value, link: itemLink.value },
        body = JSON.stringify(json);

    if(itemName === "" || itemDateCol === "" || itemLink === "") {
        return false;
    }

    fetch('/additem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })

    // refresh items on client side
    getItems();

    return false;
}
const deleteItem = e => {
    e.preventDefault();
    const itemID = document.getElementById('deleteitemselect'),
        json = {_id: itemID.value},
        body = JSON.stringify(json);

    fetch('/deleteitem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
    .then( response => response.json() )
    .then( json => document.getElementById("crudspace").innerHTML += JSON.stringify(json) );

    // refresh items on client side
    getItems();

    return false;
}

// window.onload = function () {
//     // const addCollectionBtn = document.getElementById('addcollectionbtn')
//     // addCollectionBtn.onclick = addCollection
//     const addItemBtn = document.getElementById("additembtn");
//     addItemBtn.onclick = addItem;
// }