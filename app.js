// Winning array
const winingArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let gamemode;

// points
let crossPoints = 0;
let circlePoints = 0;
let countTies = 0;

// turns
let circleTurn = false;
const crossP = "cross";
const circleP = "circle";

const grid = document.querySelectorAll("#grid div");
const board = document.getElementById("grid");

// boxes
const blueBox = document.querySelector(".blue-box");
const tieBox = document.querySelector(".silver-box");
const orangeBox = document.querySelector(".orange-box");

// take to display scores then
const blueScore = document.getElementById("blue-score");
const orangeScore = document.getElementById("orange-score");
const ties = document.getElementById("ties");

const iBlueBox = document.getElementById("icon-player");
const iOrangeBox = document.getElementById("icon-other");

const restartEl = document.querySelectorAll(".restart");
const multiplayerEl = document.querySelectorAll(".multiplayer");
const soloEl = document.querySelectorAll(".solo");

const winnerEl = document.querySelectorAll(".winner");
const winnerText = document.getElementById("winner-text");
const winnerNum = document.getElementById("winner-num");
const winnerSymbol = document.getElementById("winner-symbol");

const tieText = document.getElementById("text-tie");

// buttons
const endButtons = document.querySelectorAll(".end-btn");
const restartButtons = document.querySelectorAll(".buttons-end .restart");

// Screens
const startScreen = document.getElementById("start-board");
const gameScreen = document.getElementById("game-board");
const endScreen = document.getElementById("end-screen");

const cpu = document.getElementById("cpu-btn");
const multiplayer = document.getElementById("player-btn");

// buttons
const quitBtn = document.querySelector(".quit");
const nextRoundBtn = document.querySelector(".next-rd");
const restartBtn = document.getElementById("restart-btn");

const noBtn = document.querySelector(".cancel");
const yesBtn = document.querySelector(".cont");

// functions to display screens
function showStartMenu() {
  startScreen.style.display = "flex";
  gameScreen.style.display = "none";
  endScreen.style.display = "none";
}

function showGameScreen() {
  gameScreen.style.display = "flex";
  startScreen.style.display = "none";
  endScreen.style.display = "none";
}

function messageScreen() {
  endScreen.style.display = "flex";
}

// reset the board
function resetBoard() {
  grid.forEach((box) => {
    box.classList.forEach((className) => {
      box.classList.remove(className);
    });
  });
}

// reset the scores
function resetScores() {
  crossPoints = 0;
  circlePoints = 0;
  countTies = 0;
}

// to quit the game
function quit() {
  showStartMenu();
  resetScores();
  resetBoard();
}

quitBtn.addEventListener("click", quit);

function show(el, property) {
  el.style.display = property;
}

function hide(el) {
  el.style.display = "none";
}

const playerX = document.querySelector(".x");
const playerO = document.querySelector(".o");

// to choose player x or o
function chooseP1(e) {
  let choice = e.target;
  document.querySelectorAll(".p1-choice div").forEach((div) => {
    div.classList.remove("player-1");
  });
  choice.classList.add("player-1");
}

playerX.addEventListener("click", chooseP1);
playerO.addEventListener("click", chooseP1);

function getPlayer() {
  const playerOne = document.querySelector(".player-1");
  return playerOne.id.slice(7);
}

// to style the score and player boxes
function sDivs(gamemode) {
  let colorP1 = getPlayer() == circleP ? "$light-yellow" : "$light-blue";
  let colorP2 = getPlayer() == circleP ? "$light-blue" : "$light-yellow";
  let nameP1 = getPlayer() == circleP ? "O (P1)" : "X (P1)";
  let nameP2 = getPlayer() == circleP ? "X (P2)" : "O (P2)";

  blueBox.style.backgroundColor = colorP1;
  orangeBox.style.backgroundColor = colorP2;

  if (gamemode != "cpu") {
    iBlueBox.innerHTML = nameP1;
    iOrangeBox.innerHTML = nameP2;
    orangeScore.innerHTML = circlePoints;
    blueScore.innerHTML = crossPoints;
  }
  if (gamemode == "cpu") {
    if (getPlayer() == circleP) {
      nameP1 = "O (YOU)";
      nameP2 = "X (CPU)";
      iBlueBox.innerHTML = nameP2;
      iOrangeBox.innerHTML = nameP1;
      blueScore.innerHTML = crossPoints;
      orangeScore.innerHTML = circlePoints;
    } else if (getPlayer() == crossP) {
      nameP1 = "X (YOU)";
      nameP2 = "O (CPU)";
      iBlueBox.innerHTML = nameP1;
      iOrangeBox.innerHTML = nameP2;
      orangeScore.innerHTML = circlePoints;
      blueScore.innerHTML = crossPoints;
    }
  } else {
    iBlueBox.innerHTML = nameP1;
    iOrangeBox.innerHTML = nameP2;
    orangeScore.innerHTML = circlePoints;
    blueScore.innerHTML = crossPoints;
  }

  ties.innerHTML = countTies;
}

