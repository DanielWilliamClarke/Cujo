import p5 from "p5";
import { Vector4D } from "./matrix_utils";
import { Ease } from "./easing";
import { Sketch } from ".";

class GridUtil {
  static getSquareGrid(num: number, scale: number): Vector4D[] {
    const vectors: [number, number][] = [];
    for (let x = -num; x <= num; x++) {
      for (let y = -num; y <= num; y++) {
        vectors.push([x, y]);
      }
    }

    return vectors.map(([x, y], i): Vector4D => {
      const d = Math.sqrt(x * x + y * y);
      return new Vector4D(x * scale, y * scale, d, i);
    });
  }

  static getPolygonPoints(num: number, poly: number): p5.Vector[] {
    const points: p5.Vector[] = [];
    for (let j = 0; j < poly; j++) {
      for (let i = 0; i < num / poly; i++) {
        const x = Math.cos((j / poly) * Math.PI * 2);
        const y = Math.sin((j / poly) * Math.PI * 2);

        let nx, ny;
        if (j === poly - 1) {
          nx = Math.cos(0);
          ny = Math.sin(0);
        } else {
          nx = Math.cos(((j + 1) / poly) * Math.PI * 2);
          ny = Math.sin(((j + 1) / poly) * Math.PI * 2);
        }

        const sx = x + (nx - x) * (i / (num / poly));
        const sy = y + (ny - y) * (i / (num / poly));

        const v = new p5.Vector();
        v.set(sx, sy);
        points.push(v);
      }
    }
    return points;
  }
}

export class Grid implements Sketch {
  private screenWidth = 0;
  private screenHeight = 0;

  private timeScale = 0.005;
  private t = 0;

  private scale = 150;
  private num = 20;
  private lineWidth = 15;

  private shapes: Vector4D[] = [];
  private hexPoints: p5.Vector[] = [];
  private maxDist = 0;
  private size = 0;

  private ctx: any;

  constructor(private readonly p: p5) {}

  preload(): void {}

  setup() {
    this.p.frameRate(60);
    this.p.colorMode(this.p.HSB, 100);
    this.p.createCanvas(window.innerWidth, window.innerHeight);

    this.screenWidth = this.p.width = window.innerWidth;
    this.screenHeight = this.p.height = window.innerHeight;

    const canvas = document.getElementById("defaultCanvas0") as any;
    this.ctx = canvas.getContext("2d");

    this.shapes = GridUtil.getSquareGrid(this.num, this.scale);
    this.hexPoints = GridUtil.getPolygonPoints(360, 4);

    this.maxDist = this.shapes.reduce(
      (max: number, { z }: Vector4D) => Math.max(z, max),
      0
    );
    this.size = Math.floor((this.scale * Math.sqrt(2)) / 2);
  }

  windowResized(): void {
    this.setup();
  }

  draw() {
    this.t += this.timeScale;

    this.ctx.save();
    this.ctx.fillStyle = `rgba(0,0,0,0.05)`;
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

    this.ctx.translate(this.screenWidth / 2, this.screenHeight / 2);

    this.ctx.lineCap = "sqaure";

    this.shapes.forEach((shape: Vector4D): void => {
      let scaledT = Ease.easeInOutQuad(
        Math.abs((this.t - shape.z / this.maxDist) % 1)
      );

      const x = shape.x;
      const y = shape.y;

      this.ctx.lineWidth = this.lineWidth / shape.z;

      this.ctx.save();

      this.ctx.translate(x, y);
      this.ctx.rotate(Math.PI / 2);
      this.ctx.translate(-x, -y);

      let start = Math.floor(
        this.p.map(scaledT, 0, 1, 0, this.hexPoints.length - 1)
      );
      let end = Math.ceil(
        this.p.map(scaledT, 0, 1, start + 1, this.hexPoints.length - 1)
      );

      this.ctx.strokeStyle = `hsl(${360 * scaledT}, 80%, 60%)`;

      this.ctx.translate(x, y);
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.hexPoints[start].x * this.size,
        this.hexPoints[start].y * this.size
      );

      Array(end - start + 1)
        .fill(0)
        .map((_, idx) => start + idx)
        .forEach((i: number) => {
          const index = end === this.hexPoints.length - 1 ? 0 : i;
          this.ctx.lineTo(
            this.hexPoints[index].x * this.size,
            this.hexPoints[index].y * this.size
          );
        });

      this.ctx.stroke();
      this.ctx.restore();
    });

    this.ctx.restore();
  }
}
