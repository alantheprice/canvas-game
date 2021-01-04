export interface Point {
  x: number;
  y: number;
}

export interface PointFunctions {
  toRect: (width: number, height: number) => Rect;
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
  return {
    getPoint: function () {
      return point(rectangle.x, rectangle.y);
    },
    setPoint: function (point: Point) {
      rectangle.x = point.x;
      rectangle.y = point.y;
    },
    shrink: function (num: number) {
      return rect(
        rectangle.x + num,
        rectangle.y + num,
        rectangle.w - num * 2,
        rectangle.h - num * 2
      );
    },
    expand: function (num: number) {
      return rect(
        rectangle.x - num,
        rectangle.y - num,
        rectangle.w + num * 2,
        rectangle.h + num * 2
      );
    },
    circle: function (diameter?: number) {
      if (!diameter) {
        diameter = Math.min(rectangle.w, rectangle.h) / 2;
      }
      return circle(
        rectangle.x + rectangle.w / 2,
        rectangle.y + rectangle.h / 2,
        diameter
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
  };
}

export function circle(x: number, y: number, width: number): Circle {
  return {
    x: x,
    y: y,
    diameter: width,
  };
}
