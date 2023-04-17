// загрузка DOM
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  const CELL_SIZE = 10; // размер одной ячейки игрового поля
  const FIELD_WIDTH = canvas.width / CELL_SIZE; // ширина игрового поля в ячейках
  const FIELD_HEIGHT = canvas.height / CELL_SIZE; // высота игрового поля в ячейках

  let snake = new Snake(FIELD_WIDTH / 2, FIELD_HEIGHT / 2); // создаем новую змею в центре поля
  let food = createRandomFood(); // создаем первую еду на игровом поле
  let score = 0; // начальный счет

  // запускаем игру
  setInterval(() => {
    // очистка игрового поля перед каждым кадром
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // рисуем змею
    ctx.fillStyle = "black";
    for (let i = 0; i < snake.body.length; i++) {
      ctx.fillRect(snake.body[i].x * CELL_SIZE, snake.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }

    // рисуем еду
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // двигаем змею
    snake.move();

    // проверяем столкновения
    if (snake.checkCollision() || checkOutOfBounds(snake.body[0], FIELD_WIDTH, FIELD_HEIGHT)) {
      alert(`Game Over! Score: ${score}`);
      location.reload();
    }

    // проверяем, съела ли змея еду
    if (snake.body[0].x === food.x && snake.body[0].y === food.y) {
      snake.body.push({ x: food.x, y: food.y });
      food = createRandomFood();
      score++;
    }

    // обновляем счетчик
    document.getElementById("score").innerHTML = `Score: ${score}`;
  }, 100);

  // обработка нажатий клавиш
  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "ArrowUp":
        snake.setDirection(DIRECTIONS.UP);
        break;
      case "ArrowDown":
        snake.setDirection(DIRECTIONS.DOWN);
        break;
      case "ArrowLeft":
        snake.setDirection(DIRECTIONS.LEFT);
        break;
      case "ArrowRight":
        snake.setDirection(DIRECTIONS.RIGHT);
        break;
    }
  });

  // создание случайного места для еды
  function createRandomFood() {
    let x = Math.floor(Math.random() * FIELD_WIDTH);
    let y = Math.floor(Math.random() * FIELD_HEIGHT);
    return { x: x, y: y };
  }

  // проверка, выходит ли змея за границы игрового поля
  function checkOutOfBounds(position, width, height) {
    return position.x < 0 || position.x >= width || position.y < 0 || position.y >= height;
  }
});
