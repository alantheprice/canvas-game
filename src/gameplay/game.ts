import { FRAMERATE } from "../constants";
import { Draw } from "../drawing/canvasDrawing";
import { createRenderer } from "../drawing/rendering";
import { getPieceFactory } from "../pieces/pieceFactory";
import { FireConfiguration } from "../pieces/types";
import { getWeaponsTracker } from "../weapons/weapons";
import { getLevel1 } from "./levels/level1";

export function loadGame(draw: Draw) {
  let currentWaveDuration = 0;
  let weapons: FireConfiguration[] = [];
  const fire = (fireConfig: FireConfiguration) => {
    weapons.push(fireConfig);
  };
  const renderer = createRenderer(draw);
  const pieceFactory = getPieceFactory(draw.dimensions, renderer, fire);
  const weaponTracker = getWeaponsTracker(draw.dimensions, renderer);

  let level = getLevel1(pieceFactory, draw.dimensions);
  let currentWave = {
    index: 0,
    wave: level.waves[0],
  };
  let pieces = level.waves[0].pieces;

  function nextTick() {
    currentWaveDuration += 1 / FRAMERATE;
    if (currentWaveDuration > currentWave.wave.durationInSeconds) {
      currentWave = {
        index: currentWave.index + 1,
        wave: level.waves[currentWave.index + 1],
      };
      currentWaveDuration = 0;
      pieces = pieces.concat(currentWave.wave.pieces);
    }
    pieces = pieces.filter((x) => x.shouldRender());
    pieces.forEach((b) => b.render());
    // weapons
    weapons = weaponTracker(weapons, pieces);
  }

  return {
    nextTick: nextTick,
  };
}
