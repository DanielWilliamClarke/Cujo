import p5 from "p5";
import { Sketch } from ".";

export function pauseableSketch(
  sketchBuilder: (p: p5) => Sketch
): (p: p5) => void {
  return (p: p5): void => {
    const sketch = sketchBuilder(p);
    let isPaused = false;

    window.addEventListener(
      "scroll",
      () => (isPaused = window.scrollY > window.innerHeight)
    );

    p.preload = () => sketch.preload();

    p.setup = () => sketch.setup();

    p.windowResized = () => sketch.windowResized();

    p.draw = () => !isPaused && sketch.draw();
  };
}
