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

export const sample = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export interface Sketch {
  preload(): void;
  setup(): void;
  windowResized(): void;
  draw(): void;
}

export const getSketch = (): (p: p5) => void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sketchBuilder: (p: p5) => Sketch = sample([
    (p: p5) => new Conway(p),
    (p: p5) => new Hex(p),
    (p: p5) => new Waves(p),
    (p: p5) => new Boxes(p),
    (p: p5) => new Phylotaxis(p),
    (p: p5) => new Hypercube(p),
    (p: p5) => new Grid(p),
    (p: p5) => new Boids(p),
  ]);

  return pauseableSketch(sketchBuilder);
}
