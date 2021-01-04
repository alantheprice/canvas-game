import { Draw } from "../drawing/canvasDrawing";
import { Point } from "../drawing/dimensions";

export interface Piece {
  getLocation: () => Point;
  setLocation: (point: Point) => void;
  render: () => void;
}

export type PieceFactory = (drawingContext: Draw, location: Point) => Piece;
