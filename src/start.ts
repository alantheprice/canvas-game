import utils from "./utils";
import canvasDrawing, { Draw } from "./drawing/canvasDrawing";
import { point } from "./drawing/dimensions";
import { MILLISECONDS_BETWEEN_FRAMES } from "./constants";
import { createRenderer } from "./drawing/rendering";
import { FireConfiguration, Weapon } from "./pieces/types";
import { getWing } from "./pieces/wing/wing";
import { getPieceFactory } from "./pieces/pieceFactory";
import { getFighter } from "./pieces/fighter/fighter";
import { getWeaponsTracker } from "./weapons/weapons";
import { loadGame } from "./gameplay/game";
import { subscribe } from "./keyboardHandler";

export const start = () => {
  const canvas: HTMLCanvasElement = utils.$("#gameplay");
  const background: HTMLCanvasElement = utils.$("#background");
  const draw = canvasDrawing(canvas);
  const drawBackground = canvasDrawing(canvas);

  startLoop(draw);
};

function startLoop(draw: Draw) {
  let gameMessage: string | null = null;
  let game = loadGame(draw, gameOver, won);
  const startGame = () => {
    game = loadGame(draw, gameOver, won);
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

  subscribe((pressType, ev) => {
    if (ev.key === "Escape") {
      // restart game on escape
      startGame();
    }
  });

  // Setup for FPS readout
  let fps = 0;
  let currentSecond = Math.floor(Date.now() / 1000);
  let frames = 0;
  setInterval(
    () =>
      requestAnimationFrame(() => {
        // fps counter
        const itSec = Math.floor(Date.now() / 1000);
        if (currentSecond === itSec) {
          frames++;
        } else {
          fps = frames;
          currentSecond = itSec;
          frames = 0;
        }
        draw.clear();
        if (gameMessage) {
          draw.drawText(
            point(draw.dimensions.w / 2 - 140, draw.dimensions.h / 2),
            gameMessage,
            "55px Arial Bold"
          );
        }
        draw.drawText(point(20, 50), `FPS: ${fps}`, "20px Arial");
        if (game) {
          game.nextTick();
        }
      }),
    MILLISECONDS_BETWEEN_FRAMES
  );
}
