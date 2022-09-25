////////////////// for basic token

const form = document.querySelector('#login')
const userName = document.querySelector('#username')

form.addEventListener('submit', function(e){
  e.preventDefault()
  

    const usernameVal =  userName.value

    // this will be put in the local storage for your browser
    sessionStorage.setItem('usernameKey', usernameVal)

    // sessionStorage.clear
    // sessionStorage.remove('usernameKey')

    window.location.href = "main.html";
})

// for Github
debugger
const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN = URL_PARAMS.get('token');

//[Exception: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:3:28) at http://localhost:3000/login.js:24:15]

// Shows an element
const show = (selector) => {
  document.querySelector(selector).style.display = 'block'; // block will show the element
};

// Hides an element
const hide = (selector) => {
  document.querySelector(selector).style.display = 'none'; // none will hide the element
  
};

// if you have a token, show the authorized content. Otherwise show the unauthorized content.\

if (TOKEN) {
  hide('.content.unauthorized');
  show('.content.authorized');
}