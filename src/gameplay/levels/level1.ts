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
    const fifths = edges.w / 5;
    return [
      pieceFactory(snap, point(fifths, -snapHeight)),
      pieceFactory(snap, point(fifths * 2, -snapHeight)),
      pieceFactory(snap, point(fifths * 3, -snapHeight)),
      pieceFactory(snap, point(fifths * 4, -snapHeight)),
    ];
  }

  function fighters() {
    const quarters = edges.w / 4;
    return [
      pieceFactory(fighter, point(quarters, -fighterHeight)),
      pieceFactory(fighter, point(quarters * 2, -fighterHeight)),
      pieceFactory(fighter, point(quarters * 3, -fighterHeight)),
    ];
  }

  return {
    waves: arrayAtLength(20).map((_, index) => getWave(index)),
  };
}