// functions to add point to the winner
function addPoints(currentP) {
  if (!currentP) {
    countTies++;
  } else {
    currentP == circleP ? circlePoints++ : crossPoints++;
  }
  console.log("circle:", circlePoints);
  console.log("cross:", crossPoints); // to see in browser console
  console.log("ties:", countTies);
}

// check if someone won
function checkWin(className) {
  return winingArray.some((array) => {
    return array.every((number) => {
      return grid[number - 1].classList.contains(className);
    });
  });
}

// check if game is drawn
function isDraw() {
  return [...grid].every((box) => {
    return box.classList.contains(circleP) || box.classList.contains(crossP);
  });
}

// display the draw on screen
function displayDraw() {
  messageScreen();
  [winnerEl, soloEl, restartEl].forEach((array) => {
    array.forEach((el) => {
      hide(el);
    });
  });

  show(tieText, "block");
  endButtons.forEach((button) => {
    show(button, "block");
  });

  restartBtn.removeEventListener("click", restartGame);
}

function showTurn(circleTurn) {
  const turn = document.getElementById("turn");
  let src;
  circleTurn ? (src = "o") : (src = "x");
  turn.src = `assets/icon-${src}.svg`;
}

function switchTurn() {
  circleTurn = !circleTurn;
}

function placeMark(box, currentP) {
  if (box.classList.length == 0) {
    box.classList.add(currentP);
    switchTurn();
  }
}

function showHover(gamemode) {
  if (circleTurn) {
    board.classList.remove("cross-hover");
    board.classList.add("circle-hover");
  } else {
    board.classList.remove("circle-hover");
    board.classList.add("cross-hover");
  }

  if (gamemode == "cpu") {
    board.classList.remove("cross-hover");
    board.classList.remove("circle-hover");
    board.classList.add(`${getPlayer()}-hover`);
  }
}

function setHover(gamemode) {
  board.classList.remove(`${circleP}-hover`);
  board.classList.add(`${crossP}-hover`);

  if (gamemode == "cpu") {
    board.classList.remove("cross-hover");
    board.classList.remove("circle-hover");
    board.classList.add(`${getPlayer()}-hover`);
  }
}

function restartGame() {
  restartScreen();
}

// to display on the end-screen winnnner symbols
function displayColorAndSymbol(currentP) {
  let color = currentP == circleP ? "$light-yellow" : "$light-blue";
  let url = currentP == circleP ? "o" : "x";
  winnerSymbol.src = `assets/icon-${url}.svg`;
  winnerText.style.color = color;
}

// display the winner
function displayWinner(currentP) {
  messageScreen();
  restartEl.forEach((i) => {
    hide(i);
  });
  winnerEl.forEach((j) => {
    show(j, "flex");
  });
  endButtons.forEach((btn) => {
    show(btn, "block");
  });

  if (gamemode == "multiplayer") {
    soloEl.forEach((el) => {
      hide(el);
    });
    let num = getPlayer() == currentP ? 1 : 2;
    winnerNum.innerHTML = `${num}`;
  } else {
    multiplayerEl.forEach((el) => {
      hide(el);
    });
    soloEl.forEach((el) => {
      show(el, "block");
    });

    const winningText = document.getElementById("text-win");
    const losingText = document.getElementById("text-lose");

    if (currentP == getPlayer()) {
      show(winningText, "block");
      hide(losingText);
    } else {
      show(losingText, "block");
      hide(winningText);
    }
  }

  hide(tieText);
  displayColorAndSymbol(currentP);
  restartBtn.removeEventListener("click", restartGame);
}

