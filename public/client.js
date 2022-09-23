
// array of JSON strings for every workout, including MongoDB document id
let workouts = []
let workoutDocIds = []

// define variables that reference elements on our page
// const loginForm = document.getElementById("login");
const workoutTable = document.getElementById('process');
const workoutForm = document.getElementById("addForm");
const editForm = document.getElementById("editForm");
const removeForm = document.getElementById("removeForm");
const exercise = workoutForm.elements['exercise'];
const sets = workoutForm.elements['sets'];
const reps = workoutForm.elements['reps'];
const weight = workoutForm.elements['weight'];

// a helper function that creates a list item for a given workout
const appendNewLift = function(lift) {
  const tbody = document.getElementById('process').getElementsByTagName('tbody')[0]
  const row = tbody.insertRow()
  let newExercise = row.insertCell()
  let newSets = row.insertCell()
  let newReps = row.insertCell()
  let newWeight = row.insertCell()

  let t1 = document.createTextNode(lift.exercise)
  let t2 = document.createTextNode(lift.sets)
  let t3 = document.createTextNode(lift.reps)
  let t4 = document.createTextNode(lift.weight)

  newExercise.appendChild(t1)
  newSets.appendChild(t2)
  newReps.appendChild(t3)
  newWeight.appendChild(t4)
}

// a helper function to reset the form
const resetForm = function(formName) {
    const form = document.getElementById(formName)
    Array.from(form.elements).forEach(element => {
      element.value = ''
      element.focus()
    })
}

// function to create a list item from a json input
const addWorkout = function(input) {
  const value = input.exercise + ": " + input.sets + " x " + input.reps + " at " + input.weight
  // get workout value and add it to the list
  if(!workoutDocIds.includes(input._id)) {
    workouts.push( JSON.stringify(input) )
    workoutDocIds.push( input._id )
  }
  appendNewLift( input )
} 

const getDocumentId = function(body) {
  body = body.replace('{', '')
  body = body.replace('}', '')
  let count = 0
  let id = -1
  workouts.forEach(element => {
    if(element.includes(body)) { id = count}
    else { count++ }
  })
  return id
}

const removeFromList = function(id) {
  let count = 0
  workouts.forEach(element => {
    let temp = workouts.pop()
    let temp_id = workoutDocIds.pop()
    if(count != id) {
      workouts.push(temp)
      workoutDocIds.push(temp_id)
    }
    count++
  })
}

// iterate through every workout and add it to our page
workouts.forEach( function(lift) {
  appendNewLift(lift);
});

// listen for the form to be submitted and add a new workout when it is
workoutForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  if(exercise.value != '' && sets.value != '' && reps.value != '' && weight.value != '') {
    // const value = exercise.value + ": " + sets.value + " x " + reps.value + " at " + weight.value
    // // get workout value and add it to the list
    // appendNewLift( value )
    
    fetch( '/add', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"exercise": exercise.value,
                            "sets": sets.value,
                            "reps": reps.value,
                            "weight": weight.value})
    })
    .then( response => response.json() )
    .then(console.log("added to db"))
    .then(showWorkouts())
    .then(console.log("Workouts refreshed"))

    // reset form 
    resetForm("addForm")

    document.getElementById("msg").innerHTML = "<p>Exercise added</p>"
    document.getElementById("msg").style.color = "green"
  }
  else {
    document.getElementById("msg").innerHTML = "<p>Please enter all the values</p>"
    document.getElementById("msg").style.color = "red"
  }
};

const showWorkouts = function ( ) {
  fetch( '/showWorkouts', {
    method:'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  .then( response => response.json() )
  .then( json => { 
    document.getElementById("process").innerHTML = '<caption>Trust the process</caption><thead><tr><th>Exercise</th><th>Sets</th><th>Reps</th><th>Weight</th></tr></thead><tbody></tbody>'
    json.forEach( function(workout) {
      addWorkout(workout)
    })
  })
}

removeForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();
  let vals = []
  const form = document.getElementById("removeForm")
    Array.from(form.elements).forEach(element => {
      vals.push(element.value)
    })

  body = JSON.stringify({ "exercise": vals[0],
                          "sets": vals[1],
                          "reps": vals[2],
                          "weight": vals[3]})

  id = getDocumentId(body)
  if(id != -1) {
    body = JSON.stringify({ "_id": workoutDocIds[id],
                            "exercise": vals[0],
                            "sets": vals[1],
                            "reps": vals[2],
                            "weight": vals[3]})
    fetch( '/remove', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    })
    .then( response => response.json() )
    .then( json => console.log( json ) )
    .then(removeFromList(id))
    .then(showWorkouts())

    // reset form
    resetForm("removeForm")

    document.getElementById("msg").innerHTML = "<p>Exercise removed</p>"
    document.getElementById("msg").style.color = "green"
  }
  else {
    document.getElementById("msg").innerHTML = "<p>Exercise not found</p>"
    document.getElementById("msg").style.color = "red"
  }
}

editForm.onsubmit = function(event) {
  event.preventDefault()

  const editForm = document.getElementById("editForm")
  const index = editForm.elements["index"].value

  if(index <= workouts.length && index > 0) {
    const json = JSON.parse(workouts[index-1])
    const editValuesForm = document.getElementById("editValuesForm")
    const oldName = json.exercise
    const oldReps = json.reps
    const oldSets = json.sets
    const oldWeight = json.weight
    editValuesForm.innerHTML = `<input name="exercise" type="text" maxlength="100" value="${oldName}">
                                <input name="sets" type="text" maxlength="10" value="${oldSets}">
                                <input name="reps" type="text" maxlength="10" value="${oldReps}">
                                <input name="weight" type="text" maxlength="10" value="${oldWeight}">
                                <button type="submit" id="updateWorkout" class="btn btn-primary btn-sm active">Update</button>`
    
    editValuesForm.onsubmit = function(event) {
      event.preventDefault()

      let vals = []
      Array.from(editValuesForm.elements).forEach(element => {
        vals.push(element.value)
      })
      
      if(vals[0] != '' && vals[1] != '' && vals[2] != '' && vals[3] != '') {
        const body = JSON.stringify({ "_id": workoutDocIds[index-1],
                                      "exercise": vals[0],
                                      "sets": vals[1],
                                      "reps": vals[2],
                                      "weight": vals[3]})
        workouts[index-1] = body

        fetch( '/update', {
          method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body
        })
        .then( response => response.json() )
        .then( json => console.log( json ) )
        .then(showWorkouts())
        editValuesForm.innerHTML = ''
        document.getElementById("msg").innerHTML = "<p>Workout updated</p>"
        document.getElementById("msg").style.color = "green"
      }
      else {
        document.getElementById("msg").innerHTML = "<p>Incomplete form</p>"
        document.getElementById("msg").style.color = "red"
      }
    }
  }
  else {
    editValuesForm.innerHTML = ''
    document.getElementById("msg").innerHTML = `<p>The value ${index} is not in the table. Please enter a value between 1 and ${workouts.length}.</p>`
    document.getElementById("msg").style.color = "red"
  }
}

window.onload = function() {
  showWorkouts()
}