import p5 from "p5";
import { Sketch } from ".";
import { Ease } from "./easing";

export class Boxes implements Sketch {
  private readonly minW: number = 32;
  private readonly maxW: number = 64;
  private readonly minH: number = 30;
  private readonly maxH: number = 360;
  private readonly padding: number = 50;

  private readonly size: number = 1000;
  private readonly halfSize: number = 1000 / 2;

  private ma: number = 0;
  private yAngle: number = -this.p.QUARTER_PI;
  private angle: number = 0;
  private colorAngle: number = 0;
  private maxD: number = 0;

  private opacity: number = 0;
  private opacityProgress: number = 0;

  constructor(private readonly p: p5) {}

  preload(): void {}

  setup() {
    this.p.frameRate(60);
    this.p.createCanvas(window.innerWidth, window.innerHeight, this.p.WEBGL);
    this.p.colorMode(this.p.HSB);
    this.p.smooth();
    this.p.noStroke();

    this.ma = -this.p.atan(1 / this.p.sqrt(2));
    this.maxD = this.p.dist(0, 0, this.maxH, this.maxH);
    this.p.perspective();
  }

  windowResized() {
    this.p.resizeCanvas(window.innerWidth, window.innerHeight);
  }

  draw() {
    this.p.background(0);
    // this.p.orbitControl();
    // this.p.lights();
    this.p.rotateX(this.ma);
    this.p.rotateY((this.yAngle += 0.001));

    const locX = this.p.mouseX - this.p.height / 2;
    const locY = this.p.mouseY - this.p.width / 2;
    this.p.ambientLight(50);
    this.p.pointLight(0, 0, 100, locX, locY, 255);

    for (let z = this.padding; z < this.size - this.padding; z += this.maxW) {
      for (let x = this.padding; x < this.size - this.padding; x += this.maxW) {
        this.p.push();

        const d = this.p.dist(x, z, this.halfSize, this.halfSize);
        const offset = this.p.map(d, 0, this.maxD, -this.p.PI, this.p.PI);
        const a = this.angle + offset;
        const h = this.p.floor(
          this.p.map(this.p.sin(a), -1, 1, this.minH, this.maxH),
        );
        const w = this.p.floor(
          this.p.map(this.p.sin(a), -1, 1, this.minW, this.maxW),
        );

        const c = this.colorAngle + offset;
        const hue = this.p.floor(this.p.map(this.p.sin(c), -1, 1, 0, 360));
        const brightness = this.p.floor(
          this.p.map(this.p.sin(c), -1, 1, 75, 90),
        );

        this.p.ambientMaterial(hue, 50, brightness);
        this.p.fill(hue, 60, brightness, this.opacity);
        this.p.translate(x - this.halfSize, 0, z - this.halfSize);
        this.p.box(w, h, w);
        this.p.pop();
      }
    }

    this.angle -= 0.01;
    this.colorAngle -= 0.005;

    // easeOutCubic
    this.opacityProgress += 0.01;
    this.opacity = Ease.easeInOutCubic(this.opacityProgress);
  }
}
