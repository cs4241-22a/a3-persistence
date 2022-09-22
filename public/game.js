let spaces = [];
let mineCount = 0;
let allMines = [];
const boardSize = 16;
let spacesLeft = boardSize * boardSize;
let boardElement = null;
let flagMode = false;
let gameTime = 0;
let gameOver = false;
let timerRunning = false;
let puzzleClicks = [];
let puzzleFlags = [];

window.onload = () => { 
    redirectIfNotLoggedIn();
    boardElement = document.getElementById("board");
    loadBoardFromJSON(-1);
    document.getElementById("flag-mode-toggle").addEventListener("mousedown", () => {
        flagMode = !flagMode;
        document.getElementById("flag-mode-toggle").innerHTML = "🚩 " + (flagMode ? "ON" : "OFF");
    });
    loadPuzzleList();
    loadLogoutButton();
}

function redirectIfNotLoggedIn() {
    if (!localStorage.getItem("MS:email")) {
        window.location = "/login";
    }
}

function loadLogoutButton() {
    const email = localStorage.getItem("MS:email");
    document.getElementById("user-info").innerHTML = "Logged in as: " + email;
    document.getElementById("logout-button").onclick = () => {
        window.location = "/";
    }
}

function resetBoard() {
    allMines = [];
    spaces = [];
    gameTime = 0;
    gameOver = false;
    timerRunning = false;
    boardElement.innerHTML = "";
    spacesLeft = boardSize * boardSize;
    mineCount = 0;
    puzzleClicks = [];
    puzzleFlags = [];
}

function loadPuzzleList() {
    fetch("/puzzle-list").then((res) => {
        res.json().then((oldPuzzles) => {
            if (oldPuzzles) {
                const puzzleObjects = JSON.parse(oldPuzzles);
                console.log(puzzleObjects);
                const puzzleList = document.getElementById("puzzle-list");
                for (const p of puzzleObjects) {
                    const puzzleLink = document.createElement("li");
                    puzzleLink.innerHTML = p.title;
                    puzzleLink.addEventListener("mousedown", () => {
                        loadOldPuzzle(p.id);
                    });
                    puzzleList.appendChild(puzzleLink);
                }
            }
        })
    })
}

function loadOldPuzzle(puzzleId) {
    resetBoard();
    loadBoardFromJSON(puzzleId);
}

function loadWinConditions() {
    spacesLeft = spacesLeft - mineCount;
}

function loadMineCounts() {
    for (const space of spaces) {
        space.mineCount = space.getAdjacentMines();
    }
}

function endGame(won) {
    gameOver = true;
    stopTimer();
    revealMines(won);
    document.getElementById("modal-title").innerHTML = won ? "You won!" : "You lost!";
    document.getElementById("modal-body").innerHTML = won ? "Time: " + gameTime : "Better luck next time!";
    document.getElementById("modal-button").innerHTML = won ? "Close" : "Close >:(";
    document.getElementById("modal-button").onclick = () => {
        $('#modal').modal('hide');
    }
    $('#modal').modal('show');
    for (const space of spaces) {
        if (space.isFlagged) {
            puzzleFlags.push(space.index);
        }
    }
}

function revealMines(won) {
    for (const mineIndex of allMines) {
        const spaceEl = document.getElementById("space-" + mineIndex);
        spaceEl.classList.add("revealed");
        spaceEl.innerHTML = '💣';
        if (won) {
            spaceEl.classList.add("green");
        } else {
            spaceEl.classList.add("mine");
        }
    }
}

function stopTimer() {
    timerRunning = false;
}

function startTimer() {

    console.log("Starting timer...");

    const timerP = document.getElementById("time");
    timerRunning = true;

    function incTime() {
        if (timerRunning) {
            timerP.innerHTML = "Time: " + gameTime/100;
            setTimeout(() => {
                gameTime += 1;
                incTime();
            }, 10)
        }
    }
    
    incTime();
}

class Space {
    constructor(i) {
        this.index = i;
        this.isMine = false;
        this.isRevealed = false;
        this.mineCount = 0;
        this.isFlagged = false;
    }

    setMine(bool) {
        this.isMine = bool;
    }

