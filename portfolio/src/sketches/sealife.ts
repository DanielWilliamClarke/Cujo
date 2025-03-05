import p5 from 'p5';

import { Sketch } from './index';

// Adapted from https://codepen.io/atzedent/pen/qByYwNd
// Integrated with p5js using https://www.youtube.com/watch?v=r5YkU5Xu4_E

export class Sealife implements Sketch {
  private shader!: p5.Shader;
  private screen!: p5.Graphics;
  private xAngle = 0;
  private yAngle = 0;

  constructor(private readonly p: p5) {}

  preload() {
    this.shader = this.p.loadShader(
      'shaders/sealife.vert',
      'shaders/sealife.frag',
    );
  }

  setup() {
    this.p.frameRate(60);
    this.p.pixelDensity(1);
    this.p.createCanvas(window.innerWidth, window.innerHeight, this.p.WEBGL);
    this.screen = this.p.createGraphics(window.innerWidth, window.innerHeight);

    this.p.shader(this.shader);
  }

  windowResized() {
    this.screen.resizeCanvas(window.innerWidth, window.innerHeight);
    this.p.resizeCanvas(window.innerWidth, window.innerHeight);
  }

  draw() {
    this.screen.background(0);

    const t = this.p.millis() / 1000;
    const touches = [
      this.p.sin(this.xAngle) * 1000,
      this.p.sin(this.yAngle) * 1000,
    ];
    const resolution = [this.p.width, this.p.height];

    this.shader.setUniform('time', t);
    this.shader.setUniform('touch', touches);
    this.shader.setUniform('pointerCount', 0);
    this.shader.setUniform('resolution', resolution);

    this.p.rect(
      -this.p.width / 2,
      -this.p.height / 2,
      this.p.width,
      this.p.height,
    );

    this.xAngle += 0.001;
    this.yAngle += 0.002;
  }
}
