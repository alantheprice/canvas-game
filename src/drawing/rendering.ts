import { Draw, Stroke } from "../drawing/canvasDrawing";
import { Circle, Point, Rect } from "../drawing/dimensions";

type XY = [number, number];
type Points = XY[];
type Color = string;
type Width = number;
type RenderType = "p" | "r" | "c";
type PathData = ["p", Points, Color, Width];
type RectData = ["r", Rect, Color, Stroke?];
type CircleData = ["c", Circle, Color, Stroke?];
export type LayoutData = PathData | RectData | CircleData;

type RendererMap = Record<
  RenderType,
  (layoutData: LayoutData, location: Point) => void
>;

export type Renderer = (layout: LayoutData[], currentLocation: Point) => void;

export function createRenderer(draw: Draw): Renderer {
  const renderPath = (layoutData: LayoutData, location: Point) => {
    const pathData = layoutData as PathData;
    draw.drawPath(
      pathData[1].map((xy) => {
        return { x: xy[0], y: xy[1] };
      }),
      pathData[3],
      pathData[2],
      location
    );
  };
  const renderRect = (layoutData: LayoutData, location: Point) => {
    const rectData = layoutData as RectData;
    draw.drawRect(rectData[1], rectData[2], rectData[3] || null, location);
  };
  const renderCircle = (layoutData: LayoutData, location: Point) => {
    const circleData = layoutData as CircleData;
    draw.drawCircle(
      circleData[1],
      circleData[2],
      circleData[3] || null,
      location
    );
  };

  const layoutRenderer: RendererMap = {
    p: renderPath,
    r: renderRect,
    c: renderCircle,
  };

  function render(layout: LayoutData[], currentLocation: Point) {
    layout.forEach((layoutData) => {
      const renderer = layoutRenderer[layoutData[0]];
      if (!renderer) {
        console.error(
          "failed to render layout, is layoutData correctly formed?"
        );
        return;
      }
      renderer(layoutData, currentLocation);
    });
  }

  return render;
}
