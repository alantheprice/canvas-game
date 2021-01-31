import { PIECE_SHADOW_OFFSET } from "../constants";
import canvasDrawing from "./canvasDrawing";
import { point, rectFunctions } from "./dimensions";
import { createRenderer, Layout } from "./rendering";

const scratch = document.getElementById("scratch-pad") as HTMLCanvasElement;

const preRender = (layout: Layout) => {
  console.log("rendering");
  const frame = {
    ...layout.frame,
    h: layout.frame.h + PIECE_SHADOW_OFFSET,
  };
  const draw = canvasDrawing(scratch, frame);
  const renderer = createRenderer(draw);
  renderer(layout, point(0, 0), { showShadow: true });
  const dataUrl = draw.toDataUrl();
  draw.clear();
  const img = new Image();
  img.src = dataUrl;
  return img;
};

export default preRender;
