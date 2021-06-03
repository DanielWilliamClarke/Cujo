import p5 from "p5";

const sketch = (p: p5): void => {

    const boxWidth: number = 48;
    const padding: number = 50;

    let ma: number = 0;
    let angle: number = 0;
    let colorAngle: number = 0;
    let maxD: number = 0;

    p.setup = (): void => {
        p.frameRate(60);
        p.createCanvas(1000, 1000, p.WEBGL);
        p.colorMode(p.HSB);
        p.smooth();
        p.noStroke();

        ma = 35.264; // p.atan(1 / p.sqrt(2));
        maxD = p.dist(0, 0, 200, 200);
        p.ortho(-800, 800, 600, -600, -1000, 10000); 
    }

    p.draw = (): void => {

        p.clear();
        p.rotateX(ma);
        p.rotateY(-p.QUARTER_PI);

        const locX = p.mouseX - p.height / 2;
        const locY = p.mouseY - p.width / 2;
        p.ambientLight(0, 0, 75);
        p.pointLight(0, 0, 100, locX, locY, 255);

        for(let z = padding; z < p.height - padding; z += boxWidth) {
            for(let x = padding; x < p.width - padding; x += boxWidth) {
                p.push();

                const d = p.dist(x, z, p.width / 2, p.height / 2);
                const offset = p.map(d, 0, maxD, -1.2 * p.PI, 1.2 * p.PI);
                const a = angle + offset;
                const h = p.floor(p.map(p.sin(a), -1, 1, 50, 400));

                const c = colorAngle + offset;
                const hue = p.floor(p.map(p.sin(c), -1, 1, 0, 360));
                const brightness = p.floor(p.map(p.sin(c), -1, 1, 75, 90));

                p.fill(hue, 60, brightness);
                p.translate(x - (p.width / 2), 0, z - (p.height / 2));
                p.box(boxWidth, h, boxWidth);
                p.pop();
            }
        }

        angle -= 0.01;
        colorAngle -= 0.005;
    };
};

export default sketch;