const submit = function(event){
	event.preventDefault()
	let name = document.getElementById('name').value
	let pass = document.getElementById('pass').value

	let body = JSON.stringify({username: name, pass: pass})

	if(!name || !pass){
		window.alert('Please enter in a Username and Password')
		return -1;
	}
	
	fetch('/register',{
		method: 'POST',
		body,
		headers: {
		'Content-Type': 'application/json'
		}
	})
	.then(response => {
		if(response.status !== 200){
			window.alert('Could not create user')
		}
		else
			window.location.href= "https://a3-greg-klimov.glitch.me/login"
	})
}

window.onload = function() {
    const button = document.getElementById('register')
    button.onclick = submit
}