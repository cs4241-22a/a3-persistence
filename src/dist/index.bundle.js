/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/scripts.js":
/*!***************************!*\
  !*** ./src/js/scripts.js ***!
  \***************************/
/***/ (() => {

eval("\r\nconst messagesElement = document.getElementById(\"messages\");\r\n/**\r\n * Renders a message to an HTML element displaying the message, when it was posted, and a delete button\r\n * @param message\r\n */\r\nfunction renderMessage(message) {\r\n    const rootDiv = document.createElement('div');\r\n    rootDiv.className = 'message hbox';\r\n    rootDiv.style.backgroundColor = message.color;\r\n    rootDiv.innerHTML = `\r\n\t\t<p>${message.message}</p>\r\n\t\t<div class=\"hbox\">\r\n\t\t\t<p>${message.timeCreated}</p>\r\n\t\t\t<button class=\"delete-button\">\r\n\t\t\t\t<span class=\"material-symbols-outlined\">delete</span>\r\n\t\t\t</button>\r\n\t\t</div>\r\n\t`;\r\n    const deleteButton = rootDiv.getElementsByClassName('delete-button')[0];\r\n    deleteButton.onclick = (ev) => {\r\n        const messageIndex = Array.from(messagesElement.children).indexOf(rootDiv);\r\n        const body = JSON.stringify({ index: messageIndex });\r\n        fetch('/remove', {\r\n            method: 'DELETE',\r\n            body\r\n        })\r\n            .then(response => {\r\n            rootDiv.remove();\r\n            refreshMessages();\r\n        });\r\n    };\r\n    return rootDiv;\r\n}\r\n// Get prior messages upon page load\r\nfunction refreshMessages(entryAnimation = false, scrollToBottom = false) {\r\n    fetch('/messages')\r\n        .then(response => response.json())\r\n        .then(json => {\r\n        messagesElement.innerHTML = '';\r\n        for (const message of json) {\r\n            const newElement = renderMessage(message);\r\n            if (!entryAnimation)\r\n                newElement.style.animation = 'none 0';\r\n            messagesElement.appendChild(newElement);\r\n        }\r\n        if (scrollToBottom)\r\n            document.getElementById('messages-section').scrollTop = messagesElement.scrollHeight;\r\n    });\r\n}\r\nrefreshMessages(true, true);\r\n// Handle sending a new message\r\nconst submit = function (e) {\r\n    // prevent default form action from being carried out\r\n    e.preventDefault();\r\n    const message = document.querySelector('#message-input'), color = document.getElementById('color'), json = { timeCreated: new Date(), color: color.value, message: message.value }, body = JSON.stringify(json);\r\n    fetch('/submit', {\r\n        method: 'POST',\r\n        body\r\n    })\r\n        .then((response) => response.json())\r\n        .then((json) => {\r\n        console.log(json);\r\n        const newElement = renderMessage(json);\r\n        document.getElementById(\"messages\")?.appendChild(newElement);\r\n        // Clear text from input\r\n        message.value = \"\";\r\n        refreshMessages();\r\n    });\r\n    return false;\r\n};\r\nconst button = document.querySelector('#submit');\r\nbutton.onclick = submit;\r\n// Dynamically resize chat feed\r\nfunction setChatHeight() {\r\n    const chatSection = document.getElementById('messages-section'), instructionsSection = document.getElementById('instructions'), inputSection = document.getElementById('input-section');\r\n    chatSection.style.height\r\n        = `${window.innerHeight - (instructionsSection.offsetHeight + inputSection.offsetHeight) - 50}px`;\r\n}\r\nsetChatHeight();\r\nwindow.addEventListener('resize', ev => {\r\n    setChatHeight();\r\n});\r\nwindow.addEventListener('focus', () => refreshMessages());\r\n\n\n//# sourceURL=webpack://cs4241_assignment_3/./src/js/scripts.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/scripts.js"]();
/******/ 	
/******/ })()
;