import { Rect, Circle, rect, Point, rectFunctions } from "./dimensions";

export interface Stroke {
  width: number;
  color: string;
}

export interface Draw {
  drawRect: (
    rect: Rect,
    fillColor?: string,
    stroke?: Stroke,
    translationPoint?: Point
  ) => void;
  drawCircle: (
    circle: Circle,
    fillColor?: string,
    stroke?: Stroke,
    translationPoint?: Point
  ) => void;
  drawText: (
    point: Point,
    text: string,
    font?: string,
    translationPoint?: Point
  ) => void;
  drawPath: (
    points: Point[],
    lineWidth?: number,
    strokeColor?: string,
    translation?: Point
  ) => void;
  clear: () => void;
  inFrame: (point: Point) => boolean;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  dimensions: Rect;
}

/**
 *
 *
 * @param {HTMLCanvasElement} canvas
 * @returns
 */
export default function canvasDrawing(canvas: HTMLCanvasElement) {
  const ratio = window.devicePixelRatio;
  const canvasHeight = window.innerHeight;
  const canvasWidth = window.innerWidth;

  // fill screen with canvas
  canvas.width = canvasWidth * ratio;
  canvas.height = canvasHeight * ratio;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  const edges = rect(0, 0, canvas.width / ratio, canvas.height / ratio);

  function translation(translatePoint?: Point) {
    return {
      translateX: (x) =>
        translatePoint ? Math.floor(x + translatePoint.x) : Math.floor(x),
      translateY: (y) =>
        translatePoint ? Math.floor(y + translatePoint.y) : Math.floor(y),
    };
  }

  function addStyle(fillColor?: string, stroke?: Stroke) {
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.stroke();
    }
  }

  function drawRect(
    rect: Rect,
    fillColor?: string,
    stroke?: Stroke,
    translationPoint?: Point
  ) {
    const tr = translation(translationPoint);
    ctx.beginPath();
    ctx.rect(tr.translateX(rect.x), tr.translateY(rect.y), rect.w, rect.h);
    addStyle(fillColor, stroke);
    ctx.closePath();
  }

  function drawCircle(
    circle: Circle,
    fillColor?: string,
    stroke?: Stroke,
    translationPoint?: Point
  ) {
    const tr = translation(translationPoint);
    ctx.beginPath();
    ctx.arc(
      tr.translateX(circle.x),
      tr.translateY(circle.y),
      circle.diameter,
      0,
      Math.PI * 2,
      false
    );
    addStyle(fillColor, stroke);
    ctx.closePath();
  }

  function drawText(
    point: Point,
    text: string,
    font?: string,
    translationPoint?: Point
  ) {
    const tr = translation(translationPoint);
    ctx.font = font || "50px serif";
    ctx.fillStyle = "#333";
    ctx.fillText(text, tr.translateX(point.x), tr.translateY(point.y));
    ctx.closePath();
  }

  function fill(color: string) {
    drawRect(edges, color);
  }

  function drawPath(
    points: Point[],
    lineWidth?: number,
    strokeColor?: string,
    translationPoint?: Point
  ) {
    const tr = translation(translationPoint);
    ctx.beginPath();
    ctx.moveTo(tr.translateX(points[0].x), tr.translateY(points[0].y));
    ctx.lineWidth = lineWidth || 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeColor || "#333";
    points.forEach((ps) => {
      ctx.lineTo(tr.translateX(ps.x), tr.translateY(ps.y));
    });
    ctx.stroke();
    ctx.closePath();
  }

  function clear() {
    ctx.clearRect(edges.x, edges.y, edges.w, edges.h);
  }

  function inFrame(point): boolean {
    return rectFunctions(edges).inFrame(point);
  }

  return {
    drawRect: drawRect,
    drawCircle: drawCircle,
    drawText: drawText,
    drawPath: drawPath,
    fill: fill,
    clear: clear,
    context: ctx,
    canvas: canvas,
    inFrame: inFrame,
    dimensions: edges,
  };
}
