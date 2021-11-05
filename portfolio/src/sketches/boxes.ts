import p5 from "p5";

export function boxes(p: p5): void {

    const minW: number = 32;
    const maxW: number = 64;
    const minH: number = 60;
    const maxH: number = 240;
    const padding: number = 50;

    const size: number = 1000;
    const halfSize: number = 1000 / 2;

    let ma: number = 0;
    let yAngle: number = -p.QUARTER_PI;
    let angle: number = 0;
    let colorAngle: number = 0;
    let maxD: number = 0;

    let opacity: number = 0;
    let opacityProgress: number = 0;
    const easeInOutCubic = (x: number): number => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    p.setup = (): void => {
        p.frameRate(60);
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        p.colorMode(p.HSB);
        p.smooth();
        p.noStroke();

        ma = 35.264; // p.atan(1 / p.sqrt(2));
        maxD = p.dist(0, 0, maxH, maxH);
        p.ortho(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, -1000, 10000);
    }

    p.windowResized = (): void => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        p.ortho(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, -1000, 10000);
    };

    p.draw = (): void => {

        p.background(0);
        p.rotateX(ma);
        p.rotateY(yAngle += 0.001);

        const locX = p.mouseX - p.height / 2;
        const locY = p.mouseY - p.width / 2;
        p.ambientLight(0, 0, 75);
        p.pointLight(0, 0, 100, locX, locY, 255);

        for(let z = padding; z < size - padding; z += maxW) {
            for(let x = padding; x < size - padding; x += maxW) {
                p.push();

                const d = p.dist(x, z, halfSize, halfSize);
                const offset = p.map(d, 0, maxD, -p.PI, p.PI);
                const a = angle + offset;
                const h = p.floor(p.map(p.sin(a), -1, 1, minH, maxH));
                const w = p.floor(p.map(p.sin(a), -1, 1, minW, maxW));

                const c = colorAngle + offset;
                const hue = p.floor(p.map(p.sin(c), -1, 1, 0, 360));
                const brightness = p.floor(p.map(p.sin(c), -1, 1, 75, 90));

                p.fill(hue, 60, brightness, opacity);
                p.translate(x - halfSize, 0, z - halfSize);
                p.box(w, h, w);
                p.pop();
            }
        }

        angle -= 0.01;
        colorAngle -= 0.005;

        //easeOutCubic
        opacityProgress += 0.01;
        opacity = easeInOutCubic(opacityProgress);
    };
};
