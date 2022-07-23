import p5 from "p5";
// import { conway3D } from "./conway_3d"
import { Boids } from "./boids";
import { Boxes } from "./boxes";
import { Conway } from "./conway";
import { Grid } from "./grid";
import { Hex } from "./hex";
import { Hypercube } from "./hypercube";
import { pauseableSketch } from "./pauseable_sketch";
import { Phylotaxis } from "./phylotaxis";
import { Waves } from "./waves";

declare global {
  interface Array<T> {
    sample(): T;
  }
}

if (!Array.prototype.sample) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.sample = function (): any {
    return this[Math.floor(Math.random() * this.length)];
  };
}

export interface Sketch {
  preload(): void;
  setup(): void;
  windowResized(): void;
  draw(): void;
}

export const getSketch = (): (p: p5) => void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sketchBuilder: (p: p5) => Sketch = [
    (p: p5) => new Conway(p),
    (p: p5) => new Hex(p),
    (p: p5) => new Waves(p),
    (p: p5) => new Boxes(p),
    (p: p5) => new Phylotaxis(p),
    (p: p5) => new Hypercube(p),
    (p: p5) => new Grid(p),
    (p: p5) => new Boids(p),
  ].sample();

  return pauseableSketch(sketchBuilder);
}
