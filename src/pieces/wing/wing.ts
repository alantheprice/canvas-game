import { point, rect } from "../../drawing/dimensions";
import { LASER } from "../../weapons/laser";
import { PieceConfiguration, PieceMovement } from "../types";
import { Direction } from "../../drawing/direction.enum";
import { wingHeight, wingLayout, wingWidth } from "./wing.layout";
import { MOVEMENT_FRAME_DISTANCE } from "../../constants";

export function getWing(
  overrides?: Partial<PieceConfiguration>
): PieceConfiguration {
  return {
    team: "blue",
    layout: {
      frame: rect(0, 0, wingWidth, wingHeight),
      layoutData: wingLayout,
    },
    speed: MOVEMENT_FRAME_DISTANCE,
    weapons: [
      {
        weapon: LASER,
        locations: [point(7, 0), point(wingWidth - 7, 0)],
      },
    ],
    shootingPattern: "manual",
    health: 5,
    movementType: PieceMovement.keyboard,
    pointingDirection: Direction.UP,
    stayWithinFrame: true,
    ...(overrides || {}),
  };
}
