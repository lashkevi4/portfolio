// определение направлений змейки
const DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

class Snake {
  constructor(startX, startY) {
    this.body = [
      { x: startX, y: startY }, // голова змеи
      { x: startX - 1, y: startY }, // тело змеи
      { x: startX - 2, y: startY }, // тело змеи
    ];
    this.direction = DIRECTIONS.RIGHT; // начальное направление змеи
  }

  move() {
    // создаем новую голову змеи в зависимости от направления движения
    let newHead;
    switch (this.direction) {
      case DIRECTIONS.UP:
        newHead = { x: this.body[0].x, y: this.body[0].y - 1 };
        break;
      case DIRECTIONS.DOWN:
        newHead = { x: this.body[0].x, y: this.body[0].y + 1 };
        break;
      case DIRECTIONS.LEFT:
        newHead = { x: this.body[0].x - 1, y: this.body[0].y };
        break;
      case DIRECTIONS.RIGHT:
        newHead = { x: this.body[0].x + 1, y: this.body[0].y };
        break;
    }

    // добавляем новую голову в начало массива
    this.body.unshift(newHead);

    // удаляем последний элемент массива, чтобы змея не росла бесконечно
    this.body.pop();
  }

  setDirection(newDirection) {
    // изменяем направление змеи только если оно не противоположно текущему направлению
    switch (newDirection) {
      case DIRECTIONS.UP:
        if (this.direction !== DIRECTIONS.DOWN) {
          this.direction = newDirection;
        }
        break;
      case DIRECTIONS.DOWN:
        if (this.direction !== DIRECTIONS.UP) {
          this.direction = newDirection;
        }
        break;
      case DIRECTIONS.LEFT:
        if (this.direction !== DIRECTIONS.RIGHT) {
          this.direction = newDirection;
        }
        break;
      case DIRECTIONS.RIGHT:
        if (this.direction !== DIRECTIONS.LEFT) {
          this.direction = newDirection;
        }
        break;
    }
  }

  // проверка, пересекается ли змея с самой собой
  checkCollision() {
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) {
        return true;
      }
    }
    return false;
  }
}
