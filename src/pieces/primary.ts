import { MOVEMENT_FRAME_DISTANCE, WEAPON_FRAME_DISTANCE } from "../constants";
import { Draw } from "../drawing/canvasDrawing";
import { LayoutData, Renderer } from "../drawing/rendering";
import { point, Point } from "../drawing/dimensions";
import { LASER, Weapon } from "../gameplay/weapons";
import { KEY_MAP, PressType, subscribe } from "../keyboardHandler";
import { objectKeys } from "../utils";
import { Piece, PieceFactory } from "./types";

const HEIGHT = 55;
const WIDTH = 80;

const LAYOUT: LayoutData[] = [
  [
    "r",
    { x: 0, y: 20, w: WIDTH, h: HEIGHT - 34 },
    "#666",
    { width: 2, color: "#777" },
  ],
  [
    "p",
    [
      [8, 8],
      [8, HEIGHT - 8],
    ],
    "#777",
    7,
  ],
  [
    "p",
    [
      [8, 10],
      [8, HEIGHT - 10],
    ],
    "#555",
    3,
  ],
  [
    "p",
    [
      [WIDTH - 8, 8],
      [WIDTH - 8, HEIGHT - 8],
    ],
    "#777",
    8,
  ],
  [
    "p",
    [
      [WIDTH - 8, 10],
      [WIDTH - 8, HEIGHT - 10],
    ],
    "#555",
    3,
  ],
  [
    "p",
    [
      [WIDTH / 2 - 8, HEIGHT - 15],
      [WIDTH / 2 - 1, 2],
      [WIDTH / 2, 2],
      [WIDTH / 2 + 1, 2],
      [WIDTH / 2 + 8, HEIGHT - 15],
    ],
    "#555",
    10,
  ],
  [
    "p",
    [
      [WIDTH / 2, 10],
      [WIDTH / 2, 20],
    ],
    "#AAA",
    5,
  ],
  [
    "c",
    { x: WIDTH / 2, y: HEIGHT / 2 + 15, diameter: 10 },
    "#777",
    {
      width: 4,
      color: "#555",
    },
  ],
  [
    "c",
    { x: WIDTH / 2, y: HEIGHT / 2 + 15, diameter: 5 },
    "#45E",
    {
      width: 2,
      color: "#4555E9",
    },
  ],
];

function create(
  draw: Draw,
  renderer: Renderer,
  location: Point,
  fire: (weapon: Weapon, origin: Point) => void
): Piece {
  const currentMovements = {};
  const movementDirections = {
    up: () => (location.y = Math.max(location.y - MOVEMENT_FRAME_DISTANCE, 0)),
    down: () =>
      (location.y = Math.min(
        location.y + MOVEMENT_FRAME_DISTANCE,
        draw.dimensions.h - HEIGHT
      )),
    left: () =>
      (location.x = Math.max(location.x - MOVEMENT_FRAME_DISTANCE, 0)),
    right: () =>
      (location.x = Math.min(
        location.x + MOVEMENT_FRAME_DISTANCE,
        draw.dimensions.w - WIDTH
      )),
  };

  function fireLasers() {
    fire(LASER, point(location.x + 5, location.y));
    fire(LASER, point(location.x + WIDTH - 10, location.y));
  }

  subscribe(handleKeys);

  function render() {
    // render movements
    objectKeys(currentMovements).values.forEach((x) => x());
    renderer(LAYOUT, location);
  }

  function handleKeys(type: PressType, ev: KeyboardEvent): void {
    if (type === "keypress") {
      return handleKeypress(ev);
    }
    handleMovement(type, KEY_MAP[ev.key]);
  }

  function handleMovement(type: PressType, direction?: string) {
    const movement = movementDirections[direction];
    if (!movement) {
      return;
    }
    if (type === "keydown") {
      currentMovements[direction] = movement;
    }
    if (type === "keyup") {
      delete currentMovements[direction];
    }
  }

  function handleKeypress(ev: KeyboardEvent) {
    if (ev.key === " ") {
      fireLasers();
    }
  }

  return {
    render: render,
    getLocation: () => location,
    setLocation: (location) => location,
  };
}

export default create as PieceFactory;
