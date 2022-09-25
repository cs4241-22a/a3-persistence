// Add some Javascript code here, to run on the front end.
console.log("Welcome to assignment 2!")

let username = ""

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
	
	let Form = document.getElementById('EditForm');
	if (Form.checkValidity() == false) {
		let list = Form.querySelectorAll(':invalid');
		for (let item of list) {
			item.focus();
		}
	}
	else{

		const input1 = document.querySelector('#ename').value
		const input2 = document.querySelector('#eloc').value
		
		let input3 = ""
		const days = "mtwrfsu"
		for (var i = 0; i < days.length; i++) {
			const checkbox = document.querySelector('#' + days.charAt(i))
			if(checkbox.checked === true)
				input3 += days.charAt(i)
		}
		
		const input4 = document.querySelector('#etimestart').value
		const input5 = document.querySelector('#etimeend').value
		const input6 = document.querySelector('#ecolor').value
		const input7 = document.querySelector('#edetails').value
		
		const json = {'username':username,  'eventname': input1, 'location': input2, 'day': input3, 'time': input4, 'timeend': input5, 'duration': input5 - input4, 'color': input6, 'details': input7}
		const body = JSON.stringify( json )

		fetch( '/new', {
		  method:'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body 
		})
		.then( function( response ) {
		  // do something with the reponse 
		  updatedata()
		})
	}
    return false
  }
  
  const updatedata = function(){
	let body = JSON.stringify({'username':username})
	fetch('/getsch', {
        method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body
    }).then(function(response) {
		
		if(response.status === 200){
			console.log("load success")
			return response.json()
		}
		else{
			window.location.replace("http://localhost:3000/login")
			return []
		}
    }).then(function(appdata) {
		updatetables(appdata)})
  }
  
  const updatetables = function(appdata){
	
	const tableViewTable = document.getElementById("tableViewTable")
	clearTable(tableViewTable)
	
	const userlabel = document.getElementById("userlabel")
	userlabel.innerHTML = "Welcome " + username
	
	for(let i = 0; i < appdata.length; i++){
		let row = tableViewTable.insertRow(i + 1)
		
		for(let j = 0; j < 8; j++){
			var cell = row.insertCell(j)
			cell.innerHTML = Object.values(appdata[i])[j + 2]
		}
	}
	
	const calendarTable = document.getElementById("calendarTable")
	clearTable(calendarTable)
	
	const _days = "_mtwrfsu"
		
	for(let i = 0; i < 24; i++){
		let row = calendarTable.insertRow(i + 1)
		
		for(let j = 0; j < 8; j++){
			let cell = null
			
			let x = (i % 12)
			if(x === 0)
				x = 12
			
			if(j === 0){
				let headerCell = document.createElement("TH");
				if(i < 12){
					headerCell.innerHTML = "" + x + " AM"
				}
				else{
					headerCell.innerHTML = "" + x + " PM"
				}
				row.appendChild(headerCell);
			}
			else{
				cell = row.insertCell(j)
			}	
						
			for(let z = 0; z < appdata.length; z++){
				const row = Object.values(appdata[z])
				
				if(row.length < 3){
					console.log(row)
					continue
				}
				
				const name = row[2]
				const days = row[4]
				const start = row[5]
				const end = row[6]
				const color = row[8]
				
				if(days.includes(_days.charAt(j)))
				{
					if(i < end && i >= start){
						cell.bgColor = color
						cell.innerHTML = name
						cell.style.color = "white"
					}
				}
			}
			
		}
	}
  }
  
  const logout = function(){
	window.localStorage.removeItem('username');
	window.location.href= "http://localhost:3000/login"
  }
  
  const cancel = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
	
	document.getElementById("neweventdetails").removeAttribute("open");
	
    return false
  }
  
  const reset = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
	document.getElementById("EditForm").reset()
	return false
  }
  
  const clearTable = function(table){
	table.getElementsByTagName("tbody")[0].innerHTML = table.rows[0].innerHTML;
  }

  const updateduration = function(){
	let val1 = document.getElementById('etimestart').value
	let val2 = document.getElementById('etimeend').value
	
	if(val1 !== null && val2 !== null && val1 !== "" && val2 !== "")
		document.getElementById('eduration').innerHTML = "" + (val2 - val1)
	else
		document.getElementById('eduration').innerHTML = "0"
  }

  window.onload = function() {
	 username = window.localStorage.getItem('username')
	 if(username === "" || username === null){
		console.log(username + " user not found")
		window.location.href= "http://localhost:3000/login"
		return
	 }
	 console.log("user: "  + username)
		
	
    let button = document.querySelector( '[id = "esubmit"]' )
    button.onclick = submit
	
	button = document.querySelector( '[id = "ecancel"]' )
    button.onclick = cancel
	
	button = document.querySelector( '[id = "ereset"]' )
    button.onclick = reset
		
	button = document.querySelector( '[id = "removeEvent"]' )
    button.onclick = function() {
			let str = document.querySelector('#delname').value
			document.getElementById('delname').value = ""
			if(str !== "" && str !== null){
				let j = {name : str}
				let body = JSON.stringify(j)
				fetch( '/del', {
				  method:'POST',
				  body
				})
				.then( function( response ) {
				  // do something with the reponse 
				updatedata()
				})
			}
		}
		
	button = document.querySelector('[id = "logoutButton"]')
	button.onclick = logout
		
		
	button = document.querySelector( '[id = "clearEvents"]' )
    button.onclick = function() {
			if(button.innerHTML === "Delete all events")
				button.innerHTML = "Are you sure?"
			else{
				button.innerHTML = "Delete all events?"
				document.getElementById('clreventdetails').removeAttribute('open')
				let body = ""
				fetch( '/clr', {
				  method:'POST',
				  body
				})
				.then( function( response ) {
				  // do something with the reponse 
				updatedata()
				})
			}
		}
	
	window.onbeforeunload = function(){
		window.location.href= "http://localhost:3000/logout"
		
	};
		
	updatedata()
  }
  
  