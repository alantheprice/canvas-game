import utils from "./utils";
import canvasDrawing, { Draw } from "./drawing/canvasDrawing";
import { point, rect } from "./drawing/dimensions";
import { adjustFramerateForActual, getFramerate } from "./constants";
import { loadGame } from "./gameplay/game";
import { subscribe } from "./keyboardHandler";
const $ = utils.$;

export const start = () => {
  const canvas: HTMLCanvasElement = utils.$("#gameplay");
  const background: HTMLCanvasElement = utils.$("#background");
  const draw = canvasDrawing(canvas);
  const drawBackground = canvasDrawing(background);

  // Grass
  drawBackground.fill("#81bc5c");
  // river look, but lame-ish
  drawBackground.drawRect(
    rect(
      drawBackground.dimensions.w / 2 - 100,
      0,
      200,
      drawBackground.dimensions.h
    ),
    "#4d9bba"
  );
  // overlay fill to shift colors
  drawBackground.fill("rgba(200,200,200, 0.5");
  startLoop(draw);
};

function startLoop(draw: Draw) {
  const gameFunctions = { gameOver, won, setScore, setMessage };
  let gameMessage: string | null = null;
  let pauseDuration: number = 0;
  let game = loadGame(draw, gameFunctions);
  const startGame = () => {
    game = loadGame(draw, gameFunctions);
    gameMessage = null;
  };

  function gameOver() {
    gameMessage = "Game Over";
    game = null;
    setTimeout(startGame, 10000);
  }
  function won() {
    gameMessage = "You WIN!!!!";
    game = null;
    setTimeout(startGame, 10000);
  }
  function setScore(score: number) {
    $(".game-score").innerText = `Score: ${score}`;
  }
  function setMessage(message: string, durationSeconds: number) {
    gameMessage = message;
    pauseDuration = durationSeconds * getFramerate();
    console.log("pause duration: ", pauseDuration);
  }

  subscribe((pressType, ev) => {
    if (ev.key === "Escape") {
      // restart game on escape
      startGame();
    }
  });

  const frames = [];
  let fpsCount = 0;
  const logFPS = (fps: number) => {
    adjustFramerateForActual(fps);

    frames.push(fps);
    const fpsDisplay = Math.floor(
      frames.reduce((sum, next) => sum + next, 0) / frames.length
    );
    if (frames.length > 20) {
      frames.splice(0, 1);
    }
    if (fpsCount !== fpsDisplay) {
      $(".game-fps").innerText = `fps: ${fpsDisplay}`;
      fpsCount = fpsDisplay;
    }
  };

  let lastTimestamp = Date.now();

  const nextTick = (timestamp: number) => {
    const diff = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    const fps = 1000 / diff;
    logFPS(Math.floor(fps));

    draw.clear();
    if (gameMessage) {
      draw.drawText(
        point(draw.dimensions.w / 2 - 140, draw.dimensions.h / 2),
        gameMessage,
        "55px Arial Bold"
      );
    }
    requestAnimationFrame(nextTick);
    if (!game) {
      return;
    }
    if (pauseDuration > 0) {
      pauseDuration--;
      if (pauseDuration === 0) {
        gameMessage = null;
      }
      return;
    }
    game.nextTick();
  };
  requestAnimationFrame(nextTick);
}
