import { rect } from "../drawing/dimensions";
import preRender from "../drawing/preRender";
import { Weapon } from "../pieces/types";

const missleWidth = 12;
const missleHeight = 30;

const layoutData = [
  [
    "c",
    { x: missleWidth / 2, y: missleHeight / 2, diameter: missleWidth / 3.14 },
    "#944",
    { width: 4, color: "#844" },
  ],
  [
    "r",
    { x: missleWidth / 4, y: missleHeight, w: missleWidth / 2, h: missleHeight },
    "#755",
    { width: 4, color: "#866" },
  ],
//   [
//     "r",
//     { x: , y: 15, w: 3, h: fighterHeight - 30 },
//     "#755",
//     { width: 4, color: "#866" },
//     "#F00",
//     3,
//   ],
];

const preRendered = preRender({
  layoutData: layoutData,
  frame: rect(0, 0, 20, 30),
});

export const MISSLE: Weapon = {
  speed: 900,
  power: 50,
  layout: layoutData,
  preRendered: preRendered,
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
