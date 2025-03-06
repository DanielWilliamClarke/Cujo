import p5 from "p5";
import { Sketch } from "@/sketches/index";

class HSLA {
  constructor(
    public h: number = 255,
    public s: number = 255,
    public b: number = 255,
    public a: number = 255
  ) {}
}
class Cell {
  constructor(public color: HSLA = new HSLA(), public phantom?: boolean) {}
}

type Grid = Array<Array<Array<Cell | undefined>>>;

type Neighbours = {
  sum: number;
  colors: HSLA[];
};

export class Conway3D implements Sketch {
  private parameters = {
    chance: 0.0095,
    resolution: 10,
    cubeSize: window.innerHeight / 2,
    spin: 0.05,
  };

  private cubeSize = 0;
  private resolution = 0;
  private boxSize = 0;
  private rows = 0;
  private columns = 0;
  private depths = 0;
  private grid: Grid = [];

  private yAngle: number;

  private B = [5];
  private S = [4, 5];

  constructor(private readonly p: p5) {
    this.yAngle = -this.p.QUARTER_PI;
  }

  preload() {}

  private loop() {
    this.p.frameRate(12);
    this.p.colorMode(this.p.HSL, 360, 100, 100);
    this.p.createCanvas(window.innerWidth, window.innerHeight, this.p.WEBGL);
    this.p.smooth();
    this.p.perspective();

    this.cubeSize = this.parameters.cubeSize;
    this.resolution = this.parameters.resolution;
    this.boxSize = this.resolution - 1;

    this.columns = Math.ceil(this.cubeSize / this.resolution);
    this.rows = Math.ceil(this.cubeSize / this.resolution);
    this.depths = Math.ceil(this.cubeSize / this.resolution);
    this.grid = this.makeGrid(this.columns, this.rows, this.depths, 0.07);
  }

  reset() {
    this.loop();
  }

  setup() {
    this.loop();
  }

  windowResized() {
    this.loop();
  }

  draw() {
    // Reset
    this.p.background(0);
    // this.p.orbitControl();

    // this.p.rotateX(35.264);
    this.p.rotateY((this.yAngle += this.parameters.spin));

    const locX = this.p.mouseX - this.p.height / 2;
    const locY = this.p.mouseY - this.p.width / 2;
    this.p.ambientLight(0, 0, 75);
    this.p.pointLight(0, 0, 100, locX, locY, 255);

    if (this.allDead()) {
      this.grid = this.makeGrid(this.columns, this.rows, this.depths, 0.07);
    }

    // Render

    this.iterateGrid((col: number, row: number, dep: number) => {
      const x = col * this.resolution;
      const y = row * this.resolution;
      const z = dep * this.resolution;
      const cell = this.grid[col][row][dep];
      if (cell != null && !cell.phantom) {
        this.p.push();
        this.p.fill(cell.color.h, cell.color.s, cell.color.b, cell.color.a);
        this.p.noStroke();
        this.p.translate(
          x - this.cubeSize / 2,
          y - this.cubeSize / 2,
          z - this.cubeSize / 2
        );
        this.p.box(this.boxSize, this.boxSize, this.boxSize);
        this.p.pop();
      }
    });

    // Update
    const next = this.makeGrid(this.columns, this.rows, this.depths, 0);
    this.iterateGrid((col: number, row: number, dep: number) => {
      // Spontaneous birth
      if (Math.random() < this.parameters.chance) {
        next[col][row][dep] = new Cell(this.randomColor(), true);
        return;
      }

      const state = this.grid[col][row][dep];
      const neighbours = this.countNeighbours(this.grid, col, row, dep);
      if (state == null && this.B.includes(neighbours.sum)) {
        next[col][row][dep] = new Cell(this.averageColor(neighbours.colors));
      } else if (state != null && !this.S.includes(neighbours.sum)) {
        next[col][row][dep] = undefined;
      } else {
        next[col][row][dep] = state;
      }
    });
    this.grid = next;
  }

  private countNeighbours(
    grid: Grid,
    x: number,
    y: number,
    z: number
  ): Neighbours {
    const neighbours: Neighbours = {
      sum: this.grid[x][y][z] != null ? -1 : 0,
      colors: [],
    };

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          if (
            this.outOfBounds(x + i, 0, this.columns) ||
            this.outOfBounds(y + j, 0, this.rows) ||
            this.outOfBounds(z + k, 0, this.depths)
          ) {
            continue;
          }

          const cell = grid[x + i][y + j][z + k];
          if (cell != null) {
            neighbours.sum++;
            neighbours.colors.push(cell.color);
          }
        }
      }
    }

    return neighbours;
  }

  private iterateGrid = (
    delegate: (col: number, row: number, dep: number) => void
  ): void => {
    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < this.rows; row++) {
        for (let dep = 0; dep < this.depths; dep++) {
          delegate(col, row, dep);
        }
      }
    }
  };

  private makeGrid(
    columns: number,
    rows: number,
    depths: number,
    probability: number
  ): Grid {
    return new Array(columns).fill(undefined).map(() =>
      new Array(rows).fill(undefined).map(() =>
        new Array(depths).fill(undefined).map(() => {
          if (Math.random() < probability) {
            return new Cell(this.randomColor());
          }
          return undefined;
        })
      )
    );
  }

  private randomColor(): HSLA {
    return new HSLA(this.p.random(100, 360), 90, 60, 0.8);
  }

  private averageColor(colors: HSLA[]): HSLA {
    if (colors.length === 1) {
      return colors[0];
    }

    return new HSLA(
      colors.map((c: HSLA) => c.h).reduce((acc, h) => acc + h, 0) /
        colors.length,
      colors.map((c: HSLA) => c.s).reduce((acc, s) => acc + s, 0) /
        colors.length,
      colors.map((c: HSLA) => c.b).reduce((acc, b) => acc + b, 0) /
        colors.length,
      colors.map((c: HSLA) => c.a).reduce((acc, a) => acc + a, 0) /
        colors.length
    );
  }

  private outOfBounds(index: number, min: number, max: number): boolean {
    return index < min || index >= max;
  }

  private allDead(): boolean {
    return this.grid.every((row) =>
      row.every((depth) => depth.every((cell) => cell == null || cell.phantom))
    );
  }
}
