import { Application } from "pixi.js";
import Game from "./Game";

(async () => {
  const appContainer = document.querySelector("#game-container");
  const app = new Application();
  const width = 600;
  const height = 600;
  await app.init({
    width: width,
    height: height,
    background: "white",
    resizeTo: appContainer,
  });
  appContainer.appendChild(app.canvas);
  const game = new Game(app, width, height);
  app.ticker.add((time) => game.update(time));

  document.addEventListener("keydown", (e) => game.onKeyDown(e.key));
})();
