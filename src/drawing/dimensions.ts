export interface Point {
  x: number;
  y: number;
}

export interface PointFunctions {
  toRect: (width: number, height: number) => Rect;
  translate: (point: Point) => Point;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface RectFunctions {
  shrink: (num: number) => Rect;
  expand: (num: number) => Rect;
  circle: (diameter?: number) => Circle;
  getPoint: () => Point;
  setPoint: (point: Point) => void;
  inFrame: (point: Point) => boolean;
}

export interface Circle {
  x: number;
  y: number;
  diameter: number;
}

/**
 * Creates a rect location and dimensions
 *
 */
export function rect(
  x: number,
  y: number,
  width: number,
  height?: number
): Rect {
  return {
    x: x,
    y: y,
    w: width,
    h: height || width,
  };
}

export function rectFunctions(rectangle: Rect) {
  const r = rectangle;
  return {
    getPoint: function () {
      return point(r.x, r.y);
    },
    setPoint: function (point: Point) {
      r.x = point.x;
      r.y = point.y;
    },
    shrink: function (num: number) {
      return rect(r.x + num, r.y + num, r.w - num * 2, r.h - num * 2);
    },
    expand: function (num: number) {
      return rect(r.x - num, r.y - num, r.w + num * 2, r.h + num * 2);
    },
    circle: function (diameter?: number) {
      if (!diameter) {
        diameter = Math.min(r.w, r.h) / 2;
      }
      return circle(r.x + r.w / 2, r.y + r.h / 2, diameter);
    },
    inFrame: function (point: Point): boolean {
      return (
        point.x >= r.x &&
        point.y >= r.y &&
        point.y <= r.y + r.h &&
        point.x <= r.x + r.w
      );
    },
  };
}

export function point(x: number, y: number): Point {
  return {
    x: x,
    y: y,
  };
}

export function pointFunctions(p: Point): PointFunctions {
  return {
    toRect: function (width: number, height: number) {
      return rect(p.x, p.y, width, height);
    },
    translate: function (translation: Point) {
      return point(translation.x + p.x, translation.y + p.y);
    },
  };
}

export function circle(x: number, y: number, width: number): Circle {
  return {
    x: x,
    y: y,
    diameter: width,
  };
}
