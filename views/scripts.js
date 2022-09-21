// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 3!")

// game logic
const game = () => {
    let playerScore = 0;
    let computerScore = 0;
    let moves = 0;

    const playGame = () => {
        const rockBtn = document.querySelector('.rock');
        const paperBtn = document.querySelector('.paper');
        const scissorBtn = document.querySelector('.scissor');
        const playerOptions = [rockBtn, paperBtn, scissorBtn];
        const computerOptions = ['rock', 'paper', 'scissors']

        // Function to start playing game
        playerOptions.forEach(option => {
            option.addEventListener('click', function () {

                const movesLeft = document.querySelector('.movesleft');
                moves++;
                movesLeft.innerText = `Moves Left: ${5 - moves}`;

                const choiceNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[choiceNumber];

                // Function to check who wins
                winner(this.innerText, computerChoice)

                // Calling gameOver function after 5 moves
                if (moves == 5) {
                    gameOver(playerOptions, movesLeft);
                }
            })
        })
    }

    // Function to decide winner
    const winner = (player, computer) => {
        const result = document.querySelector('.result');
        const playerScoreBoard = document.querySelector('.p-count');
        const computerScoreBoard = document.querySelector('.c-count');
        player = player.toLowerCase();
        computer = computer.toLowerCase();
        if (player === computer) {
            result.textContent = 'Tie'
            // increment both scores when a tie occurs
            computerScore++;
            computerScoreBoard.textContent = computerScore;
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        }
        else if (player == 'rock') {
            if (computer == 'paper') {
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;

            } else {
                result.textContent = 'Player Won'
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
        else if (player == 'scissors') {
            if (computer == 'rock') {
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            } else {
                result.textContent = 'Player Won';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
        else if (player == 'paper') {
            if (computer == 'scissors') {
                result.textContent = 'Computer Won';
                computerScore++;
                computerScoreBoard.textContent = computerScore;
            } else {
                result.textContent = 'Player Won';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
            }
        }
    }

    // Function to run when game is over
    const gameOver = (playerOptions, movesLeft) => {

        const chooseMove = document.querySelector('.move');
        const result = document.querySelector('.result');
        const reloadBtn = document.querySelector('.reload');
        var gameStatus = 2;

        playerOptions.forEach(option => {
            option.style.display = 'none';
        })


        chooseMove.innerText = 'Game Over!!'
        movesLeft.style.display = 'none';

        if (playerScore > computerScore) {
            result.style.fontSize = '2rem';
            result.innerText = 'You Won The Game'
            result.style.color = '#308D46';
            gameStatus = 1;
           
        }
        else if (playerScore < computerScore) {
            result.style.fontSize = '2rem';
            result.innerText = 'You Lost The Game';
            result.style.color = 'red';
            gameStatus = 0;
           
        }
        else {
            result.style.fontSize = '2rem';
            result.innerText = 'Tie';
            result.style.color = 'grey'
        }
        reloadBtn.innerText = 'Restart';
        reloadBtn.style.display = 'flex';
        // if (gameStatus === 0) {
        //     reloadBtn.onclick = handleGameLose
        // }
        // if (gameStatus === 1) {
        //     reloadBtn.onclick = handleGameWin
        // }
        reloadBtn.addEventListener('click', () => {
            window.location.reload();
        })
    }


    // Calling playGame function inside game
    playGame();

}

// Calling the game function
game();

// called when win
const handleGameWin = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const newUser = document.querySelector('#currentUsername'),
        json = { currentuser: "_WinCondition_", newusername: newUser.value },
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(async function (response) {
            let data = await response.json()
            const currentUser = document.querySelector('#currentUsername')
            if (currentUser.value !== null) {
                const pos = findDataIndex(data, newUser.value)
                makeCurrentTable(data,pos)
                makeTable(data);
            }
            else{alert("Please choose a user!")}
        })
    return false
}

// called when lose
const handleGameLose = function (e) {
     // prevent default form action from being carried out
     e.preventDefault()

     const newUser = document.querySelector('#currentUsername'),
         json = { currentuser: "_LossCondition_", newusername: newUser.value },
         body = JSON.stringify(json)
 
     fetch('/submit', {
         method: 'POST',
         body
     })
         .then(async function (response) {
             let data = await response.json()
             if (currentUser.value !== null) {
                const pos = findDataIndex(data, newUser.value)
                makeCurrentTable(data,pos)
                makeTable(data);
            }
            else{alert("Please choose a user!")}
         })
     return false
 }
