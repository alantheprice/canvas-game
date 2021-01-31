import { point, Rect } from "../../drawing/dimensions";
import { getFighter } from "../../pieces/fighter/fighter";
import { getSnap } from "../../pieces/snap/snap";
import { PieceFactory } from "../../pieces/types";
import { arrayAtLength } from "../../utils";
import { Level, Wave } from "../types";

export function getLevel1(pieceFactory: PieceFactory, edges: Rect): Level {
  const snap = getSnap({ health: 2 });
  const snapHeight = snap.layout.frame.h;
  const fighter = getFighter();
  const fighterHeight = fighter.layout.frame.h;
  function getWave(waveNumber: number): Wave {
    // here we would return either snaps or fighters, and fit the number to the screen width.
    // additionally we could make the health of the fighters increase over the waves to make them more difficult.
    // other ideas....

    return waveNumber % 2 === 0
      ? {
          pieces: snaps(),
          durationInSeconds: 3,
        }
      : {
          pieces: fighters(),
          durationInSeconds: 6,
        };
  }

  function snaps() {
    return [
      pieceFactory(snap, point(edges.w / 2, -snapHeight)),
      pieceFactory(snap, point(edges.w / 2 - 60, -snapHeight)),
      pieceFactory(snap, point(edges.w / 2 + 60, -snapHeight)),
    ];
  }

  function fighters() {
    return [
      pieceFactory(fighter, point(edges.w / 2, -fighterHeight)),
      pieceFactory(fighter, point(edges.w / 2 - 120, -fighterHeight)),
      pieceFactory(fighter, point(edges.w / 2 + 120, -fighterHeight)),
    ];
  }

  return {
    waves: arrayAtLength(20).map((_, index) => getWave(index)),
  };
}
