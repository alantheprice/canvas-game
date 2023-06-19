import { point, rect } from "../../drawing/dimensions";
import { LASER } from "../../weapons/laser";
import { PieceConfiguration, PieceMovement } from "../types";
import { Direction } from "../../drawing/direction.enum";
import { wingHeight, wingLayout, wingWidth } from "./wing.layout";
import { getMovementFrameDistance } from "../../constants";
import preRender from "../../drawing/preRender";
import { MISSILE } from "../../weapons/missile";

const layout = {
  frame: rect(0, 0, wingWidth, wingHeight),
  layoutData: wingLayout,
};

export function getWing(
  overrides?: Partial<PieceConfiguration>
): PieceConfiguration {
  return {
    team: "blue",
    layout,
    preRendered: {
      [Direction.DOWN]: preRender(layout, Direction.DOWN),
      [Direction.UP]: preRender(layout, Direction.UP),
    },
    speed: getMovementFrameDistance,
    weapons: [
      {
        weapon: LASER,
        locations: [point(7, 0), point(wingWidth - 7, 0)],
      },
      {
        weapon: MISSILE,
        locations: [point(wingWidth/2, 0)],
      },
    ],
    shootingPattern: "manual",
    health: 15,
    movementType: PieceMovement.keyboard,     
    pointingDirection: Direction.UP,
    stayWithinFrame: true,
    ...(overrides || {}),
  };
}
 