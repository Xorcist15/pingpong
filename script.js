// HTML Elemets used
const paddle1 = document.getElementById("left");
const paddle2 = document.getElementById("right");
const ball = document.getElementById("ball");
const scoreleft = document.getElementById("scoreleft");
const scoreright = document.getElementById("scoreright");
const gameArea = document.getElementById("gameArea");
const winnerBox = document.getElementById("winnerBox");
const winnerMsg = document.getElementById("winnerMsg");
const replayBtn = document.getElementById("replay");

// Ball variables 
const speed = 6;
const speedIncr = 6;
let ballSpeedX = speed;
let ballSpeedY = speed;
let ballX = gameArea.clientWidth / 2;
let ballY = gameArea.clientHeight / 2;

// Scores
let scoreL = 0;
let scoreR = 0;

// Paddles variables 
let paddle1Y = paddle1.offsetTop;
let paddle2Y = paddle2.offsetTop;
const paddleSpeed = 12;

// Used to test bottom colision
const limitY = gameArea.clientHeight - ball.clientHeight;

// Used to detect paddle movements
let paddle1Up = false;
let paddle1Down = false;
let paddle2Up = false;
let paddle2Down = false;

// MAX score points
const MAX_SCORE = 10;

function ResetBall() {
  ballX = gameArea.clientWidth / 2;
  ballY = gameArea.clientHeight / 2;

  // Random angle between -45 and 45 degrees
  const initialAngle = (Math.random() * Math.PI / 2) - (Math.PI / 4);
  ballSpeedX = speed * Math.cos(initialAngle);
  ballSpeedY = speed * Math.sin(initialAngle);

  // make first throw direction random
  const dir = Math.floor(Math.random() * 2);
  if (dir == 1) {
    ballSpeedX = -ballSpeedX;
  }
}

function CalculateBounceAngle(ballY, paddleY, paddleHeight) {
  const relativeIntersectY = (paddleY + (paddleHeight / 2)) - ballY;
  const normalizedRelativeIntersectionY = (relativeIntersectY / (paddleHeight / 2));
  // Max bounce angle is 45 degrees
  const bounceAngle = normalizedRelativeIntersectionY * Math.PI / 4;
  return bounceAngle;
}

function DisplayWinnerBox(player) {
  let winner = '';
  switch (player) {
    case "RED":
      winner = 'RED';
      winnerBox.setAttribute("class", 'winnerMessageRed')
      replayBtn.setAttribute('class', 'replayRed');
      break;
    case "BLUE":
      winner = 'BLUE';
      winnerBox.setAttribute("class", 'winnerMessageBlue')
      replayBtn.setAttribute('class', 'replayBlue');
      break;
  }
  winnerMsg.innerText = "PLAYER " + winner + " WINS";
  winnerBox.style.display = "block";
  PauseGame();
}

function PauseGame() {
  ballSpeedX = 0;
  ballSpeedY = 0;
}

function ResetGame() {
  scoreL = 0;
  scoreR = 0;
  ResetBall();
  SetGame();
}

// set game defaults
function SetGame() {
  scoreleft.innerText = 0;
  scoreright.innerText = 0;
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      paddle1Up = true;
      break;
    case 's':
      paddle1Down = true;
      break;
    case 'ArrowUp':
      paddle2Up = true;
      break;
    case 'ArrowDown':
      paddle2Down = true;
      break;
  }
});

document.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      paddle1Up = false;
      break;
    case 's':
      paddle1Down = false;
      break;
    case 'ArrowUp':
      paddle2Up = false;
      break;
    case 'ArrowDown':
      paddle2Down = false;
      break;
  }
});

replayBtn.onclick = () => {
  ResetGame();
  winnerBox.style.display = "none";
}

SetGame();

function update() {
  // update ball speed
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // test top collision
  if (ballY <= 0) {
    ballY = 0; // Adjust position to the limit
    ballSpeedY = -ballSpeedY; // Reverse direction
  }

  // test bottom collision
  if (ballY >= limitY) {
    ballY = limitY; // Adjust position to the limit
    ballSpeedY = -ballSpeedY; // Reverse direction
  }

  // check if any player has one
  if (scoreR === MAX_SCORE) {
    DisplayWinnerBox("BLUE");
  } else if (scoreL === MAX_SCORE) {
    DisplayWinnerBox("RED");
  }

  // add point player left
  if (ballX >= gameArea.clientWidth - ball.clientWidth) {
    scoreL++;
    scoreleft.innerText = scoreL;
    ResetBall();
  }

  // add point player right
  if (ballX <= 0) {
    scoreR++;
    scoreright.innerText = scoreR;
    ResetBall();
  }

  // Ball collision with left paddle 
  if (
    ballX <= paddle1.offsetLeft + paddle1.clientWidth &&
    ballX + ball.clientWidth >= paddle1.offsetLeft &&
    ballY + ball.clientHeight >= paddle1.offsetTop &&
    ballY <= paddle1.offsetTop + paddle1.clientHeight
  ) {
    const bounceAngle = CalculateBounceAngle(ballY + ball.clientHeight / 2, paddle1.offsetTop, paddle1.clientHeight);
    ballSpeedX = speed * Math.cos(bounceAngle);
    ballSpeedY = speed * -Math.sin(bounceAngle);
    // increment speed
    ballSpeedX += (ballSpeedX > 0 ? speedIncr : -speedIncr);
    ballSpeedY += (ballSpeedY > 0 ? speedIncr : -speedIncr);
    ballX = paddle1.offsetLeft + paddle1.clientWidth; // Adjust position to avoid sticking
  }

  // Ball collision with right paddle
  if (
    ballX + ball.clientWidth >= paddle2.offsetLeft &&
    ballX <= paddle2.offsetLeft + paddle2.clientWidth &&
    ballY + ball.clientHeight >= paddle2.offsetTop &&
    ballY <= paddle2.offsetTop + paddle2.clientHeight
  ) {
    const bounceAngle = CalculateBounceAngle(ballY + ball.clientHeight / 2, paddle2.offsetTop, paddle2.clientHeight);
    ballSpeedX = -speed * Math.cos(bounceAngle);
    ballSpeedY = speed * -Math.sin(bounceAngle);
    // increment speed
    ballSpeedX += (ballSpeedX > 0 ? speedIncr : -speedIncr);
    ballSpeedY += (ballSpeedY > 0 ? speedIncr : -speedIncr);
    ballX = paddle2.offsetLeft - ball.clientWidth; // Adjust position to avoid sticking
  }

  // update ball coordinates
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';

  // logic for paddle movement 
  if (paddle1Up) {
    paddle1Y = Math.max(paddle1Y - paddleSpeed, 0);
  }
  if (paddle1Down) {
    paddle1Y = Math.min(paddle1Y + paddleSpeed, gameArea.clientHeight - paddle1.clientHeight);
  }
  paddle1.style.top = paddle1Y + "px";

  if (paddle2Up) {
    paddle2Y = Math.max(paddle2Y - paddleSpeed, 0);
  }
  if (paddle2Down) {
    paddle2Y = Math.min(paddle2Y + paddleSpeed, gameArea.clientHeight - paddle2.clientHeight);
  }
  paddle2.style.top = paddle2Y + "px";

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
