window.onload = function () {
	renderTable();
};

//Used to reset form after cancelling an update birthday action
function cancelUpdate() {
	document.querySelector("#cancel").remove(); //Remove cancell button
	//Return update button to orginial add new birthday button
	let newBDBtn = document.querySelector("button#updateBirthday");
	newBDBtn.id = "submitBirthday";
	newBDBtn.innerHTML = "Add new Birthday";
	//Reset form and swap form action back to default (add new birthday)
	document.querySelector("form#newBirthday").action = "/newBirthday";
	document.querySelector("form#newBirthday").reset();
	//Reset form heading 
	document.querySelector("h2#form").innerHTML = "Add a New Birthday"
	//Return add new button to original location
	document.querySelector("#newBirthday").appendChild(newBDBtn);
}

//Function to allow users to edit a submitted birthday
async function editBirthday(timeID) {
	let data = { submitTime: timeID };
	//Get object of birthday to edit
	fetch("/editBirthday", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((birthday) => {
			//Set form values to that object
			document.querySelector("input#firstname").value = birthday.firstname;
			document.querySelector("input#lastname").value = birthday.lastname;
			document.querySelector("input#relationship").value =
				birthday.relationship;
			document.querySelector("input#birthday").value = birthday.birthday;
			document.querySelector("textarea#giftidea").value = birthday.giftidea;
			//Create hidden input field used to capture UID of birthday to edit
			let submitTime = document
				.querySelector("form#newBirthday")
				.appendChild(document.createElement("input"));
			submitTime.type = "hidden";
			submitTime.name = "submitTime";
			submitTime.value = Number(birthday.submitTime);
			//Create update button and update form action
			let updateBtn = document.querySelector("button#submitBirthday");
			updateBtn.id = "updateBirthday";
			updateBtn.innerHTML = "Update Birthday";
			document.querySelector("form#newBirthday").action = "/updateBirthday";
			//Update form heading
			document.querySelector("h2#form").innerHTML = "Update Birthday"
			//Create cancel button and set oncick function to cancelUpdate()
			let cancelBtn = document.createElement("button");
			cancelBtn.innerHTML = "Cancel";
			cancelBtn.id = "cancel";
			cancelBtn.onclick = cancelUpdate;
			//Reposition buttons to be withing formGrid div
			document.querySelector(".formGrid").appendChild(cancelBtn);
			document.querySelector(".formGrid").appendChild(updateBtn);
			//Scroll to top of form
			document.querySelector("input#firstname").scrollIntoView();
		});
}

//I'm not sorry
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
				message.innerHTML =
					"There are no saved birthdays. Add a new birthday using the form above!";
			} else {
				//Remove no birthdays message if it exists
				if (document.getElementById("nobirthdays").innerHTML != null) {
					let message = document.getElementById("nobirthdays");
					message.innerHTML = " ";
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
				<th>Days Until Next Birthday</th>
				<th>Gift Idea</th>
				<th style="background-color: black;"></th>
				<th style="background-color: black;"></th>`;
				for (let entries in birthdays) {
					let row = document.createElement("tr");
					row.className = "results";
					resultsTable.appendChild(row);

					let cells = {};
					for (var i = 1; i <= 8; i++) {
						cells["cell" + i] = row.insertCell();
					}

					cells.cell1.innerHTML = `${birthdays[entries].firstname}`;
					cells.cell2.innerHTML = `${birthdays[entries].lastname}`;
					cells.cell3.innerHTML = `${birthdays[entries].relationship}`;
					cells.cell4.innerHTML = `${birthdays[entries].birthday}`;
					cells.cell5.innerHTML = `${daysUntilCalc(
						birthdays[entries].birthday
					)}`;
					cells.cell6.innerHTML = `${birthdays[entries].giftidea}`;

					let editBtn = cells.cell7.appendChild(
						document.createElement("button")
					);
					editBtn.className = "edit";
					editBtn.innerHTML = "Edit";
					editBtn.id = `${birthdays[entries].submitTime}`;
					editBtn.onclick = function () {
						editBirthday(editBtn.id);
					};

					let delForm = cells.cell8.appendChild(document.createElement("form"));
					delForm.action = "/removeBirthday";
					delForm.method = "POST";
					let submitTime = delForm.appendChild(document.createElement("input"));
					submitTime.type = "hidden";
					submitTime.name = "submitTime";
					submitTime.value = `${birthdays[entries].submitTime}`;
					let delBtn = delForm.appendChild(document.createElement("button"));
					delBtn.className = `delete`;
					delBtn.type = "submit";
					delBtn.innerHTML = "Delete";
				}
			}
		});
}

//Function to calculate the number of days until next birthday
function daysUntilCalc(string) {
	let currentDay = new Date();
	let birthArray = string.split("-");
	let birthday = new Date(birthArray[0], birthArray[1] - 1, birthArray[2]); //Month is subtracted by 1 since JS counts months 0-11
	//Set current year or the next year if you already had birthday this year
	birthday.setFullYear(currentDay.getFullYear());
	if (currentDay > birthday) {
		birthday.setFullYear(currentDay.getFullYear() + 1);
	}
	//Calculate difference between days
	let daysUntil = Math.floor((birthday - currentDay) / (1000 * 60 * 60 * 24));
	return daysUntil;
}
