import { FRAMERATE } from "../constants";
import { Draw } from "../drawing/canvasDrawing";
import { point } from "../drawing/dimensions";
import { createRenderer } from "../drawing/rendering";
import { GameActions } from "../interfaces";
import { getPieceFactory } from "../pieces/pieceFactory";
import { FireConfiguration } from "../pieces/types";
import { getWing } from "../pieces/wing/wing";
import { getWeaponsTracker } from "../weapons/weapons";
import { getLevel1 } from "./levels/level1";

export function loadGame(draw: Draw, gameActions: GameActions) {
  let currentWaveDuration = 0;
  let weapons: FireConfiguration[] = [];
  const fire = (fireConfig: FireConfiguration) => {
    weapons.push(fireConfig);
  };
  const renderer = createRenderer(draw);
  const pieceFactory = getPieceFactory(draw.dimensions, renderer, fire);
  const weaponTracker = getWeaponsTracker(
    draw.dimensions,
    renderer,
    updateScore
  );
  let centerBottom = point(draw.dimensions.w / 2 - 25, draw.dimensions.h - 100);
  let user = pieceFactory(getWing(), centerBottom);
  let userScore = { team: user.team, hits: 0 };
  let level = getLevel1(pieceFactory, draw.dimensions);
  let currentWave = {
    index: 0,
    wave: level.waves[0],
  };
  let pieces = level.waves[0].pieces;

  function updateScore(team: string, score: number) {
    if (userScore.team === team) {
      userScore.hits += score;
      gameActions.setScore(userScore.hits * 10);
    }
  }

  function nextTick() {
    currentWaveDuration += 1 / FRAMERATE;
    if (currentWaveDuration > currentWave.wave.durationInSeconds) {
      currentWave = {
        index: currentWave.index + 1,
        wave: level.waves[currentWave.index + 1],
      };
      currentWaveDuration = 0;
      if (!currentWave.wave) {
        gameActions.won();
        return;
      }
      pieces = pieces.concat(currentWave.wave.pieces);
    }
    if (!user.shouldRender()) {
      gameActions.gameOver();
    }
    user.render();
    pieces = pieces.filter((x) => x.shouldRender());
    pieces.forEach((b) => b.render());
    // weapons
    weapons = weaponTracker(weapons, pieces.concat(user));
  }

  return {
    nextTick: nextTick,
  };
}
