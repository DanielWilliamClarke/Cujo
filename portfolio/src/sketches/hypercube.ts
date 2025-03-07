import p5 from "p5";

import { Sketch, sample } from "./index";
import { MatrixUtils, Vector4D } from "./matrix_utils";

type RotationGenerator = (angle: number) => number[][];

export class Hypercube implements Sketch {
  private readonly matrixUtils = new MatrixUtils(this.p);
  private readonly distance = 2;

  private readonly points: Vector4D[] = [];
  private angle: number = 0;
  private colorAngle: number = 0;

  private canvas: any;

  private readonly generators3d: RotationGenerator[] = [
    (angle: number) => [
      // XY
      [this.p.cos(angle), -this.p.sin(angle), 0, 0],
      [this.p.sin(angle), this.p.cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ],

    (angle: number) => [
      // XZ
      [this.p.cos(angle), 0, -this.p.sin(angle), 0],
      [0, 1, 0, 0],
      [this.p.sin(angle), 0, this.p.cos(angle), 0],
      [0, 0, 0, 1],
    ],

    (angle: number) => [
      // YZ
      [1, 0, 0, 0],
      [0, this.p.cos(angle), -this.p.sin(angle), 0],
      [0, this.p.sin(angle), this.p.cos(angle), 0],
      [0, 0, 0, 1],
    ],
  ];

  private readonly generators4d: RotationGenerator[] = [
    (angle: number) => [
      // XW
      [this.p.cos(angle), 0, 0, -this.p.sin(angle)],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [this.p.sin(angle), 0, 0, this.p.cos(angle)],
    ],

    (angle: number) => [
      // YW
      [1, 0, 0, 0],
      [0, this.p.cos(angle), 0, -this.p.sin(angle)],
      [0, 0, 1, 0],
      [0, this.p.sin(angle), 0, this.p.cos(angle)],
    ],

    (angle: number) => [
      // ZW
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, this.p.cos(angle), -this.p.sin(angle)],
      [0, 0, this.p.sin(angle), this.p.cos(angle)],
    ],
  ];

  private currentRotations: RotationGenerator[] = [
    this.generators4d[1],
    // sample(this.generators3d),
    // sample(this.generators3d),
    // sample(this.generators4d),
    // sample(this.generators4d),
  ];

  constructor(private readonly p: p5) {}

  preload(): void {}

  setup() {
    const renderer: any = this.p.createCanvas(
      this.p.windowWidth,
      this.p.windowHeight,
      this.p.WEBGL
    );
    renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);

    this.p.colorMode(this.p.HSB);
    this.p.ortho(
      -window.innerWidth,
      window.innerWidth,
      window.innerHeight,
      -window.innerHeight,
      -1000,
      10000
    );

    // transparency ordering workaround
    this.canvas = document.getElementById("defaultCanvas0") as any;

    // Generate 4D points
    for (let i = 0; i < 16; i++) {
      const x = i & 1 ? -1 : 1;
      const y = i & 2 ? -1 : 1;
      const z = i & 4 ? -1 : 1;
      const w = i & 8 ? -1 : 1;
      this.points.push(new Vector4D(x, y, z, w));
    }
  }

  windowResized() {
    this.p.resizeCanvas(window.innerWidth, window.innerHeight);
    this.p.ortho(
      -window.innerWidth,
      window.innerWidth,
      window.innerHeight,
      -window.innerHeight,
      -1000,
      10000
    );
  }

  draw() {
    this.p.background(0);
    this.p.rotateX(35.264);
    this.p.rotateY(-this.p.QUARTER_PI);

    // Rotate and Project 4D Points
    const projected3d: p5.Vector[] = this.points.map(
      (point: Vector4D): p5.Vector => {
        // Rotate point
        // https://math.stackexchange.com/questions/1402362/rotation-in-4d
        const rotatedPoint = this.currentRotations
          .map((generator: RotationGenerator) => generator(this.angle))
          .reduce(
            (point: Vector4D, rotation: number[][]): Vector4D =>
              this.matrixUtils.Matmul(rotation, point) as Vector4D,
            point
          );

        // Project point
        const w = 1 / (this.distance - rotatedPoint.w);
        const projection = [
          [w, 0, 0, 0],
          [0, w, 0, 0],
          [0, 0, w, 0],
        ];
        const projected = this.matrixUtils.Matmul(
          projection,
          rotatedPoint
        ) as Vector4D;
        return projected.multiply(500).To3D(this.p);
      }
    );

    // Draw each cube
    [
      projected3d.slice(0, 8),
      projected3d.slice(8),
      [...projected3d.slice(0, 4), ...projected3d.slice(8, 12)],
      [...projected3d.slice(4, 8), ...projected3d.slice(12)],
      [...this.getEvenPoints(projected3d, 0, 16)],
      [...this.getEvenPoints(projected3d, 0, 16, 1)],
      [
        ...this.getEvenPoints(projected3d, 0, 16, 0, 4),
        ...this.getEvenPoints(projected3d, 0, 16, 1, 4),
      ],
      [
        ...this.getEvenPoints(projected3d, 0, 16, 2, 4),
        ...this.getEvenPoints(projected3d, 0, 16, 3, 4),
      ],
    ].forEach((cube: p5.Vector[], index: number): void =>
      this.drawCube(
        cube,
        this.p.map(this.p.sin(this.colorAngle + index), -1, 1, 0, 360)
      )
    );

    this.angle += 0.02;
    this.colorAngle += 0.05;
  }

  private readonly drawSquare = (...points: p5.Vector[]) => {
    this.p.beginShape();
    for (const point of points) this.p.vertex(point.x, point.y, point.z);
    this.p.endShape(this.p.CLOSE);
  };

  private readonly drawCube = (points: p5.Vector[], hue: number): void => {
    this.p.fill(hue, hue, hue, 0.01);
    this.p.stroke(hue, 100, 100);
    this.p.strokeWeight(5);

    this.drawSquare(points[0], points[1], points[3], points[2]);
    this.drawSquare(points[0], points[1], points[5], points[4]);
    this.drawSquare(points[4], points[5], points[7], points[6]);
    this.drawSquare(points[2], points[3], points[7], points[6]);
    this.drawSquare(points[1], points[3], points[7], points[5]);
    this.drawSquare(points[0], points[2], points[6], points[4]);
  };

  private readonly getEvenPoints = (
    points: p5.Vector[],
    start: number,
    end: number,
    offset: number = 0,
    step: number = 2
  ) => {
    const result = [];
    for (let i = start; i < end; i += step) {
      result.push(points[i + offset]);
    }
    return result;
  };
}
