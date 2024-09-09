const pingpong = document.getElementById("pingpong");
const leftpaddle = document.getElementById("left");
const rightpaddle = document.getElementById("right");
const ball = document.getElementById("ball");

let ballX = pingpong.clientWidth / 2;
let ballY = pingpong.clientHeight / 2;

console.log(pingpong.clientHeight)
console.log(pingpong.clientWidth)

const speed = 10;
let ballSpeedX = speed;
let ballSpeedY = speed;

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

  if (ballX >= limitX ||
    ballX <= 0) {
    ballSpeedX = -ballSpeedX;
  }

  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
