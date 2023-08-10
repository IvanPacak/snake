let timeRef;

let dx = 10;
let dy = 0;

let foodX;
let foodY;

let score = 0;

let changingDirection = false;

const gameCanvas = {
    canvas: document.getElementById("canvas"),
    ctx: this.canvas.getContext("2d"),
    height: this.canvas.height,
    width: this.canvas.width
}

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200}
];

const clearCanvas = () => {
    gameCanvas.ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

const drawSnakePart = (snakePart) => {
    gameCanvas.ctx.fillStyle = '#A7C7E7';  
    gameCanvas.ctx.strokeStyle = '#404040';
    gameCanvas.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    gameCanvas.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

const drawFullSnake = () => {
    snake.forEach(drawSnakePart)
}

const moveSnake = () => {  
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  const eaten = snake[0].x === foodX && snake[0].y === foodY;
  if(eaten) {
    generateNewFood();
    score += 10;
  }
  else snake.pop();
}

const endGame = () => {
    for (let i = snake.length - 1; i > 0; i--) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x + 10 > gameCanvas.width;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y + 10 > gameCanvas.height;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
  }

const snakeMovement = (event) => {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
  
    if (changingDirection) return;
    changingDirection = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
      dx = -10;
      dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
      dx = 0;
      dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx = 10;
      dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
      dx = 0;
      dy = 10;
    }
}

const randomFood = (min, max) => {  
   return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
 
const generateNewFood = () => {  
   console.log(snake.length);
   foodX = randomFood(0, gameCanvas.width - 10);
   foodY = randomFood(0, gameCanvas.height - 10);
   snake.forEach(part => {
        const eaten = part.x == foodX && part.y == foodY;
        if (eaten) generateNewFood();
      });
}

const drawFood = () => {
    gameCanvas.ctx.fillStyle = '#CAEEC2';
    gameCanvas.ctx.strokeStyle = '#404040';
    gameCanvas.ctx.fillRect(foodX, foodY, 10, 10);
    gameCanvas.ctx.strokeRect(foodX, foodY, 10, 10);
}

const generteScore = () => {
    $('#score').text(score);
}

const startGame = () => {
  if (endGame()) {
    clearCanvas();
    score = 0;
    $('.glass-filter').fadeIn(500);
    return;
  }
  changingDirection = false;
  clearInterval(timeRef);
  timeRef = setTimeout(() => {
      clearCanvas();
      drawFullSnake();
      moveSnake();
      drawFood();
      generteScore();
      startGame();
  }, 100)
}

document.addEventListener("keydown", snakeMovement);

drawFullSnake();

$('.start-btn').on('click', () => {
  snake = [
    {x: 200, y: 200},
    {x: 190, y: 200}
  ];
  $('.glass-filter').fadeOut(500);
  startGame();
  generateNewFood();
});