function displayWinnerCombination(i, currentP) {
  let winner = `winner-${currentP}`;
  i.classList.remove(currentP);
  i.classList.add(winner);
}

function outline(currentP) {
  winingArray.forEach((win) => {
    if (
      document.getElementById(win[0]).classList == currentP &&
      document.getElementById(win[1]).classList == currentP &&
      document.getElementById(win[2]).classList == currentP
    ) {
      displayWinnerCombination(document.getElementById(win[0]), currentP);
      displayWinnerCombination(document.getElementById(win[1]), currentP);
      displayWinnerCombination(document.getElementById(win[2]), currentP);
    }
  });
}

function availableSpot(aiP) {
  let available = [];
  grid.forEach((el) => {
    if (el.classList != circleP && el.classList != crossP) {
      available.push(el);
    }
  });

  let box = available[Math.floor(Math.random() * (available.length - 1))];
  if (box) {
    box.removeEventListener("click", handleClick);
    box.classList.add(aiP);
  }
}

function aiMove(aiP) {
  setTimeout(() => {
    showTurn(circleTurn);
    availableSpot(aiP);

    if (checkWin(aiP) && !checkWin(getPlayer())) {
      displayWinner(aiP);
      outline(aiP);
      addPoints(aiP);
      grid.forEach((box) => {
        box.removeEventListener("click", handleClick);
      });
      return;
    } else if (isDraw()) {
      displayDraw();
      addPoints();
      grid.forEach((box) => {
        box.addEventListener("click", handleClick);
      });
      return;
    }
    switchTurn();
  }, 200);
}

function firstMove() {
  availableSpot(crossP);
}

function handleClick(e) {
  restartBtn.addEventListener("click", restartGame);

  let currentP = circleTurn ? circleP : crossP;
  const box = e.target;

  if (gamemode != "cpu") {
    placeMark(box, currentP);
    if (checkWin(currentP)) {
      addPoints(currentP);
      displayWinner(currentP);

      grid.forEach((box) => {
        box.removeEventListener("click", handleClick);
      });
      outline(currentP);
    } else if (isDraw()) {
      displayDraw();
      addPoints(false);
    }
    showTurn(circleTurn);
    showHover();
  } else if (gamemode == "cpu") {
    const aiP = getPlayer() == circleP ? crossP : circleP;
    circleTurn = getPlayer() == circleP ? false : true;
    showTurn(circleTurn);
    placeMark(box, getPlayer());
    if (!checkWin(getPlayer())) {
      aiMove(aiP);
    } else if (checkWin(getPlayer())) {
      displayWinner(getPlayer());
      outline(getPlayer());
      addPoints(getPlayer());
      grid.forEach((box) => {
        box.removeEventListener("click", handleClick);
      });
      return;
    } else if (isDraw()) {
      displayDraw();
      addPoints();
      grid.forEach((box) => {
        box.removeEventListener("click", handleClick);
      });
      return;
    }
  }
}

function restartScreen() {
  messageScreen();
  restartEl.forEach((el) => {
    show(el, "flex");
  });

  restartButtons.forEach((b) => {
    show(b, "block");
  });

  [multiplayerEl, winnerEl, soloEl, endButtons].forEach((arr) => {
    arr.forEach((el) => {
      hide(el);
    });
  });

  noBtn.addEventListener("click", () => {
    hide(endScreen);
  });
  yesBtn.addEventListener("click", () => {
    resetBoard();
    startGame(gamemode);
  });
  hide(tieText);
}

//
showStartMenu();
function startGame(gamemode) {
  sDivs(gamemode);
  showGameScreen();
  setHover(gamemode);
  grid.forEach((box) => {
    box.addEventListener("click", handleClick, { once: true });
  });

  circleTurn = false;
  if (gamemode == "cpu") {
    if (getPlayer() == circleP) {
      setTimeout(() => {
        firstMove();
        circleTurn = true;
        showTurn(circleTurn);
      }, 200);
    }
  }
}

// to start next round of the game
function nextRound() {
  resetBoard();
  hide(endScreen);
  startGame(gamemode);
}

nextRoundBtn.addEventListener("click", nextRound);

//
cpu.addEventListener("click", () => {
  startGame("cpu");
  gamemode = "cpu";
});

//
multiplayer.addEventListener("click", () => {
  startGame("multiplayer");
  gamemode = "multiplayer";
});
