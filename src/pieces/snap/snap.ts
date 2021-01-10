import { point, rect } from "../../drawing/dimensions";
import { LASER } from "../../weapons/laser";
import { PieceConfiguration, PieceMovement } from "../types";
import { Direction } from "../../drawing/direction.enum";
import { snapHeight, snapLayout, snapWidth } from "./snap.layout";
import { MOVEMENT_FRAME_DISTANCE } from "../../constants";

export function getSnap(
  overrides?: Partial<PieceConfiguration>
): PieceConfiguration {
  return {
    team: "red",
    layout: {
      frame: rect(0, 0, snapWidth, snapHeight),
      layoutData: snapLayout,
    },
    speed: MOVEMENT_FRAME_DISTANCE / 4,
    weapons: [
      {
        weapon: LASER,
        locations: [point(snapWidth / 2, 0)],
      },
    ],
    health: 1,
    shootingPattern: "ai",
    movementType: PieceMovement.scrollDown,
    pointingDirection: Direction.DOWN,
    stayWithinFrame: false,
    ...(overrides || {}),
  };
}
