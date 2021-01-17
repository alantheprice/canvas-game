import { FRAMERATE, FRAMES_PER_FIRING } from "../constants";
import { Renderer } from "../drawing/rendering";
import {
  Point,
  pointFunctions,
  rect,
  Rect,
  rectFunctions,
} from "../drawing/dimensions";
import { KEY_MAP, PressType, subscribe } from "../keyboardHandler";
import { objectKeys } from "../utils";
import { FireConfiguration, PieceConfiguration, PieceMovement } from "./types";
import { explosion } from "./pieceExplosion.layout";
import { Template } from "webpack";

export function getPieceFactory(
  edges: Rect,
  renderer: Renderer,
  fire: (fireConfig: FireConfiguration) => void
) {
  return (config: PieceConfiguration, location: Point) => {
    const frame = config.layout.frame;
    let currentRect = pointFunctions(location).toRect(frame.w, frame.h);
    let currentHealth = config.health;
    if (config.movementType === PieceMovement.keyboard) {
      subscribe(handleKeys);
    }
    let shouldFire = false;
    let firingDepressed = false;
    let firingThreshold = 0;
    const explosionFramesLimit = FRAMERATE / 2;
    let explosionFrames = 0;

    const currentMovements = {};
    let pieceLimits = rect(0, 0, edges.w - frame.w, edges.h - frame.h);
    let renderLimits = rect(
      -(frame.w + 1),
      -(frame.h + 1),
      edges.w + frame.w * 2,
      edges.h + frame.h * 2
    );
    if (!config.stayWithinFrame) {
      pieceLimits = rect(
        -(frame.w * 2),
        -(frame.h * 2),
        edges.w + frame.w * 4,
        edges.h + frame.h * 4
      );
    }
    const movementDirections = {
      up: () => (location.y = Math.max(location.y - config.speed, 0)),
      down: () =>
        (location.y = Math.min(location.y + config.speed, pieceLimits.h)),
      left: () => (location.x = Math.max(location.x - config.speed, 0)),
      right: () =>
        (location.x = Math.min(location.x + config.speed, pieceLimits.w)),
    };

    if (config.movementType === PieceMovement.scrollDown) {
      currentMovements["down"] = movementDirections["down"];
    }

    // FUNCTIONS

    function renderShooting() {
      if (config.movementType === PieceMovement.scrollDown) {
        const randomize = Math.random();
        if (randomize > 0.995 && currentHealth > 0) {
          fireLasers();
        }
      }
      if (firingDepressed) {
        if (shouldFire) {
          fireLasers();
          shouldFire = false;
        } else {
          firingThreshold++;
        }
      }
      if (firingThreshold > FRAMES_PER_FIRING) {
        shouldFire = true;
        firingThreshold = 0;
      }
    }

    function render() {
      renderShooting();
      // render movements
      objectKeys(currentMovements).values.forEach((x) => x());
      currentRect = pointFunctions(location).toRect(frame.w, frame.h);
      if (currentHealth <= 0) {
        renderer(
          explosion(frame, explosionFrames, explosionFramesLimit),
          location
        );
        explosionFrames++;
        return;
      }

      // Renderer should also take in number of hit points,
      // vs total and add red or green dots for life left...
      renderer(config.layout.layoutData, location, true);
    }

    function fireLasers() {
      config.weapons.forEach((w) => {
        w.locations.forEach((l) => {
          fire({
            weapon: w.weapon,
            location: pointFunctions(l).translate(location),
            direction: config.pointingDirection,
            team: config.team,
          });
        });
      });
    }

    function handleKeys(type: PressType, ev: KeyboardEvent): void {
      if (type === "keypress") {
        return;
      }
      const mapping = KEY_MAP[ev.key];
      if (!mapping) {
        return;
      }
      if (mapping === "fire") {
        handleFire(type);
      } else {
        handleMovement(type, mapping);
      }
    }

    function handleFire(type: PressType) {
      const firePressed = type === "keydown";
      if (firePressed === firingDepressed) {
        // the keydown command continues to be thrown when the key is held down, this is to deal with that.
        return;
      }
      shouldFire = firePressed;
      firingDepressed = firePressed;
      firingThreshold = 0;
    }

    function handleMovement(type: PressType, direction: string) {
      const movement = movementDirections[direction];
      if (type === "keydown") {
        currentMovements[direction] = movement;
      }
      if (type === "keyup") {
        delete currentMovements[direction];
      }
    }

    function shouldRender() {
      if (currentRect.y < 0) {
        const inFrame = rectFunctions(renderLimits).inFrame(currentRect);
      }

      return (
        currentHealth >= 0 &&
        explosionFrames < explosionFramesLimit &&
        rectFunctions(renderLimits).inFrame(currentRect)
      );
    }

    function hit(point: Point, team: string) {
      if (team === config.team || currentHealth <= 0) {
        // can't shoot your own team for now
        return false;
      }
      if (rectFunctions(currentRect).inFrame(point)) {
        currentHealth = currentHealth - 1;
        return true;
      }
      return false;
    }

    return {
      render: render,
      shouldRender: shouldRender,
      team: config.team,
      hit: hit,
    };
  };
}
