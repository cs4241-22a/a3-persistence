let tag_count = -1

const submit = function (e) {
    e.preventDefault()
    tag_count = tag_count + 1
    const name = document.querySelector('#name').value;
    const title = document.querySelector('#title').value;
    const img = document.querySelector('#img').value;
    console.log("Adding to" + tag_count);
    console.log("Current tags " + tag_count)
    let new_tag = tag_count.toString
    const json = {
                'name': name,
                'title':title,
                'img':img,
                'tag': new_tag
            },
          
            

            body = JSON.stringify(json)
            
        fetch('/submit', {
            method: 'POST',
            body 
        })
        showData();
    }

const remove = function (tag) {
    const json = { tag: tag };
    const body = JSON.stringify(json);
    fetch('/remove', {
      method: 'POST',
      body 
    });
    showData(); //todo   
    };

 function update(tag2) {
    const input = tag2;
    const name = document.querySelector('#name').value;
    const title = document.querySelector('#title').value;
    const img = document.querySelector('#img').value;
    console.log(tag2)
    const json = {
          'name': name,
          'title':title,
          'img':img,
          'tag': tag2
    },
    body = JSON.stringify(json);
   
    fetch('/update', {
      method: 'POST',
      body 
    })
    showData()
    }


const help = function (e) {
    alert("Welcome to Grocery Boi! To add items to the grocery list, enter text below the shopping carts, then hit Submit. To remove, hit the remove button on the corresponding row. To update, enter the new information at the top just below the shopping carts, then hit update! If lists do not update due to server challenges, try Manual Refresh!");
    }

//document.getElementById("help").onclick = help





const genTable = function (data) {

    console.log("redrawing")
    console.log("datalen " + data.length)
    console.log(data);
    let table = document.querySelector('#groceryData');
    table.innerHTML =
        '<tr>\n' +
        '<th align="center"></th>\n' +
        '<th align="center">Username</th>\n' +
        '<th align="center">Title</th>\n' +
        '<th align="center">Image</th>\n' +
        '<th align="center"></th>\n' +
        '</tr>';

    for (let i = 0; i < data.length; i++) {
        const currentItem = data[i];
        let newLine = '<tr>\n';
        //let button_del = '<button class = "button_delete" id='+ i.toString +'>Remove</button>'
        let button_update = '<button class = "button_edit" id='+ i + ' onclick = "update(this.id)"+ >Update</button>'
        let button_del = '<button class = "button_delete" id='+ i + ' onclick = "remove(this.id)">Remove</button>'
        let spacer = '<td align="center">'
        cat_img = '<img src='+ String(currentItem.img) +' width="100" height="100"></img>'
        data[i].tag = i;
        let tagg = i;
        newLine += (spacer + button_del +  spacer + currentItem.username + spacer + currentItem.title + spacer + cat_img + spacer + button_update);
        newLine += '</div>' + '</tr>';

        table.innerHTML += newLine

    }
}

const showData = function () {
    fetch('/groceryData', {
        method: 'GET'
    }).then(function(response) {
        return response.json()
    }).then(function (groceryList) {
        genTable(groceryList)
    })
}

const clearAll2 = function () {
  let isExecuted = confirm("Are you sure to execute this action?");
  if(isExecuted){
    tag_count = -1
    fetch('/clear', {
        method: 'GET'
    })
    showData();  
  }
}

const clearAll = function (tag) {
    let isExecuted = confirm("Are you sure to execute this action?");
    tag_count = -1;
    const json = {};
    const body = JSON.stringify(json);
  if(isExecuted){
    console.log("Clearing...")
    fetch('/clear', {
      method: 'POST',
      body 
    });
  }
    showData(); //todo   
    };

window.onload = function () {
    console.log("Loaded and ready to go!!!!")
    const button = document.querySelector('button')
    button.onclick = submit
}

