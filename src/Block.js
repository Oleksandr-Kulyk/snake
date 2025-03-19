import { Graphics, Container } from "pixi.js";

export default class Block extends Container {
  #size;
  #direction = "right";
  constructor(size) {
    super();
    const block = new Graphics()
      .rect(0, 0, size, size)
      .stroke({ width: 1, color: "green" })
      .fill("green");
    this.addChild(block);
  }
  move(speed) {
    if (this.#direction === "left") this.x -= speed;
    if (this.#direction === "right") this.x += speed;
    if (this.#direction === "down") this.y += speed;
    if (this.#direction === "up") this.y -= speed;
  }
  set direction(direction) {
    this.#direction = direction;
  }
  changeDirection(breakpoints) {
    breakpoints.forEach((breakpoint) => {
      if (breakpoint.x === this.x && breakpoint.y === this.y)
        this.direction = breakpoint.direction;
    });
    return;
  }
}
