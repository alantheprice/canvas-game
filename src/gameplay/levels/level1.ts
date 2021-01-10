import { point, Rect } from "../../drawing/dimensions";
import { getFighter } from "../../pieces/fighter/fighter";
import { PieceFactory } from "../../pieces/types";
import { getWing } from "../../pieces/wing/wing";
import { Level } from "../types";

export function getLevel1(pieceFactory: PieceFactory, edges: Rect): Level {
  // Starting game piece location (bottom, center of screen)
  let centerBottom = point(edges.w / 2 - 25, edges.h - 100);

  function wave1() {
    return [
      pieceFactory(getWing(), centerBottom),
      pieceFactory(getFighter(), point(edges.w / 2, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 + 60, 0)),
    ];
  }

  function wave2() {
    return [
      pieceFactory(getFighter(), point(edges.w / 2, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 - 60, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 - 120, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 - 180, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 - 240, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 + 60, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 + 120, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 + 180, 0)),
      pieceFactory(getFighter(), point(edges.w / 2 + 240, 0)),
    ];
  }
  return {
    waves: [
      {
        pieces: wave1(),
        durationInSeconds: 5,
      },
      {
        pieces: wave2(),
        durationInSeconds: 5,
      },
      {
        pieces: wave2(),
        durationInSeconds: 5,
      },
      {
        pieces: wave2(),
        durationInSeconds: 5,
      },
      {
        pieces: wave2(),
        durationInSeconds: 5,
      },
      {
        pieces: wave2(),
        durationInSeconds: 5,
      },
      {
        pieces: wave2(),
        durationInSeconds: 5,
      },
      {
        pieces: wave2(),
        durationInSeconds: 5,
      },
      {
        pieces: wave2(),
        durationInSeconds: 5,
      },
      {
        pieces: wave2(),
        durationInSeconds: 5,
      },
      {
        pieces: wave2(),
        durationInSeconds: 5,
      },
    ],
  };
}
