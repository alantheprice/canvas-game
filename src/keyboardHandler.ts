const handlers = [];

export const KEY_MAP = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  " ": "fire",
};

export type PressType = "keydown" | "keyup" | "keypress";

export type KeyHandler = (pressType: PressType, ev: KeyboardEvent) => void;

function setup() {
  window.addEventListener("keydown", (ev) => {
    handlers.forEach((handle) => {
      handle("keydown", ev);
    });
  });
  window.addEventListener("keyup", (ev) => {
    handlers.forEach((handle) => {
      handle("keyup", ev);
    });
  });
  window.addEventListener("keypress", (ev) => {
    handlers.forEach((handle) => {
      handle("keypress", ev);
    });
  });
}

export function subscribe(handler: KeyHandler) {
  handlers.push(handler);
  return () => {
    const handleIndex = handlers.indexOf(handler);
    handlers.splice(handleIndex, 1);
  };
}

setup();
