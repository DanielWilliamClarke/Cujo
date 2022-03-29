import p5 from "p5";

class HSLA {
  constructor(public h: number = 255, public s: number = 255, public b: number = 255, public a: number = 255) {
  }
}
class Cell {
  constructor(public color: HSLA = new HSLA(), public phantom?: boolean) {}
}

type Grid = (Cell | undefined)[][];
type Neighbours = {
  sum: number,
  colors: HSLA[]
}

export function conway(p: p5): void {
  let chance = 0.0001;

  let resolution = 20;
  let boxSize = resolution - 1;
  let rows = 0;
  let columns = 0;
  let grid: Grid = [];

  let B = [3]
  let S = [2, 3]

  p.setup = p.windowResized = (): void => {
    p.frameRate(12);
    p.colorMode(p.HSL, 360, 100, 100);
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.smooth();
    p.perspective();

    columns = Math.ceil(p.width / resolution);
    rows = Math.ceil(p.height / resolution);
    grid = makeGrid(columns, rows);
  }

  p.draw = (): void => {
    // Reset
    p.background(0);

    const locX = p.mouseX - p.height / 2;
    const locY = p.mouseY - p.width / 2;
    p.ambientLight(0, 0, 75);
    p.pointLight(0, 0, 100, locX, locY, 255);

    // Render
    iterateGrid((col: number, row: number) => {
      let x = col * resolution;
      let y = row * resolution;
      const cell = grid[col][row];
      if (cell && !cell.phantom) {
        p.push();
        p.fill(cell.color.h, cell.color.s, cell.color.b, cell.color.a);
        p.noStroke();
        p.translate(
          x - p.width / 2,
          y - p.height / 2,
          0);
        p.box(boxSize, boxSize, boxSize);
        p.pop();
      }
    })

    // Update
    let next = makeGrid(columns, rows, true);
    iterateGrid((col: number, row: number) => {
      // Spontaneous birth
      if (Math.random() < chance) {
        next[col][row] = new Cell(randomColor(), true);
        return;
      }

      let state = grid[col][row];
      let neighbours = countNeighbours(grid, col, row);
      if (!state && B.includes(neighbours.sum)) {
        next[col][row] = new Cell(averageColor(neighbours.colors));
      } else if (state && !S.includes(neighbours.sum)) {
        next[col][row] = undefined;
      } else {
        next[col][row] = state;
      }
    });
    grid = next;
  }

  const countNeighbours = (grid: Grid, x: number, y: number): Neighbours => {
    let neighbours: Neighbours = {
      sum: 0,
      colors: []
    };

    for(let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        let col = (x + i + columns) % columns;
        let row = (y + j + rows) % rows;

        const cell = grid[col][row];
        if(cell) {
          neighbours.sum += 1;
          neighbours.colors.push(cell.color);
        }
      }
    }

    neighbours.sum -= grid[x][y] ? 1 : 0;

    return neighbours;
  }

  const iterateGrid = (delegate: (col: number, row: number) => void): void => {
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        delegate(col, row);
      }
    }
  }

  const makeGrid = (columns: number, rows: number, empty?: boolean): Grid =>
    new Array(columns)
      .fill(undefined)
      .map(() => new Array(rows)
        .fill(undefined)
        .map(() => {
          if (!empty && Math.random() > 0.3) {
            return new Cell(randomColor());
          }
          return undefined;
        }));

  const randomColor = (): HSLA =>
    new HSLA(
      p.random(30, 55),
      p.random(80, 100),
      60);

  const averageColor = (colors: HSLA[]): HSLA => {
    if (colors.length === 1) {
      return colors[0];
    }

    return new HSLA(
      colors.map((c: HSLA) => c.h).reduce((acc, h) => acc + h, 0) / colors.length,
      colors.map((c: HSLA) => c.s).reduce((acc, s) => acc + s, 0) / colors.length,
      colors.map((c: HSLA) => c.b).reduce((acc, b) => acc + b, 0) / colors.length,
      colors.map((c: HSLA) => c.a).reduce((acc, a) => acc + a, 0) / colors.length);
  }
}