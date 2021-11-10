import p5 from "p5";
import { Vector4D, MatrixUtils } from "./matrix_utils"

type RotationGenerator = (angle: number) => number[][];

export function hypercube(p: p5): void {

    const matrixUtils = new MatrixUtils(p);
    const distance = 2;

    let points: Vector4D[] = [];
    let angle: number = 0;
    let colorAngle: number = 0;
    let ctx: any = null;

    const generators3d: RotationGenerator[] = [
        (angle: number) => ([ // XY
            [p.cos(angle), -p.sin(angle), 0, 0],
            [p.sin(angle), p.cos(angle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]),

        (angle: number) => ([ // XZ
            [p.cos(angle), 0, -p.sin(angle),  0],
            [0, 1, 0, 0],
            [p.sin(angle), 0, p.cos(angle), 0],
            [0, 0, 0, 1]
        ]),

        (angle: number) => ([ // YZ
            [1, 0, 0, 0],
            [0, p.cos(angle), -p.sin(angle), 0],
            [0, p.sin(angle), p.cos(angle), 0],
            [0, 0, 0, 1]
        ])
    ];

    const generators4d: RotationGenerator[] = [
        (angle: number) => ([ // XW
            [p.cos(angle), 0, 0, -p.sin(angle)],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [p.sin(angle), 0, 0, p.cos(angle)]
        ]),

        (angle: number) => ([// YW
            [1, 0, 0, 0],
            [0, p.cos(angle), 0, -p.sin(angle)],
            [0, 0, 1, 0],
            [0,  p.sin(angle), 0, p.cos(angle)]
        ]),

        (angle: number) => ([ // ZW
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, p.cos(angle), -p.sin(angle)],
            [0, 0, p.sin(angle), p.cos(angle)]
        ])
    ];

    const currentRotations: RotationGenerator[] = [
        generators3d.sample(),
        generators4d.sample()
    ];

    const drawSquare = (...points: p5.Vector[]) => {
        p.beginShape();
        for (let point of points) p.vertex(point.x, point.y, point.z);
        p.endShape(p.CLOSE);
    }

    const drawCube = (points: p5.Vector[], hue: number): void => {
        p.fill(hue, 100, 100, 0.05);
        p.stroke(hue, 100, 100);
        p.strokeWeight(2);

        drawSquare(points[0], points[1], points[3], points[2]);
        drawSquare(points[0], points[1], points[5], points[4]);
        drawSquare(points[4], points[5], points[7], points[6]);
        drawSquare(points[2], points[3], points[7], points[6]);
        drawSquare(points[1], points[3], points[7], points[5]);
        drawSquare(points[0], points[2], points[6], points[4]);
    }

    const getEvenPoints = (points: p5.Vector[], start: number, end: number, offset: number = 0, step: number = 2) => {
        let result = [];
        for (let i = start; i < end; i += step) {
            result.push(points[i + offset])
        };
        return result;
    }

    p.setup = (): void => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        p.colorMode(p.HSB);
        p.ortho(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, -1000, 10000);

        // transparency ordering workaround
        const canvas = document.getElementById('defaultCanvas0') as any;
        ctx = canvas.getContext('webgl');
        ctx.disable(ctx.DEPTH_TEST);

        // Generate 4D points
        for (let i = 0; i < 16; i++) {
            let x = i & 1 ? -1 : 1;
            let y = i & 2 ? -1 : 1;
            let z = i & 4 ? -1 : 1;
            let w = i & 8 ? -1 : 1;
            points.push(new Vector4D(x, y, z, w));
        }
    };

    p.windowResized = (): void => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        p.ortho(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, -1000, 10000);
    };

    p.draw = (): void => {
        p.background(0);
        p.rotateX(35.264);
        p.rotateY(-p.QUARTER_PI);

        // Rotate and Project 4D Points
        const projected3d: p5.Vector[] =
            points.map((point: Vector4D): p5.Vector => {
                // Rotate point
                // https://math.stackexchange.com/questions/1402362/rotation-in-4d
                const rotatedPoint = currentRotations
                    .map((generator: RotationGenerator) => generator(angle))
                    .reduce((point: Vector4D, rotation: number[][]): Vector4D =>
                        matrixUtils.Matmul(rotation, point) as Vector4D,
                        point)

                // Project point
                const w = 1 / (distance - rotatedPoint.w);
                const projection = [
                    [w, 0, 0, 0],
                    [0, w, 0, 0],
                    [0, 0, w, 0]
                ];
                const projected = matrixUtils.Matmul(projection, rotatedPoint) as Vector4D;
                return projected
                    .mult(500)
                    .To3D(p);
            });

        // Draw each cube
        [
            projected3d.slice(0, 8),
            projected3d.slice(8),
            [...projected3d.slice(0, 4), ...projected3d.slice(8, 12)],
            [...projected3d.slice(4, 8), ...projected3d.slice(12)],
            [...getEvenPoints(projected3d, 0, 16)],
            [...getEvenPoints(projected3d, 0, 16, 1)],
            [...getEvenPoints(projected3d, 0, 16, 0, 4), ...getEvenPoints(projected3d, 0, 16, 1, 4)],
            [...getEvenPoints(projected3d, 0, 16, 2, 4), ...getEvenPoints(projected3d, 0, 16, 3, 4)]
        ].forEach((cube: p5.Vector[], index: number): void =>
            drawCube(cube, p.map(p.sin(colorAngle + index), -1, 1, 0, 360)))

        angle += 0.01;
        colorAngle += 0.05;
    };
};
