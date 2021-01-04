// TODO: make these configurable via settings

export const FRAMERATE = 90;
export const MILLISECONDS_BETWEEN_FRAMES = Math.floor(1000 / FRAMERATE);
const MOVEMENT_DISTANCE_PER_SECOND = 400;
const WEAPON_DISTANCE_PER_SECOND = 500;
export const MOVEMENT_FRAME_DISTANCE = distancePerFrame(
  MOVEMENT_DISTANCE_PER_SECOND
);
export const WEAPON_FRAME_DISTANCE = distancePerFrame(
  WEAPON_DISTANCE_PER_SECOND
);

export function distancePerFrame(speed: number) {
  return speed / FRAMERATE;
}
