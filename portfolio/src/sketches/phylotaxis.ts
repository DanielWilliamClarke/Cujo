import p5 from "p5";

declare global {
    interface Array<T> {
        sample(): T;
    }
}

if (!Array.prototype.sample) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.sample = function (): any {
        return this[Math.floor(Math.random() * this.length)];
    }
}

const sketch = (p: p5): void => {

    let n = 0;
    let c = 8;
    let start = 0;
    let growth: boolean = true;

    const magicAngle = 137.2;
    const maxParticles = 3000;
    const increment = 5;

    let selectedGenerator: any = null;
    const magicAngleGenerators = [
        (input: number): number => {
            let ma = p.sin(input);
            ma = p.map(ma, -1, 1, 137.3, 137.7);
            return ma;
        },
        (input: number): number => 137.3,
        (input: number): number => 137.5,
        (input: number): number => 137.7
    ];

    p.setup = (): void => {
        p.frameRate(144);
        p.colorMode(p.HSB);
        p.angleMode(p.DEGREES);
        p.blendMode(p.DIFFERENCE);
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        selectedGenerator = magicAngleGenerators.sample();
    }

    p.windowResized = (): void => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    };

    p.draw = (): void => {

        p.background(0);

        for (var i = 0; i < n; i++) {
            // vary magic angle
            const ma = selectedGenerator(i);

            // Calculate angle and radis
            const a = i * ma;
            const r = c * p.sqrt(i);
            // const x =  r * p.cos(a);
            // const y = r * p.sin(a);

            // Polar to cartesian converstion with some wiggle
            const lerpX1 = r * p.cos(a);
            const lerpX2 = r * p.cos((i + 2) * magicAngle)
            const lerpY1 = r * p.sin(a);
            const lerpY2 = r * p.sin((i + 2) * magicAngle);

            const x = p.lerp(lerpX1, lerpX2, p.sin(p.millis() / 100))
            const y = p.lerp(lerpY1, lerpY2, p.cos(p.millis() / 100))

            // Calculate color hue
            let hu = p.sin(start - i * 0.5);
            hu = p.map(hu, -1, 1, 0, 360);

            // Here I want to try to keep particle max size consistent accross multiple device widths
            const maxSize = p.map(p.width / 2, 375, 1440, 10, 15);
            // Calcualte particle size based on radius
            const d = p.map(r, 0, p.height / 2, 0.5, maxSize);

            // Draw
            p.fill(hu, 150, 255);
            p.noStroke();
            p.ellipse(x, y, d, d, 5);
        }

        // Toggle growth / skrinking
        if (n < 0 || n >= maxParticles) {
            growth = !growth
        }
        n += growth ? increment : -increment;
        if(n <= 0) {
            selectedGenerator = magicAngleGenerators.sample();
        }

        start += 5;
    }
};

export default sketch;