    getNeighbors() {
        let neighbors = [
            {
                index: this.index - 17,
                valid: true,
            },
            {
                index: this.index - 16,
                valid: true,
            },
            {
                index: this.index - 15,
                valid: true,
            },
            {
                index: this.index - 1,
                valid: true,
            },
            {
                index: this.index,
                valid: false,
            },
            {
                index: this.index + 1,
                valid: true,
            },
            {
                index: this.index + 15,
                valid: true,
            },
            {
                index: this.index + 16,
                valid: true,
            },
            {
                index: this.index + 17,
                valid: true,
            },
        ];
        const onLeft = this.index % 16 === 0;
        const onRight = (this.index) % 16 === 15;
        const onTop = this.index < 16;
        const onBottom = this.index >= 240;
        if (onLeft) {
            neighbors[0].valid = false;
            neighbors[3].valid = false;
            neighbors[6].valid = false;
        }
        if (onRight) {
            neighbors[2].valid = false;
            neighbors[5].valid = false;
            neighbors[8].valid = false;
        }
        if (onTop) {
            neighbors[0].valid = false;
            neighbors[1].valid = false;
            neighbors[2].valid = false;
        }
        if (onBottom) {
            neighbors[6].valid = false;
            neighbors[7].valid = false;
            neighbors[8].valid = false;
        }
        let validNeighbors = [];
        for (const n of neighbors) {
            if (n.valid) {
                validNeighbors.push(n.index);
            }
        }
        return validNeighbors;
    }

    place() {
        if (this.isMine) {
            mineCount++;
            document.getElementById("total-mines").innerHTML = mineCount;
        }
        const spaceDiv = document.createElement("div");
        spaceDiv.classList.add("space");
        spaceDiv.addEventListener("mousedown", (e) => {
            this.click(e);
        });
        spaceDiv.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
        spaceDiv.setAttribute("id", "space-" + this.index);
        board.appendChild(spaceDiv);
    }

    getAdjacentMines() {
        const neighbors = this.getNeighbors();
        let m = 0;
        for (const n of neighbors) {
            const neighborObject = spaces[n];
            if (neighborObject.isMine) {
                m++;
            }
        }
        return m;
    }

    reveal(e) {
        if (this.isRevealed || this.isMine || this.isFlagged) {
            return;
        }

        this.isRevealed = true;
        const spaceDiv = document.getElementById("space-" + this.index);
        spaceDiv.classList.add("revealed");

        if (this.mineCount > 0) {
            spaceDiv.innerHTML = this.mineCount > 0 ? this.mineCount.toString() : "";
            spaceDiv.classList.add("bomb" + this.mineCount.toString());
        } else {
            // Totally safe. Reveal neighbors?
            const neighbors = this.getNeighbors();
            for (const n of neighbors) {
                const neighborEl = spaces[n];
                if (!neighborEl.isMine) {
                    neighborEl.click(e);
                }
            }
        }
        spacesLeft--;
        if (spacesLeft <= 0) {
            endGame(true);
        }
    }

    click(e) {
        if (gameOver) {
            return;
        }
        if (!timerRunning) {
            startTimer();
        } 
        puzzleClicks.push(this.index);
        if (e.button === 0) {   
            if (flagMode) {
                this.toggleFlag();
            } else {
                if (this.isMine) {
                    const spaceDiv = document.getElementById("space-" + this.index);
                    spaceDiv.classList.add("revealed");
                    spaceDiv.classList.add("mine");
                    spaceDiv.innerHTML = "💣";
                    endGame(false);
                } else {
                    this.reveal(e);
                }
            }
        } else if (e.button === 2) {
            this.toggleFlag();
        }
    }

    toggleFlag() {
        if (this.isRevealed) {
            return;
        }
        this.isFlagged = !this.isFlagged;
        document.getElementById("space-" + this.index).innerHTML = this.isFlagged ? "🚩" : "";
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

    fetch("/puzzle?id=" + boardId).then((res) => {
        res.json().then((boardData) => {
            if (boardData) {
                const data = JSON.parse(boardData);
                document.getElementById("title").innerHTML = data.title;
                parseMines(data.mines);
                allMines = data.mines;
                placeSpaces();
                loadMineCounts();
                loadWinConditions();
                checkStatus();
            }
        })
    })
}

function checkStatus() {
    const userStatus = "";
    
    switch (userStatus) {
        case "failed":
            for (const click of userClicks) {
                spaces[click].reveal({button: 0});
            }
            for (const flag of userFlags) {
                spaces[flag].toggleFlag();
            }
            showResult(false);
            break;
        case "won":
            for (const click of userClicks) {
                spaces[click].reveal({button: 0});
            }
            for (const flag of userFlags) {
                spaces[flag].toggleFlag();
            }
            showResult(true);
            break;
        default: 
            break;
    }
}

function showResult(won) {
    gameOver = true;
    stopTimer();
    revealMines(won);
}