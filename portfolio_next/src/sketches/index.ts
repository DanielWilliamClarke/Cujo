import p5 from 'p5';
import { detect } from 'detect-browser';

import { CV, Work } from '../model/CVModel';
// import { conway3D } from "./conway_3d"
import { Boids } from './boids';
import { Boxes } from './boxes';
import { Conway } from './conway';
import { Grid } from './grid';
import { Hex } from './hex';
import { Hypercube } from './hypercube';
import { pauseableSketch } from './pauseable_sketch';
import { Phylotaxis } from './phylotaxis';
import { Waves } from './waves';

export const sample = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export interface Sketch {
  preload: () => void
  setup: () => void
  windowResized: () => void
  draw: () => void
}

type SketchBuilder = (p: p5) => Sketch;

export const getSketch = (cv: CV, currentRole: Work): (p: p5) => void => {
  const sketches: SketchBuilder[] = [
    (p: p5) => new Conway(p),
    // (p: p5) => new Hex(p),
    // (p: p5) => new Waves(p),
    // (p: p5) => new Phylotaxis(p),
    // (p: p5) => new Hypercube(p),
    // (p: p5) => new Grid(p),
    // (p: p5) => new Boids(p, cv, currentRole)
  ];

  // Boxes is super slow on Safari
  const browser = detect();
  if (browser?.name !== 'safari') {
    sketches.push((p: p5) => new Boxes(p));
  }

  return pauseableSketch(sample(sketches));
};
