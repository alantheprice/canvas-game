import { LayoutData } from "../../drawing/rendering";

export const bossHeight = 70;
export const bossWidth = 100;

export const bossLayout: LayoutData[] = [
  [
    "r",
    { x: 0, y: 15, w: bossWidth, h: bossHeight - 30 },
    "#755",
    { width: 4, color: "#866" },
  ],
  [
    "c",
    { x: bossWidth / 2, y: bossHeight / 2, diameter: bossWidth / 3.5 },
    "#944",
    { width: 4, color: "#844" },
  ],
  [
    "p",
    [
      [bossWidth, 0],
      [bossWidth, bossHeight],
    ],
    "#755",
    7,
  ],
  [
    "p",
    [
      [0, 0],
      [0, bossHeight],
    ],
    "#755",
    7,
  ],
];
