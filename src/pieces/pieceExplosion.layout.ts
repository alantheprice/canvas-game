import { Rect } from "../drawing/dimensions";
import { LayoutData } from "../drawing/rendering";

export const explosion: (frame: Rect, frames: number, limit: number) => LayoutData[] = (
  frame: Rect,
  frames: number
) => [
  [
    "c",
    {
      x: frame.w / 2,
      y: frame.h / 3,
      diameter: Math.min(frame.h / 2, Math.max(10, frames * 1.4)),
    },
    "#E65",
    {
      width: 4,
      color: "#F99",
    },
  ],
  [
    "c",
    {
      x: frame.w / 2 - frame.w / 4,
      y: frame.h / 3 + 5,
      diameter: Math.min(frame.h - frame.h / 4, Math.max(5, frames * 0.4)),
    },
    "#E65",
    {
      width: 4,
      color: "#F99",
    },
  ],
  [
    "c",
    {
      x: frame.w / 2 + frame.w / 4,
      y: frame.h / 3 - 5,
      diameter: Math.min(frame.h - frame.h / 4, Math.max(2, frames * 0.8)),
    },
    "#E65",
    {
      width: 4,
      color: "#F99",
    },
  ],
];
