import { point, rect } from "../../drawing/dimensions";
import { LASER } from "../../weapons/laser";
import { PieceConfiguration, PieceMovement } from "../types";
import { Direction } from "../../drawing/direction.enum";
import { fighterHeight, fighterLayout, fighterWidth } from "./fighter.layout";
import { MOVEMENT_FRAME_DISTANCE } from "../../constants";

export function getFighter(
  overrides?: Partial<PieceConfiguration>
): PieceConfiguration {
  return {
    team: "red",
    layout: {
      frame: rect(0, 0, fighterWidth, fighterHeight),
      layoutData: fighterLayout,
    },
    speed: MOVEMENT_FRAME_DISTANCE / 4,
    weapons: [
      {
        weapon: LASER,
        locations: [point(7, 0), point(fighterWidth - 7, 0)],
      },
    ],
    health: 2,
    shootingPattern: "ai",
    movementType: PieceMovement.scrollDown,
    pointingDirection: Direction.DOWN,
    stayWithinFrame: false,
    ...(overrides || {}),
  };
}
