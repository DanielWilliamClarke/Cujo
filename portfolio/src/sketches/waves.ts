import p5 from "p5";
import { NoiseFunction3D, createNoise3D } from "simplex-noise";

import { Sketch } from "./index";

class HSLA {
  constructor(
    public h: number = 0,
    public s: number = 0,
    public b: number = 0,
    public a: number = 0
  ) {}
}

class Particle {
  public pastX: number = 0;
  public pastY: number = 0;

  constructor(
    public x: number = 0,
    public y: number = 0,
    public color: HSLA = new HSLA()
  ) {}

  init(
    hueBase: number,
    screenWidth: number,
    screenHeight: number,
    centerX: number,
    centerY: number
  ): void {
    this.x = this.pastX = screenWidth * Math.random();
    this.y = this.pastY = screenHeight * Math.random();
    this.color.h = Math.sin(this.x - centerX) * (180 / Math.PI) + 100;
    this.color.s = 100;
    this.color.b = 100;
    this.color.a = 0.95;
  }

  persistPosition(): void {
    this.pastX = this.x;
    this.pastY = this.y;
  }

  integratePosition(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }
}

class NoiseGenerator {
  constructor(private noise3D: NoiseFunction3D) {}

  getNoise(x: number, y: number, z: number): number {
    const octaves = 3;
    const fallout = 0.3;
    let amp = 1;
    let f = 1;
    let sum = 0;
    let i;

    for (i = 0; i < octaves; ++i) {
      amp *= fallout;
      sum += amp * (this.noise3D(x * f, y * f, z * f) + 1) * 0.5;
      f *= 2;
    }

    return sum;
  }

  refresh(noise3D: NoiseFunction3D) {
    this.noise3D = noise3D;
  }
}

export class Waves implements Sketch {
  private readonly totalParticles = 1500;
  private readonly particles: Particle[] = [];
  private screenWidth = 0;
  private screenHeight = 0;
  private centerX = 0;
  private centerY = 0;
  private hueBase = 0;

  private fluffOff = 0;
  private readonly fluffInc = 0.05;

  private zOff = 0;
  private readonly zInc = 0.001;

  private readonly clearIn = 20000;

  private readonly parameters = {
    base: 200,
    step: 9,
    bearing: 10,
  };

  constructor(
    private readonly p: p5,
    private readonly noiseGenerator: NoiseGenerator = new NoiseGenerator(
      createNoise3D()
    )
  ) {}

  preload(): void {}

  setup() {
    this.p.frameRate(60);
    this.p.colorMode(this.p.HSB, 100);

    this.p.createCanvas(window.innerWidth, window.innerHeight);
    this.p.background(0);

    this.screenWidth = this.p.width = window.innerWidth;
    this.screenHeight = this.p.height = window.innerHeight;
    this.centerX = this.screenWidth / 2;
    this.centerY = this.screenHeight / 2;

    for (let i = 0, len = this.totalParticles; i < len; i++) {
      const p = new Particle();
      p.init(
        this.hueBase,
        this.screenWidth,
        this.screenHeight,
        this.centerX,
        this.centerY
      );
      this.particles.push(p);
    }
  }

  windowResized() {
    this.p.resizeCanvas(window.innerWidth, window.innerHeight);
    this.screenWidth = this.p.width = window.innerWidth;
    this.screenHeight = this.p.height = window.innerHeight;
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight / 2;
    this.noiseGenerator.refresh(createNoise3D());
  }

  draw() {
    const elapsedTime = this.p.millis();
    const r = Math.abs(elapsedTime % this.clearIn);
    if (r <= 1000) {
      this.p.background(0, this.p.map(r, 0, 1000, 0, 255));
    }

    const fluff = this.p.constrain(
      this.p.map(this.p.sin(this.fluffOff), -1, 1, 0, 3),
      0.5,
      2.5
    );
    this.fluffOff += this.fluffInc;

    this.particles.forEach((particle: Particle): void => {
      particle.persistPosition();

      const angle =
        Math.PI *
        this.parameters.bearing *
        this.noiseGenerator.getNoise(
          (particle.x / this.parameters.base) * fluff,
          (particle.y / this.parameters.base) * fluff,
          this.zOff
        );

      particle.integratePosition(
        Math.cos(angle) * this.parameters.step,
        Math.sin(angle) * this.parameters.step
      );

      if (particle.color.a < 1) {
        particle.color.a += 0.03;
      }

      // draw pariticle
      this.p.fill(
        particle.color.h,
        particle.color.s,
        particle.color.b,
        particle.color.a
      );
      this.p.stroke(
        particle.color.h,
        particle.color.s,
        particle.color.b,
        particle.color.a
      );
      this.p.line(particle.pastX, particle.pastY, particle.x, particle.y);

      if (
        particle.x < 0 ||
        particle.x > window.innerWidth ||
        particle.y < 0 ||
        particle.y > window.innerHeight
      ) {
        particle.init(
          this.hueBase,
          this.screenWidth,
          this.screenHeight,
          this.centerX,
          this.centerY
        );
      }
    });

    this.zOff += this.zInc;
    this.hueBase += 0.1;
  }
}
