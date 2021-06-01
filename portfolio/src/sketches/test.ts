import p5 from "p5";

const sketch = (p: p5): void => {
    p.setup = (): void => {
        p.createCanvas(500, 500);
    };

    p.draw = (): void => {
        if (p.mouseIsPressed) {
            p.fill(0);
        } else {
            p.fill(255);
        }
        p.ellipse(p.mouseX, p.mouseY, 80, 80);
    };
};

export default sketch;