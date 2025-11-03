const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20; // tamanho de cada bloco
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box }; // posição inicial
let direction = "RIGHT";
let score = 0;

// gera a primeira comida
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};

// controla direção
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// função principal
function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // desenha a cobra
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff7f" : "#00cc66";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // desenha a comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // posição inicial da cabeça
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // direção
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // se a cobra come a comida
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById("score").innerText = `Pontos: ${score}`;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    // remove o último quadrado (movimento)
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  // colisão com o corpo ou bordas
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    ctx.fillStyle = "#ff5555";
    ctx.font = "30px Arial";
    ctx.fillText("💀 Fim de jogo!", 100, 200);
    return;
  }

  snake.unshift(newHead);
}

// verifica colisão
function collision(head, array) {
  return array.some((segment) => segment.x === head.x && segment.y === head.y);
}

const game = setInterval(draw, 100);
