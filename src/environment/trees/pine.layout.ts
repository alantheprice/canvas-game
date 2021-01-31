import { LayoutData } from "../../drawing/rendering";

export const height = 50;
export const width = height;

export const pineTreeLayout: LayoutData[] = [
  [
    "c",
    {
      x: width / 2,
      y: width / 2,
      diameter: width / 2,
    },
    "#43A047",
    { width: 4, color: "#558B2F" },
  ],
  [
    "c",
    {
      x: width / 2,
      y: width / 2,
      diameter: width / 3.5,
    },
    "#43A047",
    { width: 4, color: "#558B2F" },
  ],
  [
    "c",
    {
      x: width / 2,
      y: width / 2,
      diameter: width / 8,
    },
    "#558B2F",
  ],
  //   [
  //     "p",
  //     [
  //       [0, height / 2],
  //       [width, height / 2],
  //     ],
  //     "#558B2F",
  //     7,
  //   ],
  //   [
  //     "p",
  //     [
  //       [width / 2, 0],
  //       [width / 2, height],
  //     ],
  //     "#558B2F",
  //     7,
  //   ],
  //   [
  //     "p",
  //     [
  //       [width / 4, 0],
  //       [width - width / 4, height],
  //     ],
  //     "#558B2F",
  //     5,
  //   ],
];
