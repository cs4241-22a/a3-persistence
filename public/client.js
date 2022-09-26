/*
 * Client Game Scripts
 */

var score = 0;

var totalRock = 0,
  totalPaper = 0,
  totalScissors = 0;

var win = false;
var gameover = false;

// 0 = Rock, 1 = Paper, 2 = Scissors
const rps_game = function (choice) {
  // Checks to see if a user has already lost the game, preventing them from continuing
  if (gameover) {
    return;
  }

  // Resets the value of win if continuing
  win = false;

  // Set computer choice based on a random number
  const computerChoice = getRandomInt(0, 3);

  const result = getWinner();

  const update = updateGame();

  // Check winner
  function getWinner() {
    switch (choice) {
      // Player chose Rock
      case 0:
        // Player loses
        if (computerChoice === 1) {
          gameover = true;
        }
        // Player wins
        else if (computerChoice === 2) {
          win = true;
          score++;
        }
        totalRock++;
        break;
      // Player chose Paper
      case 1:
        // Player loses
        if (computerChoice === 2) {
          gameover = true;
        }
        // Player wins
        else if (computerChoice === 0) {
          win = true;
          score++;
        }
        totalPaper++;
        break;
      // Player chose Scissors
      case 2:
        // Player loses
        if (computerChoice === 0) {
          gameover = true;
        }
        // Player wins
        else if (computerChoice === 1) {
          win = true;
          score++;
        }
        totalScissors++;
        break;
    }
  }

  // Update game data
  function updateGame() {
    const playerScore = document.getElementById("score");
    const playerChose = document.getElementById("player");
    const computerChose = document.getElementById("computer");
    const statusMsg = document.getElementById("status");

    playerScore.textContent = "Score: " + score;

    // Update text to show most recent player choice
    let playerText = "";
    switch (choice) {
      case 0:
        playerText = "Rock";
        break;
      case 1:
        playerText = "Paper";
        break;
      case 2:
        playerText = "Scissors";
        break;
    }
    playerChose.textContent = "Player Chose: " + playerText;

    // Update text to show most recent player choice
    let compText = "";
    switch (computerChoice) {
      case 0:
        compText = "Rock";
        break;
      case 1:
        compText = "Paper";
        break;
      case 2:
        compText = "Scissors";
        break;
    }
    computerChose.textContent = "Computer Chose: " + compText;

    // Update text and continue game
    if (win) {
      statusMsg.textContent = "You Won this Round! Keep Going!";
    }
    // Update text and set final game values for updating server data
    else if (gameover) {
      statusMsg.textContent = "Game Over! Submit Your Score";
      document.getElementById("submission").style.visibility = "visible";

      document.getElementById("rock").value = totalRock;
      document.getElementById("paper").value = totalPaper;
      document.getElementById("scissors").value = totalScissors;
    } else {
      statusMsg.textContent = "It's a Tie! Keep Going!";
    }
  }
};

// Generate random number
function getRandomInt(low, high) {
  low = Math.ceil(low);
  high = Math.floor(high);
  return Math.floor(Math.random() * (high - low) + low);
}

/*
 * Client and Server Updates
 */
let allIDs = [];

function getFavorite() {
  let choice = document.getElementsByName("favoriteChoice");

  for (let i = 0; i < choice.length; i++) {
    if (choice[i].checked) {
      console.log(choice[i].value);
      return choice[i].value;
    } else {
      return "";
    }
  }
}

// Delete corresponding entry
let deleteButton = function (idNum) {
  console.log("Delete Button Pressed: ", idNum);

  let id = allIDs[idNum];

  console.log("Delete ID: ", id);

  const body = JSON.stringify({ id: id });

  table.innerHTML =
    "<tr>" +
    "<th>Change Favorite Choice</th>" +
    "<th>Delete Score</th>" +
    "<th>Score</th>" +
    "<th>Rock</th>" +
    "<th>Paper</th>" +
    "<th>Scissors</th>" +
    "<th>Favorite Choice</th>" +
    "</tr>";

  fetch("/deleteSubmit", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(newTable);
};

// Change corresponding entry's most_used data
let changeButton = function (idNum) {
  console.log("Change Button Pressed: ", idNum);

  let id = allIDs[idNum];
  let favorite = document.querySelector(
    'input[name="favoriteChoice"]:checked'
  ).value;

  console.log("Change ID: ", id);
  console.log("New Favorite Choice: ", favorite);

  const body = JSON.stringify({
    id: id,
    most_used: favorite,
  });

  table.innerHTML =
    "<tr>" +
    "<th>Change Favorite Choice</th>" +
    "<th>Delete Score</th>" +
    "<th>Score</th>" +
    "<th>Rock</th>" +
    "<th>Paper</th>" +
    "<th>Scissors</th>" +
    "<th>Favorite Choice</th>" +
    "</tr>";

  fetch("/update", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(newTable);
};

let testF = function (t) {
  console.log("test: ", t);
};

const newTable = (window.onload = function () {
  console.log("Table data being added");

  let i = 0;

  fetch("/getAll", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      allIDs = [];
      data.forEach((item) => {
        let changeClick = "changeButton(" + item._id + ")";
        let currentID = item._id.toString();

        table.innerHTML +=
          "<tr><td>" +
          "<button class='btn btn-success' id='changeButton" +
          i +
          "' onclick=changeButton('" +
          i +
          "')>Change</button>" +
          "<label class='visually-hidden' for='changeButton'>Change</label>" +
          "</td>" +
          "<td>" +
          "<button class='btn btn-success' id='deleteButton" +
          i +
          "' onclick=deleteButton('" +
          i +
          "')>Delete</button>" +
          "<label class='visually-hidden' for='deleteButton'>Delete</label>" +
          "</td>" +
          "<td>" +
          item.score +
          "</td>" +
          "<td>" +
          item.rock +
          "</td>" +
          "<td>" +
          item.paper +
          "</td>" +
          "<td>" +
          item.scissors +
          "</td>" +
          "<td>" +
          item.most_used +
          "</td></tr>";
        allIDs.push(item._id);
        console.log(document.getElementById("deleteButton" + i));
        i++;
      });
    });
});

// Variables to elements in HTML
const table = document.getElementById("dataTable");
const scoreText = document.getElementById("score").innerHTML;
const scoreButton = document.querySelector("#scoreSubmit");

scoreButton.addEventListener("click", (e) => {
  // prevent default form action from being carried out
  e.preventDefault();

  console.log("Submit Button Pressed");

  const score = document.querySelector("#score"),
    rock = document.querySelector("#rock"),
    paper = document.querySelector("#paper"),
    scissors = document.querySelector("#scissors"),
    json = {
      name: "",
      password: "",
      score: parseInt(scoreText.substr(7, scoreText.length)),
      rock: parseInt(rock.value),
      paper: parseInt(paper.value),
      scissors: parseInt(scissors.value),
      most_used: "",
    },
    body = JSON.stringify(json);

  table.innerHTML =
    "<tr>" +
    "<th>Change Favorite Choice</th>" +
    "<th>Delete Score</th>" +
    "<th>Score</th>" +
    "<th>Rock</th>" +
    "<th>Paper</th>" +
    "<th>Scissors</th>" +
    "<th>Favorite Choice</th>" +
    "</tr>";

  fetch("/submit", {
    method: "POST",
    body,
  }).then(newTable);
});
