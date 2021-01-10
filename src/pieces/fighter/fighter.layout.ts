import { LayoutData } from "../../drawing/rendering";

export const fighterHeight = 35;
export const fighterWidth = 50;

export const fighterLayout: LayoutData[] = [
  [
    "r",
    { x: 0, y: 15, w: fighterWidth, h: fighterHeight - 30 },
    "#755",
    { width: 4, color: "#866" },
  ],
  [
    "c",
    { x: fighterWidth / 2, y: fighterHeight / 2, diameter: fighterWidth / 3.5 },
    "#944",
    { width: 4, color: "#844" },
  ],
  [
    "p",
    [
      [fighterWidth, 0],
      [fighterWidth, fighterHeight],
    ],
    "#755",
    5,
  ],
  [
    "p",
    [
      [0, 0],
      [0, fighterHeight],
    ],
    "#755",
    5,
  ],
];
