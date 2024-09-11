const paddle1 = document.getElementById("left");
const paddle2 = document.getElementById("right");
const ball = document.getElementById("ball");
const scoreleft = document.getElementById("scoreleft");
const scoreright = document.getElementById("scoreright");
const gameArea = document.getElementById("pingpong");

let ballX = pingpong.clientWidth / 2;
let ballY = pingpong.clientHeight / 2;

const speed = 7;
let ballSpeedX = speed;
let ballSpeedY = speed;

let scoreL = 0;
let scoreR = 0;

let paddle1Y = paddle1.offsetTop;
let paddle2Y = paddle2.offsetTop;
const paddleSpeed = 20;

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      paddle1Y = Math.max(paddle1Y - paddleSpeed, 0);
      paddle1.style.top = paddle1Y + 'px';
      break;
    case 's':
      paddle1Y = Math.min(paddle1Y + paddleSpeed, gameArea.clientHeight - paddle1.clientHeight);
      paddle1.style.top = paddle1Y + 'px';
      break;
    case 'ArrowUp':
      paddle2Y = Math.max(paddle2Y - paddleSpeed, 0);
      paddle2.style.top = paddle2Y + 'px';
      break;
    case 'ArrowDown':
      paddle2Y = Math.min(paddle2Y + paddleSpeed, gameArea.clientHeight - paddle2.clientHeight);
      paddle2.style.top = paddle2Y + 'px';
      break;
  }
});

function resetBall() {
  ballX = pingpong.clientWidth / 2;
  ballY = pingpong.clientHeight / 2;
}

function update() {

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  console.log({ ballX, ballY });

  let limitX = pingpong.clientWidth - ball.clientWidth;
  let limitY = pingpong.clientHeight - ball.clientHeight;

  if (ballY >= limitY ||
    ballY <= 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX >= limitX || ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }

  // add point player left
  if (ballX >= limitX) {
    scoreL++;
    scoreleft.innerText = scoreL;
    console.log("Left Player scored");
    resetBall()
  }

  // add point player right
  if (ballX <= 0) {
    scoreR++;
    scoreright.innerText = scoreR;
    console.log("Right Player scored");
    resetBall()
  }

  // Ball collision with paddles
  if (ballX <= paddle1.clientWidth + paddle1.offsetLeft &&
    ballY >= paddle1.offsetTop &&
    ballY <= paddle1.offsetTop + paddle1.clientHeight) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX >= gameArea.clientWidth - (paddle2.clientWidth + ball.clientWidth + (gameArea.clientWidth - (paddle2.offsetLeft + paddle2.clientWidth))) &&
    ballY >= paddle2.offsetTop &&
    ballY <= paddle2.offsetTop + paddle2.clientHeight) {
    ballSpeedX = -ballSpeedX;
  }

  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
