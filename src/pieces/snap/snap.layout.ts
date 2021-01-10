import { LayoutData } from "../../drawing/rendering";

export const snapHeight = 20;
export const snapWidth = 45;

export const snapLayout: LayoutData[] = [
  [
    "c",
    {
      x: snapWidth / 2,
      y: 0,
      diameter: snapWidth / 3.5,
    },
    "#944",
    { width: 4, color: "#844" },
  ],
  [
    "p",
    [
      [5, 0],
      [snapWidth / 2 - 1, snapHeight / 2],
      [snapWidth / 2, snapHeight],
      [snapWidth / 2 + 1, snapHeight / 2],
      [snapWidth - 5, 0],
    ],
    "#555",
    10,
  ],
];
