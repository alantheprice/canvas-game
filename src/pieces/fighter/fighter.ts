import { point, rect } from "../../drawing/dimensions";
import { LASER } from "../../weapons/laser";
import { PieceConfiguration, PieceMovement } from "../types";
import { Direction } from "../../drawing/direction.enum";
import { fighterHeight, fighterLayout, fighterWidth } from "./fighter.layout";
import { getMovementFrameDistance } from "../../constants";
import preRender from "../../drawing/preRender";

const layout = {
  frame: rect(0, 0, fighterWidth, fighterHeight),
  layoutData: fighterLayout,
};
let preRendered: HTMLImageElement = preRender(layout);

export function getFighter(
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
        locations: [point(7, 0), point(fighterWidth - 7, 0)],
      },
    ],
    health: 4,
    shootingPattern: "ai",
    movementType: PieceMovement.scrollDown,
    pointingDirection: Direction.DOWN,
    stayWithinFrame: false,
    ...(overrides || {}),
  };
}
