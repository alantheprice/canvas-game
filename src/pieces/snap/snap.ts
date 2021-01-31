import { point, rect } from "../../drawing/dimensions";
import { LASER } from "../../weapons/laser";
import { PieceConfiguration, PieceMovement } from "../types";
import { Direction } from "../../drawing/direction.enum";
import { snapHeight, snapLayout, snapWidth } from "./snap.layout";
import { getMovementFrameDistance } from "../../constants";
import preRender from "../../drawing/preRender";

const layout = {
  frame: rect(0, 0, snapWidth, snapHeight),
  layoutData: snapLayout,
};
let preRendered: HTMLImageElement = preRender(layout);

export function getSnap(
  overrides?: Partial<PieceConfiguration>
): PieceConfiguration {
  return {
    team: "red",
    layout: layout,
    preRendered: preRendered,
    speed: () => getMovementFrameDistance() / 4,
    weapons: [
      {
        weapon: LASER,
        locations: [point(snapWidth / 2, 20)],
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
