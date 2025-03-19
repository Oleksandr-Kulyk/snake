import Snake from "./Snake";

export default class Game {
  #maxX;
  #maxY;
  #app;
  #snake;
  constructor(app, maxX, maxY) {
    this.#app = app;
    this.#maxX = maxX;
    this.#maxY = maxY;
    const snake = new Snake(10);
    snake.position.set(10, 10);
    this.#snake = snake;
    this.#app.stage.addChild(this.#snake);
  }
  update(time) {
    this.#app.stage.children.forEach((child) => {
      if (child.update) child.update(time);
    });
    this.#snake.blocks.forEach((block) => {
      if (block.x > this.#maxX) block.x = 0;
      if (block.x < 0) block.x = this.#maxX;
      if (block.y > this.#maxY) block.y = 0;
      if (block.y < 0) block.y = this.#maxY;
    });
  }
  onKeyDown(key) {
    this.#snake.head.direction = "down";
    this.#snake.createBreakpoint(key);
  }
}
