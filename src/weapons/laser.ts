import { Weapon } from "../pieces/types";

export const LASER: Weapon = {
  speed: 900,
  power: 50,
  layout: [
    [
      "p",
      [
        [0, 0],
        [0, 10],
      ],
      "#FA5",
      4,
    ],
    [
      "p",
      [
        [0, 2],
        [0, 6],
      ],
      "#F00",
      2,
    ],
  ],
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
