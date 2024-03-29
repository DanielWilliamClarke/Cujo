import p5 from 'p5';

import { Sketch, sample } from '.';

export class Phylotaxis implements Sketch {
  private n = 0;
  private readonly c = 12;
  private start = 0;
  private growth: boolean = true;

  private readonly magicAngle = 137.6;
  private readonly maxParticles = 3000;
  private readonly increment = 5;

  private selectedGenerator!: (i: number) => number;
  private readonly magicAngleGenerators: Array<(i: number) => number> = [
    (input: number): number => {
      let ma = this.p.sin(input);
      ma = this.p.map(ma, -1, 1, 137.3, 137.6);
      return ma;
    },
    (): number => 137.6,
    (): number => 137.5,
    (): number => 180,
    (): number => 99.5,
  ];

  constructor(private readonly p: p5) {}

  preload(): void {}

  setup() {
    this.p.frameRate(144);
    this.p.colorMode(this.p.HSB);
    this.p.angleMode(this.p.DEGREES);
    this.p.blendMode(this.p.DIFFERENCE);
    this.p.createCanvas(window.innerWidth, window.innerHeight, this.p.WEBGL);
    this.p.perspective();
    this.selectedGenerator = sample(this.magicAngleGenerators);
  }

  windowResized() {
    this.p.resizeCanvas(window.innerWidth, window.innerHeight);
  }

  draw() {
    this.p.background(0);
    // this.p.orbitControl();

    for (let i = 0; i < this.n; i++) {
      // vary magic angle
      const ma = this.selectedGenerator(i);

      // Calculate angle and radis
      const a = i * ma;
      const r = this.c * this.p.sqrt(i);
      // const x =  r * p.cos(a);
      // const y = r * p.sin(a);

      // Polar to cartesian converstion with some wiggle
      const lerpX1 = r * this.p.cos(a);
      const lerpX2 = r * this.p.cos((i + 2) * this.magicAngle);
      const lerpY1 = r * this.p.sin(a);
      const lerpY2 = r * this.p.sin((i + 2) * this.magicAngle);

      const z = r * this.p.cos(a);
      const x = this.p.lerp(lerpX1, lerpX2, this.p.sin(this.p.millis() / 100));
      const y = this.p.lerp(lerpY1, lerpY2, this.p.cos(this.p.millis() / 100));

      // Calculate color hue
      let hu = this.p.sin(this.start - i * 0.5);
      hu = this.p.map(hu, -1, 1, 0, 360);

      // Here I want to try to keep particle max size consistent across multiple device widths
      const maxSize = this.p.map(this.p.width / 2, 375, 1440, 5, 10);
      // Calcualte particle size based on radius
      const d = this.p.map(r, 0, this.p.height / 2, 0.5, maxSize);

      // Draw
      this.p.push();
      this.p.ambientLight(hu, 150, 255);
      this.p.fill(hu, 150, 255);
      this.p.noStroke();
      this.p.translate(x, y, z);

      this.p.rotateX(35.264);
      this.p.rotateY(-this.p.QUARTER_PI);

      this.p.box(d, d, d);
      this.p.pop();
    }

    // Toggle growth / skrinking
    if (this.n < 0 || this.n >= this.maxParticles) {
      this.growth = !this.growth;
    }
    this.n += this.growth ? this.increment : -this.increment;
    if (this.n <= 0) {
      this.selectedGenerator = sample(this.magicAngleGenerators);
    }

    this.start += 5;
  }
}
