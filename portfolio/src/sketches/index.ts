import { hex } from "./hex";
import { waves } from "./waves";
import { boxes } from "./boxes";
import { phylotaxis } from "./phylotaxis";
import { hypercube } from "./hypercube";
import { grid } from "./grid";
import { conway } from "./conway"
// import { conway3D } from "./conway_3d"
import { boids } from "./boids";
import p5 from "p5";

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

export function getSketch (): (p: p5) => void {
  return [
    conway,
    // conway3D,
    hex,
    waves,
    boxes,
    phylotaxis,
    hypercube,
    grid,
    boids
  ].sample()
}