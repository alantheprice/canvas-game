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

export const start = () => {
  const canvas: HTMLCanvasElement = utils.$("#myCanvas");
  const draw = canvasDrawing(canvas);
  startLoop(draw);
};

function startLoop(draw: Draw) {
  const game = loadGame(draw);
  // let weapons: FireConfiguration[] = [];
  // const fire = (fireConfig: FireConfiguration) => {
  //   weapons.push(fireConfig);
  // };
  // const renderer = createRenderer(draw);
  // const pieceFactory = getPieceFactory(draw.dimensions, renderer, fire);
  // const weaponTracker = getWeaponsTracker(draw.dimensions, renderer);

  // // Starting game piece location (bottom, center of screen)
  // let centerBottom = point(draw.dimensions.w / 2 - 25, draw.dimensions.h - 100);
  // let pieces = [pieceFactory(getWing(), centerBottom)];
  // pieces.push(pieceFactory(getFighter(), { x: 400, y: 10 }));
  // pieces.push(pieceFactory(getFighter(), { x: 300, y: 10 }));

  // Setup for FPS readout
  let fps = 0;
  let currentSecond = Math.floor(Date.now() / 1000);
  let frames = 0;
  setInterval(() => {
    draw.clear();
    // fps counter
    const itSec = Math.floor(Date.now() / 1000);
    if (currentSecond === itSec) {
      frames++;
    } else {
      fps = frames;
      currentSecond = itSec;
      frames = 0;
    }
    draw.drawText(point(20, 50), `FPS: ${fps}`, "20px Arial");
    game.nextTick();
    // pieces = pieces.filter((x) => x.shouldRender());
    // pieces.forEach((b) => b.render());
    // // weapons
    // weapons = weaponTracker(weapons, pieces);
  }, MILLISECONDS_BETWEEN_FRAMES);
}
