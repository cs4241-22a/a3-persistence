let arr = [];
let editObject = 'unknown';
let getRowIndex;

window.onload = function(){
  console.log("hey");
   const button = document.querySelector( 'button' )
    button.onclick = submit
  load();
}

function load(){
    fetch('/saved', {
            method:'POST',
            body: JSON.stringify({userID: ''}),
            headers:{
                'Content-type':'application/json'
            }
       })
       .then(response => response.text())
       .then(text =>{
            const found = JSON.parse(text);

            for(let i = 0; i < found.length; i++){
                arr[i] = found[i];
                let table = document.getElementById('dataTable');
                    let newRow = table.insertRow(-1);

                    let booknameCell = newRow.insertCell(0);
                    let authornameCell = newRow.insertCell(1);
                    let totalpagesCell = newRow.insertCell(2);
                    let pagesreadCell = newRow.insertCell(3);
                    let pagesleftCell = newRow.insertCell(4);
                    let editCell = newRow.insertCell(5)
                    let deleteCell = newRow.insertCell(6)
    
                    booknameCell.innerHTML = found[i].bookname;
                    authornameCell.innerHTML = found[i].authorname;
                    totalpagesCell.innerHTML = found[i].totalpages;
                    pagesreadCell.innerHTML = found[i].pagesread;
                    pagesleftCell.innerHTML = found[i].pagesleft;
                    deleteCell.innerHTML = '<button class="btn btn-outline-secondary btn-sm w-50"onclick="remove(this)">Remove</button>';
                    editCell.innerHTML = '<button class="btn btn-outline-secondary btn-sm w-50" onclick="edit(this)">Edit</button>';
            }
       })
}

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    //generates random id;
    let randID = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    let newID = randID();

    let bookname = document.getElementById( 'bookname' ),
        authorname = document.getElementById('authorname'),
        totalpages = document.getElementById('totalpages'),
        pagesread = document.getElementById('pagesread'),
        pagesleft,
            json = { bookname: bookname.value, authorname: authorname.value, totalpages: totalpages.value, pagesread: pagesread.value,pagesleft: totalpages.value - pagesread.value, _id: newID},
          body = JSON.stringify( json );

    if(bookname.value === ''){
      alert('Please do not leave book name field blank')
    }
    else if(authorname.value === ''){
      alert('Please do not leave author name field blank')
    }
    else{
      fetch( '/add', {
        method:'POST',
        body,
        headers:{
            'Content-type':'application/json'
        }
      })
      .then( response => response.text())
      .then( text => {
        arr.push(JSON.parse(text));
        newData();
      })
    }
    return false
  }


  function newData(){
    let index = arr.length - 1;

    let table = document.getElementById('dataTable');
    let newRow = table.insertRow(-1);
 let booknameCell = newRow.insertCell(0);
                    let authornameCell = newRow.insertCell(1);
                    let totalpagesCell = newRow.insertCell(2);
                    let pagesreadCell = newRow.insertCell(3);
                    let pagesleftCell = newRow.insertCell(4);
                    let editCell = newRow.insertCell(5);
                    let deleteCell = newRow.insertCell(6);
                    
    booknameCell.innerHTML = arr[index].bookname;
    authornameCell.innerHTML = arr[index].authorname;
    totalpagesCell.innerHTML = arr[index].totalpages;
    pagesreadCell.innerHTML = arr[index].pagesread;
    pagesleftCell.innerHTML = arr[index].pagesleft;
    deleteCell.innerHTML = '<button class="btn btn-outline-secondary btn-sm w-50" onclick="remove(this)">Remove</button>';
    editCell.innerHTML = '<button class="btn btn-outline-secondary btn-sm w-50" onclick="edit(this)">Edit</button>';
   }


function remove(cell){
    let index = cell.parentNode.parentNode.rowIndex;
    console.log(index);
    
    fetch( '/delete', {
        method:'POST',
        body: JSON.stringify(arr[index - 1]),
        headers:{
            'Content-type':'application/json'
        }
      })
      .then( response => response.text())
      .then( text => {
        const table = document.getElementById('dataTable');
        table.deleteRow(index);
        arr.splice(index - 1, 1);
      })
   }

  function edit(cell){
    let index = cell.parentNode.parentNode.rowIndex;

    let form = document.querySelector('form');
    form.elements['bookname'].value = arr[index - 1].bookname;
    form.elements['authorname'].value = arr[index - 1].authorname;
    form.elements['totalpages'].value = arr[index - 1].totalpages;
    form.elements['pagesread'].value = arr[index - 1].pagesread;

    var btn = document.getElementById('update_button');
    btn.style.visibility = 'visible'
    
    editObject = arr[index-1];
    getRowIndex = index;
   }

function updateCell(){
    const table = document.getElementById('dataTable');
    let form = document.querySelector('form');

    let bookname = form.elements['bookname'].value,
        authorname = form.elements['authorname'].value,
        totalpages = form.elements['totalpages'].value,
        pagesread = form.elements['pagesread'].value,
            json = { bookname: bookname, authorname: authorname, totalpages: totalpages, pagesread: pagesread, pagesleft: totalpages - pagesread, _id: editObject._id },
            body = JSON.stringify(json);

    fetch('/update',{
        method:'POST',
        body,
        headers:{
            'Content-type':'application/json'
        }
    })
    .then( response => response.text())
    .then( text => {
        let textParsed = JSON.parse(text);
        
        //change in table
        table.rows[getRowIndex].cells[0].innerHTML = textParsed.bookname;
        table.rows[getRowIndex].cells[1].innerHTML = textParsed.authorname;
        table.rows[getRowIndex].cells[2].innerHTML = textParsed.totalpages;
        table.rows[getRowIndex].cells[3].innerHTML = textParsed.pagesread;
      table.rows[getRowIndex].cells[4].innerHTML = textParsed.pagesleft;

        //change in data arr
        arr[getRowIndex - 1].bookname = textParsed.bookname;
        arr[getRowIndex - 1].authorname = textParsed.authorname;
        arr[getRowIndex - 1].totalpages = textParsed.totalpages;
        arr[getRowIndex - 1].pagesread = textParsed.pagesread;
       arr[getRowIndex - 1].pagesleft = textParsed.pagesleft;
      })

        //make button invisible again
        var btn = document.getElementById('update_button');
        btn.style.visibility = 'hidden'

   }
