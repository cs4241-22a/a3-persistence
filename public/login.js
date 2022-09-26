////////////////// for basic token

const form = document.querySelector('#loginBasic')
const userName = document.querySelector('#username')
const password = document.querySelector('#password')

form.addEventListener('submit', function(e){
  e.preventDefault()
  if ( (userName.value =="tester")&& (password.value == "test")){
    sessionStorage.removeItem('usernameKey') // this gets rid of any lingering values in the sessionStorage
    const usernameVal =  userName.value
    // this will be put in the local storage for your browser
    sessionStorage.setItem('usernameKey', usernameVal)
    // sessionStorage.clear
    window.location.href = "main.html";
  }
  else{
    alert("Error: You entered the wrong credentials")
  }

})

// for Github User
const url = window.location.search  // returns "?token%20=%20______________________"
// the spaces ( %20) in the url are making URLSearchParams().get return null, so I just decided to remove the spaces from the url
const urlNoSpaces = url.replaceAll('%20', '') // returns "?token=______________________"
const URL_PARAMS = new URLSearchParams(urlNoSpaces);
const TOKEN = URL_PARAMS.get('token');

//[Exception: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:3:28) at http://localhost:3000/login.js:24:15]

// Shows an element
const show = (selector) => {
  document.querySelector(selector).style.display = 'block'; // block will show the element
};

// Hides an element
const hide = (selector) => {
  document.querySelector(selector).style.display = 'none'; // none will hide the element
  debugger
};

// if you have a token, show the authorized content. Otherwise show the unauthorized content.\

if (TOKEN) {
  hide('.content.unauthorized');
  show('.content.authorized');
  hide(".basicAuthorization")
  sessionStorage.removeItem('usernameKey') // this gets rid of any lingering values in the sessionStorage
  const userNameGitHub = "GithubUser"
  sessionStorage.setItem('usernameKey',userNameGitHub)
}

