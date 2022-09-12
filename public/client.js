console.log('hello world :o');

// our default array of dreams
const dreams = []

// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

// iterate through every dream and add it to our page
dreams.forEach( function(dream) {
  appendNewDream(dream);
});

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  const value = dreamInput.value
  // get dream value and add it to the list
  dreams.push( value )
  appendNewDream( value )

  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
  
  fetch( '/submit', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ "newdream":value })
  })
  .then( response => response.json() )
  .then( json => console.log( json ) )
};