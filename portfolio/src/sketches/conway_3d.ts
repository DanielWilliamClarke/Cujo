import p5 from "p5";
import * as dat from 'dat.gui';

class HSLA {
  constructor(public h: number = 255, public s: number = 255, public b: number = 255, public a: number = 255) { }
}
class Cell {
  constructor(public color: HSLA = new HSLA(), public phantom?: boolean) { }
}

type Grid = (Cell | undefined)[][][];
type Neighbours = {
  sum: number,
  colors: HSLA[]
}

export function conway3D(p: p5): void {
  const parameters = {
    chance: 0.0095,
    resolution: 20,
    cubeSize: window.innerHeight,
    spin: 0.05,
  };

  const gui = new dat.GUI();
  gui.remember(parameters);
  gui.add(parameters, "chance").min(0.0001).max(0.05).step(0.0001);
  gui.add(parameters, "cubeSize").min(100).max(window.innerHeight).step(10).onFinishChange(() => reset());
  gui.add(parameters, "resolution").min(5).max(30).step(2).onFinishChange(() => reset());
  gui.add(parameters, "spin").min(0).max(0.5).step(0.01);
  gui.close();

  let cubeSize = 0;
  let resolution = 0;
  let boxSize = 0;
  let rows = 0;
  let columns = 0;
  let depths = 0;
  let grid: Grid = [];

  let yAngle: number = -p.QUARTER_PI;

  let B = [5]
  let S = [4, 5];

  const reset = p.setup = p.windowResized = (): void => {
    p.frameRate(12);
    p.colorMode(p.HSL, 360, 100, 100);
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.smooth();
    p.perspective();

    cubeSize = parameters.cubeSize;
    resolution = parameters.resolution;
    boxSize = resolution - 1;

    columns = Math.ceil(cubeSize / resolution);
    rows = Math.ceil(cubeSize / resolution);
    depths = Math.ceil(cubeSize / resolution);
    grid = makeGrid(columns, rows, depths, 0.07);
  }

  p.draw = (): void => {

    // Reset
    p.background(0);
    // p.orbitControl();

    // p.rotateX(35.264);
    p.rotateY(yAngle += parameters.spin);

    const locX = p.mouseX - p.height / 2;
    const locY = p.mouseY - p.width / 2;
    p.ambientLight(0, 0, 75);
    p.pointLight(0, 0, 100, locX, locY, 255);

    if (allDead()) {
      grid = makeGrid(columns, rows, depths, 0.07);
    }

    // Render
    iterateGrid((col: number, row: number, dep: number) => {
      let x = col * resolution;
      let y = row * resolution;
      let z = dep * resolution;
      const cell = grid[col][row][dep];
      if (cell && !cell.phantom) {
        p.push();
        p.fill(cell.color.h, cell.color.s, cell.color.b, cell.color.a);
        p.noStroke();
        p.translate(
          x - (cubeSize / 2),
          y - (cubeSize / 2),
          z - (cubeSize / 2));
        p.box(boxSize, boxSize, boxSize);
        p.pop();
      }
    })

    // Update
    let next = makeGrid(columns, rows, depths, 0);
    iterateGrid((col: number, row: number, dep: number) => {
      // Spontaneous birth
      if (Math.random() < parameters.chance) {
        next[col][row][dep] = new Cell(randomColor(), true);
        return;
      }

      const state = grid[col][row][dep];
      let neighbours = countNeighbours(grid, col, row, dep);
      if (!state && B.includes(neighbours.sum)) {
        next[col][row][dep] = new Cell(averageColor(neighbours.colors));
      } else if (state && !S.includes(neighbours.sum)) {
        next[col][row][dep] = undefined;
      } else {
        next[col][row][dep] = state;
      }
    });
    grid = next;
  }

  const countNeighbours = (grid: Grid, x: number, y: number, z: number): Neighbours => {
    let neighbours: Neighbours = {
      sum: grid[x][y][z] ? -1 : 0,
      colors: []
    };

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          if (outOfBounds(x + i, 0, columns) || outOfBounds(y + j, 0, rows) || outOfBounds(z + k, 0, depths)) {
            continue;
          }

          const cell = grid[x + i][y + j][z + k];
          if (cell) {
            neighbours.sum++;
            neighbours.colors.push(cell.color);
          }
        }
      }
    }

    return neighbours;
  }

  const iterateGrid = (delegate: (col: number, row: number, dep: number) => void): void => {
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        for (let dep = 0; dep < depths; dep++) {
          delegate(col, row, dep);
        }
      }
    }
  }

  const makeGrid = (columns: number, rows: number, depths: number, probability: number): Grid =>
    new Array(columns)
      .fill(undefined)
      .map(
        () => new Array(rows)
          .fill(undefined)
          .map(
            () => new Array(depths)
              .fill(undefined)
              .map(() => {
                if (Math.random() < probability) {
                  return new Cell(randomColor());
                }
                return undefined;
              })));

  const randomColor = (): HSLA =>
    new HSLA(
      p.random(100, 360),
      90,
      60,
      0.8);

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

  const outOfBounds = (index: number, min: number, max: number): boolean => index < min || index >= max;

  const allDead = (): boolean => grid.every((row) => row.every((depth) => depth.every((cell) => !cell || cell.phantom)));
}