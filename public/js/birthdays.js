window.onload = function () {
	renderTable();
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

					cell1.innerHTML = `${birthdays[entries].firstname}`;
					cell2.innerHTML = `${birthdays[entries].lastname}`;
					cell3.innerHTML = `${birthdays[entries].relationship}`;
					cell4.innerHTML = `${birthdays[entries].birthday}`;
					cell5.innerHTML = `${birthdays[entries].giftidea}`;
					let delForm =cell6.appendChild(document.createElement("form"))
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

