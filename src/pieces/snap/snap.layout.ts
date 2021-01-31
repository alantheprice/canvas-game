import { LayoutData } from "../../drawing/rendering";

export const snapHeight = 45;
export const snapWidth = 45;

export const snapLayout: LayoutData[] = [
  [
    "c",
    {
      x: snapWidth / 2,
      y: 15,
      diameter: 12,
    },
    "#944",
    { width: 4, color: "#844" },
  ],
  [
    "p",
    [
      [5, 15],
      [snapWidth / 2 - 1, 28],
      [snapWidth / 2, 38],
      [snapWidth / 2 + 1, 28],
      [snapWidth - 5, 15],
    ],
    "#555",
    10,
  ],
];
