import { Draw } from "../drawing/canvasDrawing";
import { LayoutData, Renderer } from "../drawing/rendering";
import { point, Point } from "../drawing/dimensions";
import { LASER, Weapon } from "../gameplay/weapons";
import { Piece, PieceFactory } from "./types";
import { Direction } from "../game";
import { MOVEMENT_FRAME_DISTANCE } from "../constants";

const HEIGHT = 35;
const WIDTH = 50;

const LAYOUT: LayoutData[] = [
  [
    "r",
    { x: 0, y: 15, w: WIDTH, h: HEIGHT - 30 },
    "#755",
    { width: 4, color: "#866" },
  ],
  [
    "c",
    { x: WIDTH / 2, y: HEIGHT / 2, diameter: WIDTH / 3.5 },
    "#944",
    { width: 4, color: "#844" },
  ],
  [
    "p",
    [
      [WIDTH, 0],
      [WIDTH, HEIGHT],
    ],
    "#755",
    5,
  ],

  [
    "p",
    [
      [0, 0],
      [0, HEIGHT],
    ],
    "#755",
    5,
  ],
];

function create(
  draw: Draw,
  renderer: Renderer,
  location: Point,
  fire: (weapon: Weapon, location: Point, direction?: Direction) => void
): Piece {
  const LIMIT_RIGHT = draw.dimensions.w - WIDTH;
  let currentDirection = Direction.RIGHT;

  const movements = {
    LEFT: () =>
      (location.x = Math.max(location.x - MOVEMENT_FRAME_DISTANCE / 2, 0)),
    RIGHT: () =>
      (location.x = Math.min(
        location.x + MOVEMENT_FRAME_DISTANCE / 2,
        draw.dimensions.w - WIDTH
      )),
  };

  function move() {
    if (location.x === LIMIT_RIGHT) {
      currentDirection = Direction.LEFT;
    } else if (currentDirection === Direction.LEFT && location.x === 0) {
      currentDirection = Direction.RIGHT;
    }
    const movement = movements[currentDirection];
    movement();
  }

  function fireLasers() {
    fire(
      LASER,
      point(location.x + WIDTH / 2 + 5, location.y + HEIGHT),
      Direction.DOWN
    );
    fire(
      LASER,
      point(location.x + WIDTH / 2 - 5, location.y + HEIGHT),
      Direction.DOWN
    );
  }

  function render() {
    const randomize = Math.random();
    if (randomize > 0.99) {
      fireLasers();
    }
    // if (randomize < 0.02) {
    move();
    // }

    renderer(LAYOUT, location);
  }

  return {
    render: render,
    getLocation: () => location,
    setLocation: (location) => location,
  };
}

export default create as PieceFactory;
