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
    translationPoint?: Point
  ) => void;
  drawImage: (image: HTMLImageElement, translationPoint?: Point) => void;
  clear: () => void;
  inFrame: (point: Point) => boolean;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  dimensions: Rect;
  fill: (color: string) => void;
  toDataUrl: () => string;
}

/**
 *
 *
 * @param {HTMLCanvasElement} canvas
 * @returns
 */
export default function canvasDrawing(
  canvas: HTMLCanvasElement,
  dimensions?: Rect
) {
  const canvasHeight = dimensions ? dimensions.h : window.innerHeight;
  const canvasWidth = dimensions ? dimensions.w : window.innerWidth;
  const ratio = 1; //window.devicePixelRatio;

  // fill screen with canvas
  canvas.width = canvasWidth * ratio;
  canvas.height = canvasHeight * ratio;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  const ctx = canvas.getContext("2d");
  // ctx.scale(ratio, ratio);
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

  function drawImage(image: HTMLImageElement, translationPoint?: Point) {
    const tr = translation(translationPoint);
    const frame = rect(0, 0, image.naturalWidth, image.naturalHeight);
    const scaledFrame = rectFunctions(frame).scale(1 / ratio);
    ctx.drawImage(
      image,
      tr.translateX(0),
      tr.translateY(0),
      scaledFrame.w,
      scaledFrame.h
    );
  }

  function clear() {
    ctx.clearRect(edges.x, edges.y, edges.w, edges.h);
  }

  function inFrame(point): boolean {
    return rectFunctions(edges).inFrame(point);
  }

  function toDataUrl() {
    return canvas.toDataURL("image/png");
  }

  return {
    drawRect: drawRect,
    drawCircle: drawCircle,
    drawText: drawText,
    drawPath: drawPath,
    drawImage: drawImage,
    fill: fill,
    clear: clear,
    context: ctx,
    canvas: canvas,
    inFrame: inFrame,
    dimensions: edges,
    toDataUrl: toDataUrl,
  } as Draw;
}
