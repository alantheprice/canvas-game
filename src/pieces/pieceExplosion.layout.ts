import { Rect } from "../drawing/dimensions";
import { LayoutData } from "../drawing/rendering";

export const explosion: (
  frame: Rect,
  frames: number,
  limit: number
) => LayoutData[] = (frame: Rect, frames: number, limit: number) => {
  const size = frames > limit / 2 ? limit - frames : frames;
  const color = Math.floor(Math.min((frames / limit) * 10, 9));
  return [
    [
      "c",
      {
        x: frame.w / 2,
        y: frame.h / 3,
        diameter: Math.min(frame.h / 2, Math.max(10, size * 2.8)),
      },
      `#E${color}${Math.max(color - 1, 1)}`,
      {
        width: 4,
        color: `#F${color}${color}`,
      },
    ],
    [
      "c",
      {
        x: frame.w / 2 - frame.w / 4,
        y: frame.h / 3 + 5,
        diameter: Math.min(frame.h - frame.h / 4, Math.max(5, size * 0.8)),
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
        diameter: Math.min(frame.h - frame.h / 4, Math.max(2, size * 1.6)),
      },
      "#E65",
      {
        width: 4,
        color: "#F99",
      },
    ],
  ];
};
