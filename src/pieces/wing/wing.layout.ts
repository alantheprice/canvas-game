import { LayoutData } from "../../drawing/rendering";

export const wingHeight = 55;
export const wingWidth = 80;

export const wingLayout: LayoutData[] = [
  [
    "r",
    { x: 0, y: 20, w: wingWidth, h: wingHeight - 34 },
    "#666",
    { width: 2, color: "#777" },
  ],
  [
    "p",
    [
      [8, 8],
      [8, wingHeight - 8],
    ],
    "#777",
    7,
  ],
  [
    "p",
    [
      [8, 10],
      [8, wingHeight - 10],
    ],
    "#555",
    3,
  ],
  [
    "p",
    [
      [wingWidth - 8, 8],
      [wingWidth - 8, wingHeight - 8],
    ],
    "#777",
    8,
  ],
  [
    "p",
    [
      [wingWidth - 8, 10],
      [wingWidth - 8, wingHeight - 10],
    ],
    "#555",
    3,
  ],
  [
    "p",
    [
      [wingWidth / 2 - 8, wingHeight - 15],
      [wingWidth / 2 - 1, 2],
      [wingWidth / 2, 2],
      [wingWidth / 2 + 1, 2],
      [wingWidth / 2 + 8, wingHeight - 15],
    ],
    "#555",
    10,
  ],
  [
    "p",
    [
      [wingWidth / 2, 10],
      [wingWidth / 2, 20],
    ],
    "#AAA",
    5,
  ],
  [
    "c",
    { x: wingWidth / 2, y: wingHeight / 2 + 15, diameter: 5 },
    "#45E",
    {
      width: 2,
      color: "#4555E9",
    },
  ],
];
