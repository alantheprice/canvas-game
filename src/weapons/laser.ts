import { rect } from "../drawing/dimensions";
import { Direction } from "../drawing/direction.enum";
import preRender from "../drawing/preRender";
import { LayoutData } from "../drawing/rendering";
import { Weapon } from "../pieces/types";

const layoutData: LayoutData[] = [
  [
    "p",
    [
      [0, 0],
      [0, 10],
    ],
    "#5AF",
    6,
  ],
  [
    "p",
    [
      [0, 2],
      [0, 6],
    ],
    "#00F",
    3,
  ],
];

const layout = {
  layoutData: layoutData,
  frame: rect(0, 0, 20, 30),
};

export const LASER: Weapon = {
  speed: 900,
  power: 50,
  layout,
  preRendered: {
    [Direction.DOWN]: preRender(layout, Direction.DOWN),
    [Direction.UP]: preRender(layout, Direction.UP),
  },
  hitLayout: (explosionFrames: number) => [
    [
      "c",
      { x: 0, y: 5, diameter: Math.floor(explosionFrames / 1.2) },
      "#FA5",
      {
        width: 1,
        color: "#F88",
      },
    ],
  ],
};
