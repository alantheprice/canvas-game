import { rect } from "../drawing/dimensions";
import { Direction } from "../drawing/direction.enum";
import preRender from "../drawing/preRender";
import { LayoutData } from "../drawing/rendering";
import { Weapon } from "../pieces/types";

const missileWidth = 14;
const missileHeight = 30;

const missileColor = "#446";
const highlightColor = "#555";
const bodyHighlightColor = "#666";

const layoutData:LayoutData[] = [
  [ // MISSILE body
    "r",
    { x: missileWidth / 3, y: 3, w: missileWidth / 3, h: missileHeight - 6 },
    missileColor,
  ],
  [ // MISSILE front
    "p",
    [
      [4, missileWidth/2],
      [missileWidth/2, 0],
      [missileWidth - 4, missileWidth/2],
    ],
    missileColor,
    3,
  ],
  [// body highlight
    "p", 
    [
      [missileWidth/2 - 1, 4],
      [missileWidth/2 - 1, missileHeight - 14],
    ],
    bodyHighlightColor,
    1,
  ],
  [// tail wing left
    "p", 
    [
      [2, missileHeight - 10],
      [2, missileHeight],
    ],
    missileColor,
    2,
  ],
  [// tail wing right
    "p", 
    [
      [missileWidth - 3, missileHeight - 10],
      [missileWidth - 3, missileHeight],
    ],
    missileColor,
    2,
  ],
  [// tail wing left highlight
    "p", 
    [
      [3, missileHeight - 12],
      [3, missileHeight - 5],
    ],
    highlightColor,
    2,
  ],
  [// tail wing right highlight
    "p", 
    [
      [missileWidth - 5, missileHeight - 12],
      [missileWidth - 5, missileHeight - 5],
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
    [Direction.UP]: preRender(layout, Direction.UP),
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
