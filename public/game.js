let spaces = [];
let mineCount = 0;
const boardSize = 16;
let boardElement = null;

window.onload = () => { 
    boardElement = document.getElementById("board");
    loadBoardFromJSON(-1);
}

function endGame(won) {
    if (won) {
        console.log("You win!");
    } else {
        console.log("You lost!");
    }
}

class Space {
    constructor(i) {
        this.index = i;
        this.isMine = false;
    }

    setMine(bool) {
        this.isMine = bool;
    }
    
    getIndex() {
        return this.index;
    }

    place() {
        if (this.isMine) {
            mineCount++;
            console.log("Placing mine no." + mineCount);
            document.getElementById("total-mines").innerHTML = mineCount;
        }
        const spaceDiv = document.createElement("div");
        spaceDiv.classList.add("space");
        spaceDiv.addEventListener("mousedown", () => {
            this.click();
        })
        spaceDiv.setAttribute("id", "space-" + this.index);
        board.appendChild(spaceDiv);
    }

    click() {
        const spaceDiv = document.getElementById("space-" + this.index);
        spaceDiv.classList.add("revealed");
        if (this.isMine) {
            spaceDiv.classList.add("mine");
            spaceDiv.innerHTML = "💣";
            endGame(false);
        }
    }
}

/**
 * Turn DB object JSON mines into mines to be handled by the game
 * @param {Array} mineList mines from DB object
 */
function parseMines(mineList) {
    for (let i = 0; i < boardSize*boardSize; i++) {
        const space = new Space(i);
        if (mineList.includes(i)) {
            space.setMine(true);
        }
        spaces.push(space);
    }
}

function loadBoardFromJSON(boardId) {

    function placeSpaces() {
        for (const space of spaces) {
            space.place();
        }
    }

    let boardData = true;
    if (boardId === -1) {
        // Get most recent board from db
    }
    if (boardData) {
        parseMines([0, 4]);
        placeSpaces();
    }
}