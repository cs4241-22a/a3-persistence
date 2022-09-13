import { fetchGames, modifyGame } from "./requests.js";
import { generateRow, parseRowToGameObject, toggleVisibility } from "./util.js";

/**
 * Populates the table with all of the most recent game data
 */
export const populateTable = async () => {
    const gamesData = await fetchGames();
    gamesData.forEach(game => {
        addGameToTable(game)
    });
}

/**
 * Takes in a game object and adds it as a row to the game table
 * @param {GameObject} gameObj 
 */
export const addGameToTable = (gameObj) => {
    const table = document.querySelector('tbody');
    table.innerHTML += generateRow(gameObj);

    const tableRows = table.getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length; i++) {
        tableRows.item(i).addEventListener("click", sendGameToModify)
    }
}

/**
 * Switches the form that is displayed
 */
export const switchForm = () => {
    const submitSection = document.querySelector("#submissionForm")
    const modifySection = document.querySelector("#modifyForm")

    toggleVisibility(submitSection)
    toggleVisibility(modifySection)
}

/**
 * Click event listener for the table rows. Sends the row data to the modify field and shows the modify field
 * @param {Event} event 
 */
const sendGameToModify = (event) => {
    const selectedGame = parseRowToGameObject(event.target.parentElement)
    const modifySection = document.querySelector("#modifyForm")

    switchForm();

    const modifyIdField = modifySection.querySelector("#idField")
    const modifyDatePicker = modifySection.querySelector("#modifyDatePicker")
    const modifyHitsField = modifySection.querySelector("#modifyHitsField")
    const modifyAtBatsField = modifySection.querySelector("#modifyAtBatsField")

    modifyIdField.value = selectedGame.id;
    modifyDatePicker.value = selectedGame.date;
    modifyHitsField.value = selectedGame.hits;
    modifyAtBatsField.value = selectedGame.atBats;
}

/**
 * Gets all the tr elements in the table body
 * @returns {HTMLCollection} Collection of tr elements in the tbody
 */
const getRowsInTable = () => {
    const table = document.querySelector("tbody");
    return table.children;
}

/**
 * Given a game object, finds the correct row in the table to modify and updates it with the new, correct data
 * @param {GameObject} gameObject 
 */
export const updateGameInTable = (gameObject) => {
    const tableRows = getRowsInTable();
    
    for(let i = 0; i<tableRows.length; i++){
        const row = tableRows.item(i);
        const rowGameID = row.children.item(0).innerHTML;
        if(rowGameID === gameObject.id) {
            row.outerHTML = generateRow(gameObject);
            document.querySelector(`#game_${gameObject.id}`).addEventListener("click", sendGameToModify);
        }
    }
}

/**
 * Given a game id finds the corresponding table row and removes it from the table
 * @param {String} gameID 
 */
export const removeGameFromTable = (gameID) => {
    const tableRows = getRowsInTable();

    for(let i = 0; i<tableRows.length; i++){
        const row = tableRows.item(i);
        const rowGameID = row.children.item(0).innerHTML;
        if(rowGameID === gameID){
            row.remove()
        }
    }

}