import { Draw } from "../drawing/canvasDrawing";
import { point, rect } from "../drawing/dimensions";
import { Renderer } from "../drawing/rendering";
import { pineTreeLayout } from "./trees/pine.layout";

const showTrees = false;

export function getEnvironment(
  backgroundDraw: Draw,
  backgroundRenderer: Renderer
) {
  const area = backgroundDraw.dimensions;
  let drawLocation = 0;
  const riverWidth = area.w / 4;

  function nextTick() {
    drawLocation++;
    // clear current canvas
    backgroundDraw.clear();
    // Grass
    backgroundDraw.fill("#81bc5c");
    // river look, but lame-ish

    backgroundDraw.drawPath(
      [
        point(area.w / 2, 0),
        // point(area.w / 2 - 200, area.h / 2),
        point(area.w / 2, area.h),
      ],
      riverWidth,
      "#4d9bba"
    );
    if (showTrees) {
      backgroundRenderer(
        { layout: { layoutData: pineTreeLayout } },
        point(area.w / 2 - riverWidth / 2, drawLocation - 60)
      );
      backgroundRenderer(
        { layout: { layoutData: pineTreeLayout } },
        point(area.w / 2 + 150, drawLocation - 90)
      );

      backgroundRenderer(
        { layout: { layoutData: pineTreeLayout } },
        point(area.w / 2 - 200, drawLocation)
      );
      backgroundRenderer(
        { layout: { layoutData: pineTreeLayout } },
        point(area.w / 2 + 150, drawLocation)
      );
    }

    if (drawLocation > area.h) {
      drawLocation = 0;
    }

    // overlay fill to shift colors
    backgroundDraw.fill("rgba(200,200,200, 0.5");
  }

  return {
    nextTick: nextTick,
  };
}
