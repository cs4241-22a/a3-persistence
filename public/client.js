// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// array of books
const books = []

// define variables that reference elements on our page
const booksList = document.getElementById('books');
const booksForm = document.forms[0];
const bookInput = booksForm.elements['book'];

// a helper function that creates a list item for a given dream
const appendNewBook = function(book) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = book;
  booksList.appendChild(newListItem);
}

// iterate through every dream and add it to our page
books.forEach( function(book) {
  appendNewBook(book);
});

// listen for the form to be submitted and add a new dream when it is
const submit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  let title = document.querySelector("#title")
  let author = document.querySelector("#author")
  let acquiredDate = document.querySelector("#acquiredDate")
  let readYet = document.querySelector("#readYet")
  let readYetString = ""
    
  if ((readYet.value === "Yes") || (readYet.value === "yes")) {
    readYetString = "Yes"
  } else if ((readYet.value === "No") || (readYet.value === "no")) {
    readYetString = "No"
  }
  
  let json = {
    "bookID": "",
    "title": title.value,
    "author": author.value,
    "acquiredDate": acquiredDate.value,
    "readYet": readYetString,
    "readNextPos": ""
  }
    
  let body = JSON.stringify(json)
  
  fetch( '/submit', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  })
  .then( async function( response ) {
    let library = await response.json()
    refreshLibrary(library)
    console.log( library )
  })
}

function refreshLibrary(library) {
  const bookshelf = document.getElementById("currentData")
  bookshelf.innerHTML = "<tr class=\"bookEntry\"><th class=\"bookEntry\">Book ID</th><th class=\"bookEntry\">Title</th><th class=\"bookEntry\">Author</th><th class=\"bookEntry\">Acquired Date</th><th class=\"bookEntry\">Read Yet?</th><th class=\"bookEntry\">Read Next Number</th></tr>"
  
  library.forEach((element, index) => {
    let nonCSID = element.bookID + 1
    let nonCSPos = element.readNextPos + 1
    bookshelf.innerHTML +=
      "<tr class=\"bookEntry\"><td class=\"bookEntry\">" 
      + nonCSID + "</td><td class=\"bookEntry\">"
      + element.title +"</td><td class=\"bookEntry\">"
      + element.author + "</td><td class=\"bookEntry\">"
      + element.acquiredDate + "</td><td class=\"bookEntry\">"
      + element.readYet + "</td><td class=\"bookEntry\">"
      + nonCSPos + "</td></tr>\n"
  })
}


window.onload = function() {
  const button = document.getElementById( "submitButton" )
  button.onclick = submit
  const deleteB = document.getElementById( "deleteButton" )
  deleteB.onclick = deleteButton
}
