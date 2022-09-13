import { populateTable } from "./table.js";
import {deleteGame, modifyGame, submitNewGame} from "./requests.js";

/**
 * onload function to initialize functionality
 */
window.onload = async function () {
    await populateTable();

    const submitButton = document.querySelector('#submitBtnSubmit');
    const modifyButton = document.querySelector("#modifyBtnSubmit");
    const deleteButton = document.querySelector("#modifyBtnDelete");

    submitButton.addEventListener("click", submitNewGame);
    modifyButton.addEventListener("click", modifyGame);
    deleteButton.addEventListener("click", deleteGame);
}


/**
 * @typedef {Object} GameObject
 * @property {Number} id
 * @property {String} date
 * @property {Number} hits
 * @property {Number} atBats
 * @property {Number} avg
 */