import { Container } from "pixi.js";
import Block from "./Block";

export default class Snake extends Container {
  #speed = 1;
  #blockSize;
  #blocks = [];
  #breakPoints = [];
  constructor(blockSize) {
    super();
    this.#blockSize = blockSize;
    for (let i = 0; i <= 3; i++) {
      const block = new Block(this.#blockSize);
      block.position.set(i * this.#blockSize, 0);
      this.#blocks.push(block);
    }
    this.#blocks.forEach((block) => this.addChild(block));
  }
  update() {
    this.#blocks.forEach((block) => block.move(this.#speed));
    this.#blocks.forEach((block) => block.changeDirection(this.#breakPoints));
    this.removeBreakpoint();
  }
  get head() {
    return this.#blocks[this.#blocks.length - 1];
  }
  get tail() {
    return this.#blocks[0];
  }
  get blocks() {
    return this.#blocks;
  }
  createBreakpoint(key) {
    const breakPoint = {
      x: this.head.x,
      y: this.head.y,
    };
    switch (key) {
      case "ArrowLeft":
        breakPoint.direction = "left";
        break;
      case "ArrowRight":
        breakPoint.direction = "right";
        break;
      case "ArrowDown":
        breakPoint.direction = "down";
        break;
      case "ArrowUp":
        breakPoint.direction = "up";
        break;
    }
    this.#breakPoints.push(breakPoint);
    this.head.direction = breakPoint.direction;
  }
  removeBreakpoint() {
    this.#breakPoints = this.#breakPoints.filter(
      (breakPoint) =>
        !(breakPoint.x == this.tail.x && breakPoint.y === this.tail.y)
    );
  }
}
