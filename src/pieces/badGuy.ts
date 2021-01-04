import { Draw } from "../drawing/canvasDrawing";
import { LayoutData, Renderer } from "../drawing/rendering";
import { point, Point } from "../drawing/dimensions";
import { LASER, Weapon } from "../gameplay/weapons";
import { Piece, PieceFactory } from "./types";

const HEIGHT = 35;
const WIDTH = 60;

const LAYOUT: LayoutData[] = [
  ["r", { x: 0, y: 8, w: WIDTH, h: HEIGHT - 8 }, "#404040"],
];

function create(
  draw: Draw,
  renderer: Renderer,
  location: Point,
  fire: (weapon: Weapon, origin: Point) => void
): Piece {
  function fireLasers() {
    fire(LASER, point(location.x + 5, location.y));
    fire(LASER, point(location.x + WIDTH - 10, location.y));
  }

  function render() {
    renderer(LAYOUT, location);
  }

  return {
    render: render,
    getLocation: () => location,
    setLocation: (location) => location,
  };
}

export default create as PieceFactory;
