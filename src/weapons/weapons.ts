import { distancePerFrame } from "../constants";
import { Point, Rect, rectFunctions } from "../drawing/dimensions";
import { Direction } from "../drawing/direction.enum";
import { Renderer } from "../drawing/rendering";
import { FireConfiguration, Piece, Weapon } from "../pieces/types";

export function getWeaponsTracker(edges: Rect, renderer: Renderer) {
  return (
    weapons: FireConfiguration[],
    pieces: Piece[] = []
  ): FireConfiguration[] => {
    return weapons.reduce((ww, w) => {
      if (w.hit) {
        w.hit.framesShown++;
        if (w.hit.framesShown > 5) {
          return ww;
        }
        ww.push(w);
        renderer(w.weapon.hitLayout, w.hit.location);
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
      }
      ww.push(w2);
      renderer(w2.hit ? w.weapon.hitLayout : w.weapon.layout, location);
      return ww;
    }, []);
  };
}
