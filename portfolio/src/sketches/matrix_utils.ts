import p5 from "p5";

export class Vector4D extends p5.Vector {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public z: number = 0,
        public w: number = 0) {
        super();
    }

    mult(f: number): Vector4D {
        this.x *= f;
        this.y *= f;
        this.z *= f;
        this.w *= f;

        return this;
    }

    To3D(p: p5): p5.Vector {
        return p.createVector(this.x, this.y, this.z);
    }
}

export class MatrixUtils {

    constructor(public p: p5) { }

    VecToMatrix(v: p5.Vector): number[][] {
        const m: number[][] = [];
        for (let i = 0; i < 3; i++) {
            m[i] = [];
        }
        m[0][0] = v.x;
        m[1][0] = v.y;
        m[2][0] = v.z;
        return m;
    }

    Vec4ToMatrix(v: Vector4D): number[][] {
        let m = this.VecToMatrix(v);
        m[3] = [];
        m[3][0] = v.w;
        return m;
    }

    MatrixToVec(m: number[][]) {
        return this.p.createVector(m[0][0], m[1][0], m[2][0]);
    }

    MatrixToVec4(m: number[][]): Vector4D {
        const r = new Vector4D(m[0][0], m[1][0], m[2][0], 0);
        if (m.length > 3) {
            r.w = m[3][0];
        }
        return r;
    }

    Matmulvec(a: number[][], vec: p5.Vector): p5.Vector {
        const m = this.VecToMatrix(vec);
        const r = this.Matmul(a, m) as number[][];
        return this.MatrixToVec(r);
    }

    Matmulvec4(a: number[][], vec: Vector4D): Vector4D {
        const m = this.Vec4ToMatrix(vec);
        const r = this.Matmul(a, m) as number[][];
        return this.MatrixToVec4(r);
    }

    Matmul(a: number[][], b: number[][] | p5.Vector | Vector4D): number[][] | p5.Vector | Vector4D | null {
        if (b instanceof Vector4D) {
            return this.Matmulvec4(a, b);
        }
        if (b instanceof p5.Vector) {
            return this.Matmulvec(a, b);
        }

        const colsA = a[0].length;
        const rowsA = a.length;
        const colsB = b[0].length;
        const rowsB = b.length;

        if (colsA !== rowsB) {
            console.error('Columns of A must match rows of B');
            return null;
        }

        const result: number[][] = [];
        for (let j = 0; j < rowsA; j++) {
            result[j] = [];
            for (let i = 0; i < colsB; i++) {
                let sum = 0;
                for (let n = 0; n < colsA; n++) {
                    sum += a[j][n] * b[n][i];
                }
                result[j][i] = sum;
            }
        }
        return result;
    }

    LogMatrix(m: number[][]): void {
        const cols = m[0].length;
        const rows = m.length;
        console.log(rows + 'x' + cols);
        console.log('----------------');
        let s = '';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                s += m[i][j] + ' ';
            }
            console.log(s);
        }
        console.log();
    }
}