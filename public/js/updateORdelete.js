window.onload = function () {
	renderTable();
    document.querySelector("table").scrollIntoView();
};


function renderTable() {
	fetch("/birthdays", {
		method: "GET",
	})
		.then((res) => res.json())
		.then((birthdays) => {
			if (JSON.stringify(birthdays) === "[]") {
				console.log("No data to display :(");
				let resultsTable = document.querySelector("table.results");
				resultsTable.innerHTML = " ";
				let message = document.getElementById("nobirthdays");
				message.innerHTML = 'There are no saved birthdays. Add a new birthday using the form above!'
			} else {
				//Remove no birthdays message if it exists
				if (document.getElementById("nobirthdays").innerHTML != null) {
					let message = document.getElementById("nobirthdays");
					message.innerHTML = " "
				}
				let resultsTable = document.querySelector("table.results");
				resultsTable.innerHTML = " ";
				let hRow = document.createElement("tr");
				hRow.className = "results";
				resultsTable.appendChild(hRow);
				hRow.innerHTML = `<th>First Name</th>
				<th>Last Name</th>
				<th>Relationship</th>
				<th>Birthday</th>
				<th>Gift Idea</th>
				<th style="background-color: black;"></th>
				<th style="background-color: black;"></th>`;
				for (let entries in birthdays) {
					let row = document.createElement("tr");
					row.className = "results";
					resultsTable.appendChild(row);

					let cell1 = row.insertCell(0);
					let cell2 = row.insertCell(1);
					let cell3 = row.insertCell(2);
					let cell4 = row.insertCell(3);
					let cell5 = row.insertCell(4);
					let cell6 = row.insertCell(5);
					let cell7 = row.insertCell(6);

					cell1.innerHTML = `${birthdays[entries].firstname}`;
					cell2.innerHTML = `${birthdays[entries].lastname}`;
					cell3.innerHTML = `${birthdays[entries].relationship}`;
					cell4.innerHTML = `${birthdays[entries].birthday}`;
					cell5.innerHTML = `${birthdays[entries].giftidea}`;
					let editBtn = cell6.appendChild(document.createElement("button"));
					editBtn.className = 'edit';
					editBtn.innerHTML = "Edit"
					editBtn.id = `${birthdays[entries].submitTime}`;
					editBtn.onclick = function () {
						editBirthday(editBtn.id);
					}

					let delForm = cell7.appendChild(document.createElement("form"))
					delForm.action = "/removeBirthday";
					delForm.method = "POST";
					let submitTime = delForm.appendChild(document.createElement("input"))
					submitTime.type = "hidden"
					submitTime.name = "submitTime"
					submitTime.value = `${birthdays[entries].submitTime}`;
					let delBtn = delForm.appendChild(document.createElement("button"));
					delBtn.className = `delete`;
					delBtn.type =  "submit"
					delBtn.innerHTML = "Delete";
				}
			}
		});
}

async function editBirthday(timeID) {
	let data = {submitTime: timeID}
	fetch("/editBirthday", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	})
		.then((res) => res.json())
		.then((birthday) => {
			document.querySelector("input#firstname").value = birthday.firstname;
			document.querySelector("input#lastname").value = birthday.lastname;
			document.querySelector("input#relationship").value = birthday.relationship;
			document.querySelector("input#birthday").value = birthday.birthday;
			document.querySelector("input#giftidea").value = birthday.giftidea;
			let submitTime = document.querySelector("form").appendChild(document.createElement("input"))
			submitTime.type = "hidden"
			submitTime.name = "submitTime"
			submitTime.value = birthday.submitTime
			document.querySelector("button#newBirthday").innerHTML = "Update Birthday"
			document.querySelector("button#newBirthday").onclick = updateBirthday;
			document.querySelector("form").action = "/updateBirthday"
			document.querySelector("input#firstname").scrollIntoView();
		})
}

function updateBirthday(event) {
		
}