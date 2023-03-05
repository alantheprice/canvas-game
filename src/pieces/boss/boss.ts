import { point, rect } from "../../drawing/dimensions";
import { LASER } from "../../weapons/laser";
import { PieceConfiguration, PieceMovement } from "../types";
import { Direction } from "../../drawing/direction.enum";
import { bossHeight, bossLayout, bossWidth } from "./boss.layout";
import { getMovementFrameDistance } from "../../constants";
import preRender from "../../drawing/preRender";
import { MISSLE } from "../../weapons/missle";

const layout = {
  frame: rect(0, 0, bossWidth, bossHeight),
  layoutData: bossLayout,
};

export function getBoss(
  overrides?: Partial<PieceConfiguration>
): PieceConfiguration {
  return {
    team: "red",
    layout: layout,  
    preRendered: {
      [Direction.DOWN]: preRender(layout, Direction.DOWN),
      [Direction.UP]: preRender(layout, Direction.UP),
    },
    speed: () => getMovementFrameDistance() / 9,
    weapons: [
      {
        weapon: LASER,
        locations: [
          point(7, 3),
          point(bossWidth - 7, 0),
          point(bossWidth / 2, 0),
        ],
      },
      {
        weapon: MISSLE,
        locations: [point(bossWidth/2 - 10, 0)],
      },
      {
        weapon: MISSLE,
        locations: [point(bossWidth/2 + 10, 0)],
      },
    ],
    health: 120,
    shootingPattern: "ai",
    movementType: PieceMovement.scrollDown,
    pointingDirection: Direction.DOWN,
    stayWithinFrame: false,
    ...(overrides || {}),
  };
}
