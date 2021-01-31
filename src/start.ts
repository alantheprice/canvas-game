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
  startLoop(draw, drawBackground);
};

function startLoop(draw: Draw, drawBackground: Draw) {
  const gameFunctions = { gameOver, won, setScore, setMessage };
  let gameMessage: string | null = null;
  let pauseDuration: number = 0;
  let game = loadGame(draw, drawBackground, gameFunctions);

  const startGame = () => {
    game = loadGame(draw, drawBackground, gameFunctions);
    gameMessage = null;
  };

  const disposeGame = () => {
    if (!game) {
      return;
    }
    game.dispose();
    game = null;
  };

  function gameOver() {
    gameMessage = "Game Over";
    disposeGame();
    setTimeout(startGame, 10000);
  }
  function won() {
    gameMessage = "You WIN!!!!";
    disposeGame();
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

  let lastUpdated = Date.now();
  const logFPS = (fps: number) => {
    adjustFramerateForActual(fps);
    if (Date.now() - 3000 > lastUpdated) {
      lastUpdated = Date.now();
      $(".game-fps").innerText = `fps: ${fps}`;
    }
  };

  let lastTimestamp = Date.now();
  let perf = [];
  // Game Loop.
  const nextTick = (timestamp: number) => {
    const diff = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    const fps = 1000 / diff;
    logFPS(Math.floor(fps));

    if (gameMessage) {
      draw.clear();
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
    const start = performance.now();
    game.nextTick();
    // checking for perf stuff
    const end = performance.now();
    perf.push(end - start);
    if (perf.length > 1000) {
      console.log(
        "aveTickDuration",
        perf.reduce((avg, next, index, arr) => {
          return avg + next / arr.length;
        }, 0)
      );
      perf = [];
    }
  };
  requestAnimationFrame(nextTick);
}
