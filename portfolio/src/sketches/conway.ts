import p5 from "p5";
import { Sketch } from ".";

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

type Grid = (Cell | undefined)[][];
type Neighbours = {
  sum: number;
  colors: HSLA[];
};

export class Conway implements Sketch {
  private chance = 0.0001;

  private resolution = 10;
  private boxSize = this.resolution - 1;
  private rows = 0;
  private columns = 0;
  private grid: Grid = [];

  private B = [3];
  private S = [2, 3];

  constructor(private readonly p: p5) {}

  preload(): void {}

  setup() {
    this.p.frameRate(12);
    this.p.colorMode(this.p.HSL, 360, 100, 100);
    this.p.createCanvas(window.innerWidth, window.innerHeight, this.p.WEBGL);
    this.p.smooth();
    this.p.perspective();

    this.columns = Math.ceil(this.p.width / this.resolution);
    this.rows = Math.ceil(this.p.height / this.resolution);
    this.grid = this.makeGrid(this.columns, this.rows);
  }

  windowResized(): void {
    this.setup();
  }

  draw() {
    // Reset
    this.p.background(0);

    const locX = this.p.mouseX - this.p.height / 2;
    const locY = this.p.mouseY - this.p.width / 2;
    this.p.ambientLight(0, 0, 75);
    this.p.pointLight(0, 0, 100, locX, locY, 255);

    // Render
    this.iterateGrid((col: number, row: number) => {
      let x = col * this.resolution;
      let y = row * this.resolution;
      const cell = this.grid[col][row];
      if (cell && !cell.phantom) {
        this.p.push();
        this.p.fill(cell.color.h, cell.color.s, cell.color.b, cell.color.a);
        this.p.noStroke();
        this.p.translate(x - this.p.width / 2, y - this.p.height / 2, 0);
        this.p.box(this.boxSize, this.boxSize, this.boxSize);
        this.p.pop();
      }
    });

    // Update
    let next = this.makeGrid(this.columns, this.rows, true);
    this.iterateGrid((col: number, row: number) => {
      // Spontaneous birth
      if (Math.random() < this.chance) {
        next[col][row] = new Cell(this.randomColor(), true);
        return;
      }

      let state = this.grid[col][row];
      let neighbours = this.countNeighbours(this.grid, col, row);
      if (!state && this.B.includes(neighbours.sum)) {
        next[col][row] = new Cell(this.averageColor(neighbours.colors));
      } else if (state && !this.S.includes(neighbours.sum)) {
        next[col][row] = undefined;
      } else {
        next[col][row] = state;
      }
    });
    this.grid = next;
  }

  private countNeighbours = (grid: Grid, x: number, y: number): Neighbours => {
    let neighbours: Neighbours = {
      sum: 0,
      colors: [],
    };

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + this.columns) % this.columns;
        let row = (y + j + this.rows) % this.rows;

        const cell = grid[col][row];
        if (cell) {
          neighbours.sum += 1;
          neighbours.colors.push(cell.color);
        }
      }
    }

    neighbours.sum -= grid[x][y] ? 1 : 0;

    return neighbours;
  };

  private iterateGrid = (
    delegate: (col: number, row: number) => void
  ): void => {
    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < this.rows; row++) {
        delegate(col, row);
      }
    }
  };

  private makeGrid = (columns: number, rows: number, empty?: boolean): Grid =>
    new Array(columns).fill(undefined).map(() =>
      new Array(rows).fill(undefined).map(() => {
        if (!empty && Math.random() > 0.3) {
          return new Cell(this.randomColor());
        }
        return undefined;
      })
    );

  private randomColor = (): HSLA =>
    new HSLA(this.p.random(30, 55), this.p.random(80, 100), 60);

  private averageColor = (colors: HSLA[]): HSLA => {
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
  };
}
