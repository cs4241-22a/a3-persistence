const submit = function(event){
	event.preventDefault()
	let name = document.getElementById('name').value
	let pass = document.getElementById('pass').value

	let body = JSON.stringify({username: name, pass: pass})
	fetch('/login',{
		method: 'POST',
		body,
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => {
		if(response.status !== 200){
			window.alert('Wrong username or password')
		}
		else{
			window.localStorage.setItem('username', name)
			window.location.replace("http://localhost:3000/home")
		}
	})
}

window.onload = function() {
    const button = document.getElementById('login')
    button.onclick = submit
}