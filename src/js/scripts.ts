
// Establish types for the message board
type HEX = `#${string}`;
interface Message {
	timeCreated: Date;
	color: HEX;
	message: string;
}

const messagesElement = <HTMLDivElement>document.getElementById("messages");

/**
 * Renders a message to an HTML element displaying the message, when it was posted, and a delete button
 * @param message
 */
function renderMessage(message: Message): HTMLDivElement {
	const rootDiv = document.createElement('div');
	rootDiv.className = 'message hbox';
	rootDiv.style.backgroundColor = message.color;
	rootDiv.innerHTML = `
		<p>${message.message}</p>
		<div class="hbox">
			<p>${message.timeCreated}</p>
			<button class="delete-button">
				<span class="material-symbols-outlined">delete</span>
			</button>
		</div>
	`;

	const deleteButton = <HTMLButtonElement>rootDiv.getElementsByClassName('delete-button')[0];
	deleteButton.onclick = (ev) => {
		const messageIndex = Array.from(messagesElement.children).indexOf(rootDiv);
		const body = JSON.stringify({index: messageIndex});

		fetch('/remove', {
			method: 'DELETE',
			body
		})
			.then(response => {
				rootDiv.remove();
				refreshMessages();
			});
	}

	return rootDiv;
}

// Get prior messages upon page load
function refreshMessages(entryAnimation = false, scrollToBottom = false) {
	fetch('/messages')
		.then(response => response.json())
		.then(json => {
			messagesElement.innerHTML = '';

			for (const message of json) {
				const newElement = renderMessage(message);
				if (!entryAnimation)
					newElement.style.animation = 'none 0'

				messagesElement.appendChild(newElement);
			}

			if (scrollToBottom)
				(<HTMLElement>document.getElementById('messages-section')).scrollTop = messagesElement.scrollHeight;
		});
}

refreshMessages(true, true);

// Handle sending a new message
const submit = function (e: Event) {
	// prevent default form action from being carried out
	e.preventDefault();

	const message = <HTMLInputElement>document.querySelector('#message-input'),
		color = <HTMLInputElement>document.getElementById('color'),
		json: Message = {timeCreated: new Date(), color: <HEX>color.value, message: message.value},
		body = JSON.stringify(json);

	fetch('/submit', {
		method: 'POST',
		body
	})
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			const newElement = renderMessage(json);
			document.getElementById("messages")?.appendChild(newElement);

			// Clear text from input
			message.value = "";
			refreshMessages();
		});

	return false;
}

const button = <HTMLButtonElement>document.querySelector('#submit');
button.onclick = submit;

// Dynamically resize chat feed
function setChatHeight() {
	const chatSection = <HTMLElement>document.getElementById('messages-section'),
		instructionsSection = <HTMLElement>document.getElementById('instructions'),
		inputSection = <HTMLElement>document.getElementById('input-section');

	chatSection.style.height
		= `${window.innerHeight - (instructionsSection.offsetHeight + inputSection.offsetHeight) - 50}px`;
}

setChatHeight();

window.addEventListener('resize', ev => {
	setChatHeight();
});

window.addEventListener('focus', () => refreshMessages());
