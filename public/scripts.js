//Add button
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
}

fetch( '/add', {
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body 
})

//Remove button
const remove = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
}

fetch( '/remove', {
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body 
})

//Modify button
const modify = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
}

fetch( '/modify', {
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body 
})

//onload
window.onload = function() {
    fetch( '/user', {
        method:'POST'
    })
}