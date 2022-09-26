// Add some Javascript code here, to run on the front end.
let timer = document.getElementById("timer");
let result = document.getElementById("clicks");
let clicks = document.getElementById("result");
let begin = document.getElementById("begin");
let clickArea = document.getElementById("clickarea");
let formB = document.getElementById("formButton");

let duration = 10;
let beginTime;
let lastClickTime;
let currentClickTime;
let lastClickGap;
let currentClickGap;
var clickable = false;
let score = 0;
let similarClicks = 0;


function beginGame() {
  begin.style.visibility = "hidden";
  similarClicks = 0;
  score = 0;
  clickable = true;
  beginTime = new Date().getTime();
  lastClickTime = beginTime;
  currentClickTime = beginTime;
  lastClickGap = 0;
  currentClickGap = 0;

  let timerTracker = setInterval(function () {
    let count = (new Date().getTime() - beginTime) / 1000;

    //while timer active
    if (count < duration) {
      timer.textContent = (10 - count).toFixed(3);
      clicks.textContent = (score / count).toFixed(1);
    } else {
      clickable = false;
      clearInterval(timerTracker);
      resetGame();
    }
  }, 1);
}

function resetGame() {
  let CPS = (score / duration).toFixed(1);
  timer.textContent = "0.000";
  clicks.textContent = CPS;

  //flash screen red and wait to reshow button to avoid accidentally clicking it again
  clickArea.style.backgroundColor = "hsl(348, 86%, 43%)";
  setTimeout(function () {
    clickArea.style.backgroundColor = "hsl(171, 100%, 29%)";
    begin.style.visibility = "visible";
    if ((score < 145 && similarClicks/score < 0.86) || score == 1) {
      formB.style.visibility = "visible";
    } else {
      formB.style.visibility = "hidden";
      alert("No cheating! Using an auto clicker again will ban your GitHub account from participating!");
      
    }
    timer.textContent = duration.toFixed(3);
  }, 1000);
}

begin.addEventListener("click", function (e) {
  beginGame();
});

clickArea.addEventListener("click", function (e) {
  if (clickable) {
    score++;
    result.textContent = score;
    //ANTI AUTO-CLICKER \/
    lastClickTime = currentClickTime;
    currentClickTime = new Date().getTime();
    lastClickGap = currentClickGap;
    currentClickGap = currentClickTime - lastClickTime;
    if (Math.abs(currentClickGap - lastClickGap) < 5) {
      similarClicks++;
    }
  }
});
