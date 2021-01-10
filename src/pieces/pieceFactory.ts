import { FRAMES_PER_FIRING } from "../constants";
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

export function getPieceFactory(
  edges: Rect,
  renderer: Renderer,
  fire: (fireConfig: FireConfiguration) => void
) {
  return (config: PieceConfiguration, location: Point) => {
    const frame = config.layout.frame;
    let currentRect = pointFunctions(location).toRect(frame.w, frame.h);
    let damage = config.health;
    if (config.movementType === PieceMovement.keyboard) {
      subscribe(handleKeys);
    }
    let shouldFire = false;
    let firingDepressed = false;
    let firingThreshold = 0;

    const currentMovements = {};
    let pieceLimits = rect(0, 0, edges.w - frame.w, edges.h - frame.h);
    if (!config.stayWithinFrame) {
      pieceLimits = rect(-100, -100, edges.w + 200, edges.h + 200);
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
        if (randomize > 0.995) {
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
      /// Renderer should also take in number of hit points, vs total and add red or green dots for life left...
      renderer(config.layout.layoutData, location);
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
      return damage > 0 && rectFunctions(edges).inFrame(currentRect);
    }

    function hit(point: Point, team: string) {
      if (team === config.team) {
        // can't shoot your own team for now
        return false;
      }
      if (rectFunctions(currentRect).inFrame(point)) {
        console.log("hit!!!");
        damage = damage - 1;
        return true;
      }
      return false;
    }

    return {
      render: render,
      shouldRender: shouldRender,
      hit: hit,
    };
  };
}
