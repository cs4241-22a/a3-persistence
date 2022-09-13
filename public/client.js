console.log('hello world :o');

// our default array of dreams
const workouts = []

// define variables that reference elements on our page
const workoutList = document.getElementById('process');
const workoutForm = document.forms[0];
const exercise = workoutForm.elements['exercise'];
const sets = workoutForm.elements['sets'];
const reps = workoutForm.elements['reps'];
const weight = workoutForm.elements['weight'];

// a helper function that creates a list item for a given dream
const appendNewLift = function(lift) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = lift;
  workoutList.appendChild(newListItem);
}

// a helper function to reset the form
const resetForm = function() {
    exercise.value = '';
    exercise.focus();
    sets.value = '';
    sets.focus();
    reps.value = '';
    reps.focus();
    weight.value = '';
    weight.focus();
}

// iterate through every dream and add it to our page
workouts.forEach( function(lift) {
  appendNewLift(lift);
});

// listen for the form to be submitted and add a new dream when it is
workoutForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  const value = exercise.value + ": " + sets.value + " x " + reps.value + " at " + weight.value
  // get dream value and add it to the list
  workouts.push( value )
  appendNewLift( value )

  // reset form 
  resetForm()
  
  fetch( '/submit', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ "newLift":value })
  })
  .then( response => response.json() )
  .then( json => console.log( json ) )
};