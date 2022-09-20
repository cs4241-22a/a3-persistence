// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const Vote1 = function( e ) {
    // prevent default form action from being carried out
    console.log("Testing")

    const json = { vote: 1 },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
    })

    return false
  }