import { rect } from "../drawing/dimensions";
import preRender from "../drawing/preRender";
import { Weapon } from "../pieces/types";

const missleWidth = 10;
const missleHeight = 30;

const layoutData = [
  [
    "r",
    { x: missleWidth / 3, y: 0, w: missleWidth / 3, h: missleHeight },
    "#020299",
  ],
  [
    "p",
    [
      [2, missleWidth/2],
      [missleWidth/2, 0],
      [missleWidth - 2, missleWidth/2],
    ],
    "#020299",
    3,
  ],
];

const preRendered = preRender({ 
  layoutData: layoutData,
  frame: rect(0, 0, 20, 30),
});

export const MISSLE: Weapon = {
  speed: 50,
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
