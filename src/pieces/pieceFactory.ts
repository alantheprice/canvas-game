import { getFramerate, getFiringThreshold } from "../constants";
import { Renderer } from "../drawing/rendering";
import {
  Point,
  pointFunctions,
  rect,
  Rect,
  rectFunctions,
} from "../drawing/dimensions";
import { KEY_MAP, PressType, subscribe } from "../keyboardHandler";
import { isFunction, objectKeys } from "../utils";
import { FireConfiguration, PieceConfiguration, PieceMovement } from "./types";
import { explosion } from "./pieceExplosion.layout";
import { Direction } from "../drawing/direction.enum";
import { Position } from "../drawing/position.enum";

export function getPieceFactory(
  edges: Rect,
  renderer: Renderer,
  fire: (fireConfig: FireConfiguration) => void
) {
  return (config: PieceConfiguration, location: Point) => {
    const frame = config.layout.frame;
    let currentRect = pointFunctions(location).toRect(frame.w, frame.h);
    let currentHealth = config.health;
    let removeSubscription = null;
    if (config.movementType === PieceMovement.keyboard) {
      removeSubscription = subscribe(handleKeys);
    }
    let shouldFire = false;
    let firingDepressed = false;
    let firingThreshold = 0;
    const explosionFramesLimit = getFramerate() / 2;
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
      up: () => (location.y = Math.max(location.y - config.speed(), 0)),
      down: () =>
        (location.y = Math.min(location.y + config.speed(), pieceLimits.h)),
      left: () => (location.x = Math.max(location.x - config.speed(), 0)),
      right: () =>
        (location.x = Math.min(location.x + config.speed(), pieceLimits.w)),
    };

    if (config.movementType === PieceMovement.scrollDown) {
      currentMovements["down"] = movementDirections["down"];
    }

    // FUNCTIONS

    function renderShooting() {
      if (config.movementType === PieceMovement.scrollDown) {
        const randomize = Math.random();
        if (randomize > 0.995 && currentHealth > 0) {
          fireWeapons();
        }
      }
      if (firingDepressed) {
        if (shouldFire) {
          fireWeapons();
          shouldFire = false;
        } else {
          firingThreshold++;
        }
      }
      if (firingThreshold > getFiringThreshold()) {
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
          {
            layout: {
              layoutData: explosion(
                frame,
                explosionFrames,
                explosionFramesLimit
              ),
            },
          },
          location
        );
        explosionFrames++;
        return;
      }
      renderer(config, location, {
        showShadow: true,
        healthDisplay: {
          position:
            config.pointingDirection === Direction.DOWN
              ? Position.ABOVE
              : Position.BELOW,
          current: currentHealth,
          initial: config.health,
        },
      });
    }
 
    function fireWeapons() {
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

    function dispose() {
      if (isFunction(removeSubscription)) {
        removeSubscription();
      }
    }

    return {
      render: render,
      shouldRender: shouldRender,
      team: config.team,
      hit: hit,
      dispose: dispose,
    };
  };
}
