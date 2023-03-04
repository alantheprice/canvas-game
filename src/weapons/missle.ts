import { rect } from "../drawing/dimensions";
import preRender from "../drawing/preRender";
import { Weapon } from "../pieces/types";

const missleWidth = 14;
const missleHeight = 30;

const missleColor = "#446";
const highlightColor = "#555";
const bodyHighlightColor = "#666";

const layoutData = [
  [ // missle body
    "r",
    { x: missleWidth / 3, y: 3, w: missleWidth / 3, h: missleHeight - 6 },
    missleColor,
  ],
  [ // missle front
    "p",
    [
      [4, missleWidth/2],
      [missleWidth/2, 0],
      [missleWidth - 4, missleWidth/2],
    ],
    missleColor,
    3,
  ],
  [// body highlight
    "p", 
    [
      [missleWidth/2 - 1, 4],
      [missleWidth/2 - 1, missleHeight - 14],
    ],
    bodyHighlightColor,
    1,
  ],
  [// tail wing left
    "p", 
    [
      [2, missleHeight - 10],
      [2, missleHeight],
    ],
    missleColor,
    2,
  ],
  [// tail wing right
    "p", 
    [
      [missleWidth - 3, missleHeight - 10],
      [missleWidth - 3, missleHeight],
    ],
    missleColor,
    2,
  ],
  [// tail wing left highlight
    "p", 
    [
      [3, missleHeight - 12],
      [3, missleHeight - 5],
    ],
    highlightColor,
    2,
  ],
  [// tail wing right highlight
    "p", 
    [
      [missleWidth - 5, missleHeight - 12],
      [missleWidth - 5, missleHeight - 5],
    ],
    highlightColor,
    2,
  ],
];

const preRendered = preRender({ 
  layoutData: layoutData,
  frame: rect(0, 0, 20, 30),
});

export const MISSLE: Weapon = {
  speed: 450,
  power: 50,
  layout: layoutData,
  preRendered: preRendered,
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
