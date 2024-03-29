import { PIECE_SHADOW_OFFSET } from "../constants";
import { Draw, Stroke } from "../drawing/canvasDrawing";
import { Circle, point, Point, rect, Rect } from "../drawing/dimensions";
import { LayoutConfiguration, PieceConfiguration } from "../pieces/types";
import { arrayAtLength } from "../utils";
import colors from "./colors";
import { Position } from "./position.enum";

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
  layoutData: LayoutData[];
  frame?: Rect;
}

export interface HealthDisplay {
  position: Position;
  current: number;
  initial: number;
}

export interface RenderingConfiguration {
  showShadow?: boolean;
  healthDisplay?: HealthDisplay;
  directionOverride?: Position;
}

type RendererMap = Record<
  RenderType,
  (layoutData: LayoutData, location: Point, colorOverride?: string) => void
>;

export type Renderer = (
  layoutConfiguration: LayoutConfiguration,
  currentLocation: Point,
  config?: RenderingConfiguration
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

  const renderImage = (image: HTMLImageElement, location: Point) => {
    draw.drawImage(image, location);
  };

  const layoutRenderer: RendererMap = {
    p: renderPath,
    r: renderRect,
    c: renderCircle,
  };

  function renderHealthDisplay(
    healthDisplay: HealthDisplay,
    currentLocation: Point,
    pieceFrame: Rect
  ) {
    const padding = 4;
    const height = 6;
    const paddedHeight = height + padding;
    // Render Health display here.
    let topLeft = point(
      currentLocation.x,
      healthDisplay.position === Position.ABOVE
        ? currentLocation.y - paddedHeight
        : currentLocation.y + pieceFrame.h + padding
    );

    // const layoutData: LayoutData[] = arrayAtLength(
    //   healthDisplay.initial / 10
    // ).map((_, index) => {
    //   const health = healthDisplay.current - (index + 1) * 2;
    //   const fill = health > 1 ? colors.green : colors.transparent;
    //   return [
    //     "c",
    //     { x: index * 15, y: 0, diameter: 5 },
    //     fill,
    //     {
    //       width: 2,
    //       color: health >= 0 ? colors.green : colors.red,
    //     },
    //   ];
    // });
    const currentHealthWidth = Math.floor(
      pieceFrame.w * (healthDisplay.current / healthDisplay.initial)
    );
    const healthData: LayoutData[] = [
      [
        "r",
        { x: 0, y: 0, w: pieceFrame.w, h: height },
        colors.transparent,
        { width: 1, color: colors.green },
      ],
      ["r", { x: 0, y: 0, w: currentHealthWidth, h: height }, colors.green],
    ];
    renderLayout(healthData, topLeft);
  }

  function renderLayout(
    layout: LayoutData[],
    currentLocation: Point,
    colorOverride?: string
  ) {
    layout.forEach((layoutData) => {
      const renderer = layoutRenderer[layoutData[0]];
      if (!renderer) {
        console.error(
          "failed to render layout, is layoutData correctly formed?"
        );
        return;
      }
      renderer(layoutData, currentLocation, colorOverride);
    });
  }

  function render(
    layoutConfiguration: LayoutConfiguration,
    currentLocation: Point,
    config?: RenderingConfiguration
  ) {
    let preRendered: HTMLImageElement|null = null;
    const position = config?.directionOverride || config?.healthDisplay?.position;
    if (layoutConfiguration.preRendered && position) {
      preRendered = layoutConfiguration?.preRendered[position];
    }
    const setHealth = () => {
      if (config && config.healthDisplay) {
        renderHealthDisplay(
          config.healthDisplay,
          currentLocation,
          layoutConfiguration?.layout.frame
        );
      }
    };

    if (preRendered && preRendered instanceof HTMLImageElement) {
      renderImage(preRendered, currentLocation);
      setHealth();
      return;
    }
    if (config && config.showShadow) {
      renderLayout(
        layoutConfiguration.layout.layoutData,
        point(currentLocation.x, currentLocation.y + PIECE_SHADOW_OFFSET),
        "rgba(80, 80, 80, 0.1)"
      );
    }
    renderLayout(layoutConfiguration.layout.layoutData, currentLocation);
    setHealth();
  }

  return render;
}
