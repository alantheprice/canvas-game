import { point, rect } from "../../drawing/dimensions";
import { LASER } from "../../weapons/laser";
import { PieceConfiguration, PieceMovement } from "../types";
import { Direction } from "../../drawing/direction.enum";
import { wingHeight, wingLayout, wingWidth } from "./wing.layout";
import { getMovementFrameDistance } from "../../constants";
import preRender from "../../drawing/preRender";
import { MISSLE } from "../../weapons/missle";

const layout = {
  frame: rect(0, 0, wingWidth, wingHeight),
  layoutData: wingLayout,
};

let preRendered: HTMLImageElement = preRender(layout);

export function getWing(
  overrides?: Partial<PieceConfiguration>
): PieceConfiguration {
  return {
    team: "blue",
    layout,
    preRendered: preRendered,
    speed: getMovementFrameDistance,
    weapons: [
      {
        weapon: LASER,
        locations: [point(7, 0), point(wingWidth - 7, 0)],
      },
      {
        weapon: MISSLE,
        locations: [point(9, 0), point(wingWidth - 9, 0)],
      },
    ],
    shootingPattern: "manual",
    health: 10,
    movementType: PieceMovement.keyboard,
    pointingDirection: Direction.UP,
    stayWithinFrame: true,
    ...(overrides || {}),
  };
}
