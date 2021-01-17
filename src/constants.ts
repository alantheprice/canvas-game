// TODO: make many of these configurations configurable via settings

// Framerate should be adjusted based on what the device can support.
// TODO: this is an initial stub, which could scale down, but not back up again.
// It needs to be more intelligent before I put it into practice.
const REQUESTED_FRAMERATE = 65;
let currentFramerate = REQUESTED_FRAMERATE;
const adjustFramerateForActual = (updatedFramerate: number) => {
  currentFramerate = Math.min(updatedFramerate, REQUESTED_FRAMERATE);
};
const getFramerate = () => {
  return currentFramerate;
};

export const FRAMERATE = 65;
export const MILLISECONDS_BETWEEN_FRAMES = Math.floor(1000 / FRAMERATE);
const MOVEMENT_DISTANCE_PER_SECOND = 400;
const WEAPON_DISTANCE_PER_SECOND = 500;
export const PIECE_SHADOW_OFFSET = 20;
export const MOVEMENT_FRAME_DISTANCE = distancePerFrame(
  MOVEMENT_DISTANCE_PER_SECOND
);

export const FRAMES_PER_FIRING = FRAMERATE / 8;

export const WEAPON_FRAME_DISTANCE = distancePerFrame(
  WEAPON_DISTANCE_PER_SECOND
);

export function distancePerFrame(speed: number) {
  return speed / FRAMERATE;
}
