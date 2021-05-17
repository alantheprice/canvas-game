import { Point, Rect } from "../drawing/dimensions";
import { Direction } from "../drawing/direction.enum";
import { Layout, LayoutData, Renderer } from "../drawing/rendering";

export enum PieceMovement {
  keyboard,
  randomLinearLeftRight,
  scrollDown,
}

export interface Weapon {
  speed: number;
  power: number;
  layout: LayoutData[];
  preRendered?: HTMLImageElement;
  hitLayout: (frames: number) => LayoutData[];
}

export interface FireConfiguration {
  weapon: Weapon;
  location: Point;
  direction: Direction;
  team: string;
  hit?: {
    location: Point;
    framesShown: number;
  };
}

export interface LayoutConfiguration {
  preRendered?: HTMLImageElement;
  layout: Layout;
}

export interface PieceConfiguration extends LayoutConfiguration {
  team: string;
  health: number;
  speed: () => number;
  weapons: {
    locations: Point[];
    weapon: Weapon;
  }[];
  shootingPattern: "manual" | "ai";
  movementType: PieceMovement;
  pointingDirection: Direction;
  stayWithinFrame: boolean;
}

export type Fire = (
  weapon: Weapon,
  location: Point,
  direction?: Direction
) => void;

export interface Piece {
  render: () => void;
  shouldRender: () => boolean;
  hit: (point: Point, team: string) => boolean;
}

export interface Damage {
  initialHealth: number;
  healthRemaining: number;
}

export type PieceFactory = (
  config: PieceConfiguration,
  location: Point
) => Piece;
