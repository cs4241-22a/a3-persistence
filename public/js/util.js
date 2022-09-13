/**
 * Takes in a tr element from the table and parses it into a GameObject
 * @param {HTMLElement} trElement 
 * @returns {import("./scripts").GameObject}
 */
export const parseRowToGameObject = (trElement) => {
    return {
        _id: trElement.children[0].innerHTML,
        date: trElement.children[1].innerHTML,
        hits: trElement.children[2].innerHTML,
        atBats: trElement.children[3].innerHTML,
        avg: trElement.children[4].innerHTML,
    }
}

/**
 * Using the #id of the form section get the corresponding field values
 * @param {String} sectionID 
 * @returns {import("./scripts").GameObject}
 */
export const getFormValues = (sectionID) => {
    const section = document.querySelector(sectionID);
    const inputValues = section.getElementsByTagName("input");

    return {
        _id: inputValues.item(0).value,
        date: inputValues.item(1).value,
        hits: parseInt(inputValues.item(2).value),
        atBats: parseInt(inputValues.item(3).value),
        avg: null
    }
}

/**
 * Helper function that generates the html for a single row in the table given a single game's data
 * @param {GameObject} statsData data object of a single game
 * 
 * @returns html for a single game to be added to the table
 */
export const generateRow = (statsData) => {
    return `<tr id="game_${statsData._id}">
        <td class="hidden">${statsData._id}</td>
        <td>${statsData.date}</td>
        <td>${statsData.hits}</td>
        <td>${statsData.atBats}</td>
        <td>${statsData.avg.toFixed(3)}</td>
    </tr>`
}

/**
 * Toggles the visibility class of an element
 * @param {HTMLElement} element 
 */
export const toggleVisibility = (element) => {
    if (element.classList.contains("visible")) {
        element.classList.remove("visible");
        element.classList.add("hidden");
    } else if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
        element.classList.add("visible");
    } else {
        console.log("Element is not toggleable")
    }
}