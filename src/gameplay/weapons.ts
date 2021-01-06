import { Weapon } from "../pieces/types";

export const LASER: Weapon = {
  speed: 900,
  power: 50,
  //   direction: 30,
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
};
