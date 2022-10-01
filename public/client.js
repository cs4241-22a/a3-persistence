// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

/*
// INDEX THINGS
//const userFormLogin = document.querySelector("form");
//const userFormRegister = document.querySelector("form");
//const userFormLogin = document.getElementById("login");
//const userFormRegister = document.getElementById("register")
const loginButton = document.getElementById("submit");
const registerButton = document.getElementById("register");

registerButton.addEventListener("click", event => {
  // stop our form submission from refreshing the page
  event.preventDefault();

  fetch("/register", {
    method: "POST",
    body: JSON.stringify({
      usr: registerButton.elements.username.value, // was userForm? problem?
      pwd: registerButton.elements.password.value, // was userForm? problem?
      entries: []
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      if (json.login) {
        window.location.href = "tracker";
      } else {
        window.alert(
          "That user already exists! Maybe try another name?"
        );
      }
    });

  // reset form
  registerButton.reset(); // was userForm? problem?
});
*/

// MAIN THINGS

// our default array of dreams
const dreams = []

// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
let totalDreams = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];
const logoutButton = document.getElementById("logout");

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream.className + ", Level " + dream.classNumber;
  dreamsList.appendChild(newListItem);
}

// to print shit
const printThing = function(thingToPrint) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = thingToPrint;
  dreamsList.appendChild(newListItem);
}

// to print list
const printList = function(listToPrint) {
  for(var i = 0; i<listToPrint.length; i++) {
    const newListItem = document.createElement('li'); 
    newListItem.innerHTML = listToPrint[i];
    dreamsList.appendChild(newListItem);
  }
}

// that helper function but with different inputs; will this work better?
const appendNewDream2 = function(className, classNumber) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = className + ", Level " + classNumber;
  dreamsList.appendChild(newListItem);
}

// iterate through every dream and add it to our page
dreams.forEach( function(dream) {
  appendNewDream(dream);
});

// try to do logout button

logoutButton.addEventListener("click", event => {
  event.preventDefault();
  
  fetch("/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
    window.location.href = "/"
  })
})

// end of logout button attempt

/*
const addToServer = function(className, classNumber) {
  fetch("/addToServer", {
    method: "POST",
    body: JSON.stringify({
      className: className,
      classNumber: classNumber
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}
*/


fetch("/dreams")
  .then(response => response.json()) // parse the JSON from the server
  .then(dreams => {
    console.log(dreams)
    // remove the loading text
    dreamsList.firstElementChild.remove();
  
    // get server shit
    /*fetch("/getInitialDreams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(entries => {
        console.log("entries: ");
        console.log(entries);
        dreams = entries;
        //fillPage(entries);
      });
    */
    // end of get server shit
  
    // iterate through every dream and add it to our page
    dreams.forEach(appendNewDream);
  
    // second button attempt for all:
    dreamsForm.addEventListener("submit", event => {
      event.preventDefault();
      //printThing("submit clicked!");
      
      //create new Dream
      //let newDream = dreamsForm.elements.dream.value;
      let newDreamClassName = dreamsForm.elements.dream.value;
      let newDreamClassNumber = dreamsForm.elements.classNumber.value;
      const newDream = {
        className: newDreamClassName,
        classNumber: newDreamClassNumber
      }
      
      // loop through to see if it's an edit or deletion
      const dreamsLength = dreams.length;
      let wasItDone = false;
      for (let i = 0; i < dreamsLength && !wasItDone; i++) {
        //printThing("Tryna check smth?");
        console.log("name " + dreams[i].className);
        console.log("Number " + dreams[i].classNumber);
        if (dreams[i].classNumber == newDreamClassNumber) {
          if (dreams[i].className == newDreamClassName) {
            //delete
            //console.log(dreams.length);
            console.log("deleting");
            dreams.splice(i,1);
            wasItDone = true;
            console.log(dreams.length);
            
            // communicate w database through other server
            fetch("/trynaDeleteSmth", {
              method: "POST",
              body: JSON.stringify({
                className: newDreamClassName,
                classNumber: newDreamClassNumber
              }),
              headers: {
                "Content-Type": "application/json"
              }  
            })
            // end database communication
          }
          else {
            // edit
            console.log("editing")
            dreams[i].className = newDreamClassName;
            wasItDone = true;
            // communicate w database through other server
            fetch("/trynaEditSmth", {
              method: "POST",
              body: JSON.stringify({
                className: newDreamClassName,
                classNumber: newDreamClassNumber
              }),
              headers: {
                "Content-Type": "application/json"
              }  
            })
            // end database communication
          }
        }
      }
      if (wasItDone == false) {
        // console.log("tryna add smth");
        dreams.push(newDream);
        // communicate w the server w the database I think
        fetch("/trynaAddSmth", {
          method: "POST",
          body: JSON.stringify({
            className: newDreamClassName,
            classNumber: newDreamClassNumber
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
      }
      
      // remove everything from screen
      while (dreamsList.firstChild) {
        dreamsList.removeChild(dreamsList.firstChild);
      }
      
      
      //reprint everything
      //for (let i = 0; i < dreams.length; i++) {
      //  appendNewDream(dreams[i]);
      //}
      dreams.forEach(appendNewDream);

      // reset form
      dreamsForm.reset();
      dreamsForm.elements.dream.focus();
    })
  
    // listen for the form to be submitted and add a new dream when it is
    /*dreamsForm.addEventListener("submit", event => {
      // stop our form submission from refreshing the page
      event.preventDefault();
      
      printThing("submit clicked!");

      // get dream value and add it to the list
      //let newDream = dreamsForm.elements.dream.value;
      let newDreamClassName = dreamsForm.elements.dream.value;
      let newDreamClassNumber = dreamsForm.elements.classNumber.value;
      
      let newDream = {
        className: newDreamClassName,
        classNumber: newDreamClassNumber
      }
      
      dreams.push(newDream);
      appendNewDream(newDream);
      
      // reset form
      dreamsForm.reset();
      dreamsForm.elements.dream.focus();
    });
    */
  
    //edit things
    /*dreamsForm.addEventListener("edit", event => {
      // stop our form submission from refreshing the page
      event.preventDefault();
      
      printThing("edit clicked!");
      
      // remove all dreams
      while (dreamsList.firstChild) {
        dreamsList.removeChild(dreamsList.firstChild);
      }
      
      // find class by level and edit it
      for (let i = 0; i < totalDreams.length; i++) {
        if (totalDreams[i].classNumber === dreamsForm.elements.classNumber.value) {
          totalDreams[i].className = dreamsForm.elements.className.value;
        }
      }
      
      // reprint all classes
      for (let i = 0; i < totalDreams.length; i++) {
        appendNewDream(totalDreams[i]);
      }

      // reset form
      dreamsForm.reset();
      dreamsForm.elements.dream.focus();
    });
    // edit button ending
    */
  
    // listen for an edit button to be clicked
    dreamsForm.addEventListener("edit", event => {
      event.preventDefault();
      
    });
  });

