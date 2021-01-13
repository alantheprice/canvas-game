import { point, Rect } from "../../drawing/dimensions";
import { getFighter } from "../../pieces/fighter/fighter";
import { getSnap } from "../../pieces/snap/snap";
import { PieceFactory } from "../../pieces/types";
import { Level, Wave} from "../types";

export function getLevel1(pieceFactory: PieceFactory, edges: Rect): Level {

  function getWave(waveNumber: number): Wave {
    // here we would return either snaps or fighters, and fit the number to the screen width.
    // additionally we could make the health of the fighters increase over the waves to make them more difficult.
    // other ideas....
    
    return waveNumber % 2 === 0 ? {
      pieces: snaps(), 
      durationInSeconds: 3
    } : {
      pieces: fighters(),                         
      durationInSeconds: 6
    }
  }

  function snaps() {
    return [
      pieceFactory(getSnap(), point(edges.w / 2, 0)),
      pieceFactory(getSnap(), point(edges.w / 2 - 60, 0)),
      pieceFactory(getSnap(), point(edges.w / 2 + 60, 0)),
    ];
  }

  function fighters() {
    return [
      pieceFactory(getFighter(), point(edges.w / 2, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 - 120, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 + 120, 0)),
    ];
  }

  return {
    waves: new Array(20).join(",").split(",").map((_, index) => getWave(index))
  };
}
