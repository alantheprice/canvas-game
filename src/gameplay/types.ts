import { Piece } from "../pieces/types";

export interface Level {
  waves: {
    pieces: Piece[];
    durationInSeconds: number;
  }[];
}
