const paddle1 = document.getElementById("left");
const paddle2 = document.getElementById("right");
const ball = document.getElementById("ball");
const scoreleft = document.getElementById("scoreleft");
const scoreright = document.getElementById("scoreright");
const gameArea = document.getElementById("pingpong");
const winnerMsg = document.getElementById("winnerMessage");

console.log(winnerMsg.innerText);

let ballX = pingpong.clientWidth / 2;
let ballY = pingpong.clientHeight / 2;

const speed = 8;
let ballSpeedX = speed;
let ballSpeedY = speed;

let scoreL = 0;
let scoreR = 0;

let paddle1Y = paddle1.offsetTop;
let paddle2Y = paddle2.offsetTop;
const paddleSpeed = 10;

function resetBall() {
  ballX = pingpong.clientWidth / 2;
  ballY = pingpong.clientHeight / 2;

  // Random angle between -45 and 45 degrees
  const initialAngle = (Math.random() * Math.PI / 2) - (Math.PI / 4);
  ballSpeedX = speed * Math.cos(initialAngle);
  ballSpeedY = speed * Math.sin(initialAngle);
}

function calculateBounceAngle(ballY, paddleY, paddleHeight) {
  const relativeIntersectY = (paddleY + (paddleHeight / 2)) - ballY;
  const normalizedRelativeIntersectionY = (relativeIntersectY / (paddleHeight / 2));
  // Max bounce angle is 45 degrees
  const bounceAngle = normalizedRelativeIntersectionY * Math.PI / 4;
  return bounceAngle;
}

function displayWinnerMsg() {
  scoreL = 0;
  scoreR = 0;
  winnerMsg.style.display = "block";
  resetBall();
}

const limitX = pingpong.clientWidth - ball.clientWidth;
const limitY = pingpong.clientHeight - ball.clientHeight;

const paddle1Limit = paddle1.offsetLeft + paddle1.clientWidth;
const paddle2Limit = paddle2.offsetLeft - (paddle2.clientWidth / 2 + ball.clientWidth / 2);

let paddle1Up = false;
let paddle1Down = false;
let paddle2Up = false;
let paddle2Down = false;

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

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // logic top/bottom collision detection
  if (ballY >= limitY || ballY <= 0) {
    ballSpeedY = -ballSpeedY;
  }

  // add point player left
  if (ballX >= gameArea.clientWidth - ball.clientWidth) {
    scoreL++;
    scoreleft.innerText = scoreL;
    resetBall();
  }

  // add point player right
  if (ballX <= 0) {
    scoreR++;
    scoreright.innerText = scoreR;
    resetBall();
  }

  if (scoreR === 10) {
    displayWinnerMsg();
  } else if (scoreL === 10) {
    displayWinnerMsg();
  }

  // Ball collision with left paddle 
  if (
    ballX <= paddle1.offsetLeft + paddle1.clientWidth &&
    ballX + ball.clientWidth >= paddle1.offsetLeft &&
    ballY + ball.clientHeight >= paddle1.offsetTop &&
    ballY <= paddle1.offsetTop + paddle1.clientHeight
  ) {
    const bounceAngle = calculateBounceAngle(ballY + ball.clientHeight / 2, paddle1.offsetTop, paddle1.clientHeight);
    ballSpeedX = speed * Math.cos(bounceAngle);
    ballSpeedY = speed * -Math.sin(bounceAngle);
    ballX = paddle1.offsetLeft + paddle1.clientWidth; // Adjust position to avoid sticking
    ballX = paddle1.offsetLeft + paddle1.clientWidth;
  }

  // Ball collision with right paddle
  if (
    ballX + ball.clientWidth >= paddle2.offsetLeft &&
    ballX <= paddle2.offsetLeft + paddle2.clientWidth &&
    ballY + ball.clientHeight >= paddle2.offsetTop &&
    ballY <= paddle2.offsetTop + paddle2.clientHeight
  ) {
    const bounceAngle = calculateBounceAngle(ballY + ball.clientHeight / 2, paddle2.offsetTop, paddle2.clientHeight);
    ballSpeedX = -speed * Math.cos(bounceAngle);
    ballSpeedY = speed * -Math.sin(bounceAngle);
    ballX = paddle2.offsetLeft - ball.clientWidth; // Adjust position to avoid stickingl.clientWidth;
  }

  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';

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
