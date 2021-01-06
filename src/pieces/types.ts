import { Draw } from "../drawing/canvasDrawing";
import { Point, Rect } from "../drawing/dimensions";
import { LayoutData, Renderer } from "../drawing/rendering";
import { Direction } from "../game";

export interface Weapon {
  speed: number;
  power: number;
  layout: LayoutData[];
}
export type Fire = (
  weapon: Weapon,
  location: Point,
  direction?: Direction
) => void;
export interface Piece {
  getLocation: () => Point;
  setLocation: (point: Point) => void;
  render: () => void;
  shouldRender: () => boolean;
  getHitRect: () => Rect;
  hit: (point: Point) => boolean;
}

export type PieceFactory = (
  draw: Draw,
  renderer: Renderer,
  location: Point,
  fire: Fire
) => Piece;
