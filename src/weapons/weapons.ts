import { distancePerFrame, getFramerate } from "../constants";
import { Point, Rect, rectFunctions } from "../drawing/dimensions";
import { Direction } from "../drawing/direction.enum";
import { Renderer } from "../drawing/rendering";
import { FireConfiguration, Piece, Weapon } from "../pieces/types";

export function getWeaponsTracker(
  edges: Rect,
  renderer: Renderer,
  updateScore: (team: string, score: number) => void
) {
  return (
    weapons: FireConfiguration[],
    pieces: Piece[] = []
  ): FireConfiguration[] => {
    return weapons.reduce((ww, w) => {
      // Already hit something, show the hit explosion.
      if (w.hit) {
        w.hit.framesShown++;
        if (w.hit.framesShown > Math.floor(getFramerate() / 6)) {
          return ww;
        }
        ww.push(w);
        renderer(
          { layoutData: w.weapon.hitLayout(w.hit.framesShown) },
          w.hit.location
        );
        return ww;
      }
      const location = {
        x: w.location.x,
        y:
          w.direction === Direction.DOWN
            ? w.location.y + distancePerFrame(w.weapon.speed)
            : w.location.y - distancePerFrame(w.weapon.speed),
      };
      if (!rectFunctions(edges).inFrame(location)) {
        return ww;
      }
      const w2 = {
        ...w,
        location: location,
      };
      if (pieces.some((x) => x.hit(location, w.team))) {
        // weapon has hit target
        w2.hit = {
          framesShown: 0,
          location,
        };
        updateScore(w.team, 1);
      }
      ww.push(w2);
      if (w2.hit) {
        renderer(
          {
            layoutData: w2.hit ? w.weapon.hitLayout(1) : w.weapon.layout,
          },
          location
        );
      } else {
        renderer(
          w.weapon.preRendered || {
            layoutData: w.weapon.layout,
          },
          location
        );
      }

      return ww;
    }, []);
  };
}
