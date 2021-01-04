import utils from "./utils";
import canvasDrawing, { Draw } from "./drawing/canvasDrawing";
import { Point, point } from "./drawing/dimensions";
import primary from "./pieces/primary";
import {
  distancePerFrame,
  MILLISECONDS_BETWEEN_FRAMES,
  WEAPON_FRAME_DISTANCE,
} from "./constants";
import { createRenderer } from "./drawing/rendering";
import { Weapon } from "./gameplay/weapons";
import badGuy from "./pieces/badGuy";

export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export const start = () => {
  const canvas: HTMLCanvasElement = utils.$("#myCanvas");
  const draw = canvasDrawing(canvas);
  game(draw);
};

function game(draw: Draw) {
  let weapons: { weapon: Weapon; location: Point; direction: Direction }[] = [];

  const fire = (weapon: Weapon, location: Point, direction?: Direction) => {
    weapons.push({
      weapon,
      location,
      direction,
    });
  };
  const renderer = createRenderer(draw);
  // Starting game piece location (center of screen)
  let location = point(draw.dimensions.w / 2 - 25, draw.dimensions.h - 100);
  const primaryPiece = primary(draw, renderer, location, fire);
  const badies = [
    badGuy(draw, renderer, { x: 0, y: 10 }, fire),
    badGuy(draw, renderer, { x: 100, y: 10 }, fire),
    badGuy(draw, renderer, { x: 200, y: 10 }, fire),
    badGuy(draw, renderer, { x: 300, y: 10 }, fire),
    badGuy(draw, renderer, { x: 400, y: 10 }, fire),
    badGuy(draw, renderer, { x: 500, y: 10 }, fire),
    badGuy(draw, renderer, { x: 50, y: 60 }, fire),
    badGuy(draw, renderer, { x: 150, y: 60 }, fire),
    badGuy(draw, renderer, { x: 250, y: 60 }, fire),
    badGuy(draw, renderer, { x: 350, y: 60 }, fire),
    badGuy(draw, renderer, { x: 450, y: 60 }, fire),
  ];

  // Setup for FPS readout
  let fps = 0;
  let currentSecond = Math.floor(Date.now() / 1000);
  let frames = 0;
  setInterval(() => {
    // fps counter
    const itSec = Math.floor(Date.now() / 1000);
    if (currentSecond === itSec) {
      frames++;
    } else {
      fps = frames;
      currentSecond = itSec;
      frames = 0;
    }
    // weapons
    // This figuring out location should be done elsewhere, maybe in a factory function?
    weapons = weapons.map((w) => {
      return {
        ...w,
        location: {
          x: w.location.x,
          y:
            w.direction === Direction.DOWN
              ? w.location.y + distancePerFrame(w.weapon.speed)
              : w.location.y - distancePerFrame(w.weapon.speed),
        },
      };
    });
    weapons = weapons.filter((w) => draw.inFrame(w.location));
    draw.clear();
    weapons.forEach((w) => renderer(w.weapon.layout, w.location));
    draw.drawText(point(20, 50), `FPS: ${fps}`, "20px Arial");
    primaryPiece.render();
    badies.forEach((b) => b.render());
  }, MILLISECONDS_BETWEEN_FRAMES);
}
