import { rect } from "../drawing/dimensions";
import { Direction } from "../drawing/direction.enum";
import preRender from "../drawing/preRender";
import { LayoutData } from "../drawing/rendering";
import { Weapon } from "../pieces/types";

const MISSILEWidth = 14;
const MISSILEHeight = 30;

const MISSILEColor = "#446";
const highlightColor = "#555";
const bodyHighlightColor = "#666";

const layoutData:LayoutData[] = [
  [ // MISSILE body
    "r",
    { x: MISSILEWidth / 3, y: 3, w: MISSILEWidth / 3, h: MISSILEHeight - 6 },
    MISSILEColor,
  ],
  [ // MISSILE front
    "p",
    [
      [4, MISSILEWidth/2],
      [MISSILEWidth/2, 0],
      [MISSILEWidth - 4, MISSILEWidth/2],
    ],
    MISSILEColor,
    3,
  ],
  [// body highlight
    "p", 
    [
      [MISSILEWidth/2 - 1, 4],
      [MISSILEWidth/2 - 1, MISSILEHeight - 14],
    ],
    bodyHighlightColor,
    1,
  ],
  [// tail wing left
    "p", 
    [
      [2, MISSILEHeight - 10],
      [2, MISSILEHeight],
    ],
    MISSILEColor,
    2,
  ],
  [// tail wing right
    "p", 
    [
      [MISSILEWidth - 3, MISSILEHeight - 10],
      [MISSILEWidth - 3, MISSILEHeight],
    ],
    MISSILEColor,
    2,
  ],
  [// tail wing left highlight
    "p", 
    [
      [3, MISSILEHeight - 12],
      [3, MISSILEHeight - 5],
    ],
    highlightColor,
    2,
  ],
  [// tail wing right highlight
    "p", 
    [
      [MISSILEWidth - 5, MISSILEHeight - 12],
      [MISSILEWidth - 5, MISSILEHeight - 5],
    ],
    highlightColor,
    2,
  ],
];

const layout = { 
  layoutData: layoutData,
  frame: rect(0, 0, 20, 30),
};

export const MISSILE: Weapon = {
  speed: 450,
  power: 50,
  layout,
  preRendered: {
    [Direction.DOWN]: preRender(layout, Direction.DOWN),
    [Direction.UP]: preRender(layout, Direction.DOWN),
  },
  hitLayout: (explosionFrames: number) => [
    [
      "c",
      { x: 0, y: 5, diameter: Math.floor(explosionFrames * 2) },
      "#FA5",
      {
        width: 1,
        color: "#F88",
      },
    ],
  ],
};
