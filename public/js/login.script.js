const submit = function(event){
	event.preventDefault();
	let newEntry = {
        uname: document.getElementById('Uname').value,
        password: document.getElementById('Pass').value,
    }

	let body = JSON.stringify(newEntry);
	fetch('/login',{
		method: 'POST',
		body,
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json()) 
	.then(entry=> {
		let result = JSON.stringify(entry)
		console.log(result)
		if(JSON.parse(result) == "Fail"){
			window.alert('Wrong username or password')
		}
		else{
			window.localStorage.setItem('username', newEntry.uname);
			window.location.replace("http://localhost:3000/home")
		}
	})
}

window.onload = function() {
    const button = document.getElementById('login_button')
    button.onclick = submit
}