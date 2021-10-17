import { getFramerate } from "../constants";
import { Draw } from "../drawing/canvasDrawing";
import { point, rect } from "../drawing/dimensions";
import { createRenderer } from "../drawing/rendering";
import { getEnvironment } from "../environment/riverEnvironment";
import { GameActions } from "../interfaces";
import { getPieceFactory } from "../pieces/pieceFactory";
import { FireConfiguration } from "../pieces/types";
import { getWing } from "../pieces/wing/wing";
import { getWeaponsTracker } from "../weapons/weapons";
import { getLevel1 } from "./levels/level1";
import { getLevel2 } from "./levels/level2";

export function loadGame(
  draw: Draw,
  backgroundDraw: Draw,
  gameActions: GameActions
) {
  let currentWaveDuration = 0;
  let weapons: FireConfiguration[] = [];
  const fire = (fireConfig: FireConfiguration) => {
    weapons.push(fireConfig);
  };
  const renderer = createRenderer(draw);
  const backgroundRenderer = createRenderer(backgroundDraw);
  const pieceFactory = getPieceFactory(draw.dimensions, renderer, fire);
  const weaponTracker = getWeaponsTracker(
    draw.dimensions,
    renderer,
    updateScore
  );
  let centerBottom = point(draw.dimensions.w / 2 - 25, draw.dimensions.h - 100);
  let user = pieceFactory(getWing(), centerBottom);
  let userScore = { team: user.team, hits: 0 };
  const levels = [
    getLevel1(pieceFactory, draw.dimensions),
    getLevel1(pieceFactory, draw.dimensions),
    getLevel1(pieceFactory, draw.dimensions),
  ];
  let environment = getEnvironment(backgroundDraw, backgroundRenderer);
  let levelIndex = -1;
  let level = null;
  let currentWave = null;
  let pieces = [];
  nextLevel();

  function nextLevel() {
    environment.nextTick();
    levelIndex++;
    level = levels[levelIndex];
    if (level) {
      // levels should be communicated without zero based index.
      gameActions.setMessage(`Level ${levelIndex + 1}`, 2);
      currentWave = {
        index: 0,
        wave: level.waves[0],
      };
      pieces = pieces.concat(currentWave.wave.pieces);
    } else {
      gameActions.won();
    }
  }

  function updateScore(team: string, score: number) {
    if (userScore.team === team) {
      userScore.hits += score;
      gameActions.setScore(userScore.hits * 5);
    }
  }

  function nextTick() {
    currentWaveDuration += 1 / getFramerate();
    if (currentWaveDuration > currentWave.wave.durationInSeconds) {
      currentWave = {
        index: currentWave.index + 1,
        wave: level.waves[currentWave.index + 1],
      };
      currentWaveDuration = 0;
      if (!currentWave.wave) {
        nextLevel();
        return;
      }
      pieces = pieces.concat(currentWave.wave.pieces);
    }
    if (!user.shouldRender()) {
      gameActions.gameOver();
    }
    draw.clear();
    user.render();
    pieces = pieces.filter((x) => x.shouldRender());
    pieces.forEach((b) => b.render());
    // weapons
    weapons = weaponTracker(weapons, pieces.concat(user));
  }

  function dispose() {
    user.dispose();
    pieces = [];
  }

  return {
    nextTick: nextTick,
    dispose: dispose,
  };
}
