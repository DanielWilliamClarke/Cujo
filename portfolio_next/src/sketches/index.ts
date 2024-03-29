import p5 from 'p5';
import weighted from 'weighted';

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
import { Sealife } from './sealife';
import { Waves } from './waves';

export const sample = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export interface Sketch {
  preload: () => void;
  setup: () => void;
  windowResized: () => void;
  draw: () => void;
}

type SketchBuilder = (p: p5) => Sketch;

type WeightedSketchBuilder = {
  builder: SketchBuilder;
  weight: number;
};

export const getSketch = (cv: CV, currentRole: Work): ((p: p5) => void) => {
  const sketches: WeightedSketchBuilder[] = [
    { builder: (p: p5) => new Conway(p), weight: 0.22 },
    { builder: (p: p5) => new Sealife(p), weight: 0.21 },
    { builder: (p: p5) => new Hypercube(p), weight: 0.21 },
    { builder: (p: p5) => new Grid(p), weight: 0.21 },
    { builder: (p: p5) => new Phylotaxis(p), weight: 0.05 },
    { builder: (p: p5) => new Hex(p), weight: 0.05 },
    { builder: (p: p5) => new Boids(p, cv, currentRole), weight: 0.05 },
    { builder: (p: p5) => new Boxes(p), weight: 0.2 },
    { builder: (p: p5) => new Waves(p), weight: 0.01 },
  ];

  const weights = sketches.map(({ weight }) => weight);
  const builders = sketches.map(({ builder }) => builder);

  return pauseableSketch(weighted.select(builders, weights));
};
