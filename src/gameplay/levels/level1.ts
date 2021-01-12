import { point, Rect } from "../../drawing/dimensions";
import { getFighter } from "../../pieces/fighter/fighter";
import { getSnap } from "../../pieces/snap/snap";
import { PieceFactory } from "../../pieces/types";
import { Level } from "../types";

export function getLevel1(pieceFactory: PieceFactory, edges: Rect): Level {
  function wave1() {
    return [
      pieceFactory(getSnap(), point(edges.w / 2 - 40, 0)),
      pieceFactory(getSnap(), point(edges.w / 2, 0)),
    ];
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
      pieceFactory(getFighter(), point(edges.w / 2 - 180, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 - 240, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 + 60, 0)),
    ];
  }

  return {
    waves: [
      {
        pieces: wave1(),
        durationInSeconds: 5,
      },
      {
        pieces: snaps(),
        durationInSeconds: 6,
      },
      {
        pieces: fighters(),
        durationInSeconds: 6,
      },
      {
        pieces: snaps(),
        durationInSeconds: 6,
      },
      {
        pieces: fighters(),
        durationInSeconds: 6,
      },
      {
        pieces: snaps(),
        durationInSeconds: 10,
      },
      //   {
      //     pieces: wave2(),
      //     durationInSeconds: 6,
      //   },
      //   {
      //     pieces: wave2(),
      //     durationInSeconds: 6,
      //   },
      //   {
      //     pieces: wave2(),
      //     durationInSeconds: 6,
      //   },
      //   {
      //     pieces: wave2(),
      //     durationInSeconds: 6,
      //   },
      //   {
      //     pieces: wave2(),
      //     durationInSeconds: 6,
      //   },
    ],
  };
}
