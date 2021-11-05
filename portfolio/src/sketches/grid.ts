import p5 from "p5";
import { Vector4D } from "./matrix_utils"
import { Ease } from "./easing";

class Grid {
    static getSquareGrid(num: number, scale: number): Vector4D[] {
        const vectors: [number, number][] = [];
        for (let x = -num; x <= num; x++) {
            for (let y = -num; y <= num; y++) {
                vectors.push([x, y]);
            }
        }

        return vectors.map(([x, y], i): Vector4D => {
            const d = Math.sqrt(x * x + y * y);
            return new Vector4D(
                x * scale,
                y * scale,
                d,
                i)
        });
    }

    static getPolygonPoints(num: number, poly: number): p5.Vector[] {
        const points: p5.Vector[] = [];
        for (let j = 0; j < poly; j++) {
            for (let i = 0; i < num / poly; i++) {

                const x = Math.cos(j / poly * Math.PI * 2);
                const y = Math.sin(j / poly * Math.PI * 2);

                let nx, ny;
                if (j === poly - 1) {
                    nx = Math.cos(0);
                    ny = Math.sin(0);
                } else {
                    nx = Math.cos((j + 1) / poly * Math.PI * 2);
                    ny = Math.sin((j + 1) / poly * Math.PI * 2);
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

export function grid(p: p5) {

    let screenWidth = 0;
    let screenHeight = 0;

    let timeScale = 0.005;
    let t = 0;

    let scale = 150;
    let num = 10;
    let lineWidth = 15;

    let shapes: Vector4D[] = [];
    let hexPoints: p5.Vector[] = [];
    let maxDist = 0;
    let size = 0;

    let ctx: any;

    p.setup = p.windowResized = (): void => {
        p.frameRate(60);
        p.colorMode(p.HSB, 100);
        p.createCanvas(window.innerWidth, window.innerHeight);

        screenWidth = p.width = window.innerWidth;
        screenHeight = p.height = window.innerHeight;

        const canvas = document.getElementById('defaultCanvas0') as any;
        ctx = canvas.getContext('2d');

        shapes = Grid.getSquareGrid(num, scale);
        hexPoints = Grid.getPolygonPoints(360, 4);

        maxDist = shapes.reduce((max: number, { z }: Vector4D) => Math.max(z, max), 0);
        size = Math.floor(scale * Math.sqrt(2) / 2);
    }

    p.draw = (): void => {

        t += timeScale;

        ctx.save();
        ctx.fillStyle = `rgba(0,0,0,0.05)`;
        ctx.fillRect(0, 0, screenWidth, screenHeight);

        ctx.translate(screenWidth / 2, screenHeight / 2);

        ctx.lineCap = "sqaure";
        
        shapes.forEach((shape: Vector4D): void => {
            let scaledT = Ease.easeInOutQuad(Math.abs((t - (shape.z / maxDist)) % 1));

            const x = shape.x;
            const y = shape.y;

            ctx.lineWidth = lineWidth / shape.z;
   

            ctx.save();

            ctx.translate(x, y);
            ctx.rotate((Math.PI / 2));
            ctx.translate(-x, -y);

            let start = Math.floor(p.map(scaledT, 0, 1, 0, hexPoints.length - 1));
            let end = Math.ceil(p.map(scaledT, 0, 1, start + 1, hexPoints.length - 1));

            ctx.strokeStyle = `hsl(${360 * scaledT}, 80%, 60%)`;

            ctx.translate(x, y);
            ctx.beginPath();
            ctx.moveTo(hexPoints[start].x * size, hexPoints[start].y * size);

            Array(end - start + 1)
                .fill(0)
                .map((_, idx) => start + idx)
                .forEach((i: number) => {
                    const index = end === hexPoints.length - 1 ? 0 : i;
                    ctx.lineTo(hexPoints[index].x * size, hexPoints[index].y * size);
                })

            ctx.stroke();
            ctx.restore();
        });

        ctx.restore();
    }
}