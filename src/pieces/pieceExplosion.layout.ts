import { Rect } from "../drawing/dimensions";
import { LayoutData } from "../drawing/rendering";

export const explosion: (frame: Rect, frames: number) => LayoutData[] = (
  frame: Rect,
  frames: number
) => [
  [
    "c",
    {
      x: frame.w / 2,
      y: frame.h / 2 - 5,
      diameter: Math.min(frame.h, Math.max(frame.h / 2, frames * 1.2)),
    },
    "#E65",
    {
      width: 4,
      color: "#F99",
    },
  ],
];
