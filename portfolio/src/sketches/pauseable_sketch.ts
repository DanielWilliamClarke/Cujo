import p5 from "p5";
import { Sketch } from ".";

export function pauseableSketch(
  sketchBuilder: (p: p5) => Sketch
): (p: p5) => void {
  return function (p: p5) {
    const sketch = sketchBuilder(p);
    let isPaused = false;

    p.preload = () => sketch.preload();

    p.setup = (): void => {
      window.addEventListener("scroll", listenScrollEvent);
      sketch.setup();
    };

    p.windowResized = (): void => sketch.windowResized();

    p.draw = (): void => {
      if (!isPaused) {
        sketch.draw();
      }
    };

    const listenScrollEvent = () => {
      isPaused = window.scrollY > window.innerHeight;
    };
  };
}
