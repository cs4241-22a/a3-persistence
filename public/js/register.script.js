const submit = function(event){
	event.preventDefault();
	let newEntry = {
		uname: document.getElementById('Uname').value,
		pass: document.getElementById('Pass').value,
	}

	if(!newEntry.uname || !newEntry.pass){
		window.alert('Please enter in a Username and Password')
		return -1;
	}
	
	let l = document.getElementById('reg_status')
	let body = JSON.stringify(newEntry);
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
			window.location.href= "http://localhost:3000/login"
	})
}

window.onload = function() {
    const button = document.getElementById('reg_button')
    button.onclick = submit
}