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
  hitLayout: LayoutData[];
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

export interface PieceConfiguration {
  team: string;
  health: number;
  speed: number;
  layout: Layout;
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
  edges: Rect,
  renderer: Renderer,
  location: Point,
  fire: (fireConfig: FireConfiguration) => void
) => (config: PieceConfiguration) => Piece;
