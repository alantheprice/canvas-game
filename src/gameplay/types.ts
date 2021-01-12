import { Piece } from "../pieces/types";

export interface Wave {
  pieces: Piece[];
  durationInSeconds: number;
}

export interface Level {
  waves: Wave[];
}
