import { Draw, Stroke } from "../drawing/canvasDrawing";
import { Circle, point, Point, Rect } from "../drawing/dimensions";
import { Damage } from "../pieces/types";

type XY = [number, number];
type Points = XY[];
type Color = string;
type Width = number;
type RenderType = "p" | "r" | "c";
type PathData = ["p", Points, Color, Width];
type RectData = ["r", Rect, Color, Stroke?];
type CircleData = ["c", Circle, Color, Stroke?];
export type LayoutData = PathData | RectData | CircleData;

export interface Layout {
  frame: Rect;
  layoutData: LayoutData[];
}

type RendererMap = Record<
  RenderType,
  (layoutData: LayoutData, location: Point, colorOverride?: string) => void
>;

export type Renderer = (
  layout: LayoutData[],
  currentLocation: Point,
  showShadow?: boolean
) => void;

export function createRenderer(draw: Draw): Renderer {
  const renderPath = (
    layoutData: LayoutData,
    location: Point,
    colorOverride?: string
  ) => {
    const pathData = layoutData as PathData;
    draw.drawPath(
      pathData[1].map((xy) => {
        return { x: xy[0], y: xy[1] };
      }),
      pathData[3],
      colorOverride || pathData[2],
      location
    );
  };
  const renderRect = (
    layoutData: LayoutData,
    location: Point,
    colorOverride?: string
  ) => {
    const rectData = layoutData as RectData;
    draw.drawRect(
      rectData[1],
      colorOverride || rectData[2],
      colorOverride ? null : rectData[3] || null,
      location
    );
  };
  const renderCircle = (
    layoutData: LayoutData,
    location: Point,
    colorOverride?: string
  ) => {
    const circleData = layoutData as CircleData;
    draw.drawCircle(
      circleData[1],
      colorOverride || circleData[2],
      colorOverride ? null : circleData[3] || null,
      location
    );
  };

  const layoutRenderer: RendererMap = {
    p: renderPath,
    r: renderRect,
    c: renderCircle,
  };

  function render(
    layout: LayoutData[],
    currentLocation: Point,
    showShadow?: boolean
  ) {
    if (showShadow) {
      layout.forEach((layoutData) => {
        const renderer = layoutRenderer[layoutData[0]];
        if (!renderer) {
          console.error(
            "failed to render layout, is layoutData correctly formed?"
          );
          return;
        }
        renderer(
          layoutData,
          point(currentLocation.x, currentLocation.y + 20),
          "rgba(80, 80, 80, 0.1)"
        );
      });
    }
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
