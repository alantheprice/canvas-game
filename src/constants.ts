// TODO: make many of these configurations configurable via settings

// Framerate should be adjusted based on what the device can support.
// TODO: this is an initial stub, which could scale down, but not back up again.
// It needs to be more intelligent before I put it into practice.
const REQUESTED_FRAMERATE = 60;
let currentFramerate = REQUESTED_FRAMERATE;
export const adjustFramerateForActual = (updatedFramerate: number) => {
  currentFramerate = updatedFramerate;
};
export const getFramerate = () => {
  return currentFramerate;
};

const MOVEMENT_DISTANCE_PER_SECOND = 400;
export const PIECE_SHADOW_OFFSET = 20;

export const getMovementFrameDistance = () =>
  distancePerFrame(MOVEMENT_DISTANCE_PER_SECOND);

export const getFiringThreshold = () => getFramerate() / 8;

export function distancePerFrame(speed: number) {
  return speed / getFramerate();
}
