import p5 from "p5";

const sketch = (p: p5): void => {

    let n = 0;
    let c = 10;
    let start = 0;
    let growth: boolean = true;

    const magicAngle = 137.2;
    const maxParticles = 3000;
    const increment = 5;

    p.setup = (): void => {
        p.frameRate(144);
        p.colorMode(p.HSB);
        p.angleMode(p.DEGREES);
        p.blendMode(p.DIFFERENCE);
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    }

    p.windowResized = (): void => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    };

    p.draw = (): void => {

        p.background(0);

        for (var i = 0; i < n; i++) {
            // vary magic angle
            let ma =  p.sin(i);
            ma = p.map(ma, -1, 1, 137.3, 137.6);
           
            // Calculate angle and radis
            const a = i * ma;
            const r = c * p.sqrt(i);

            // const x =  r * p.cos(a);
            // const y = r * p.sin(a);

            // Polar to cartesian converstion with some wiggle
            const lerpX1 = r * p.cos(a);
            const lerpX2 = r * p.cos((i + 1) * magicAngle)
            const lerpY1 = r * p.sin(a);
            const lerpY2 = r * p.sin((i + 1) * magicAngle);

            const x = p.lerp(lerpX1, lerpX2, p.sin(p.millis() / 100))
            const y = p.lerp(lerpY1, lerpY2, p.cos(p.millis() / 100))

            // Calculate color hue
            let hu = p.sin(start - i * 0.5);
            hu = p.map(hu, -1, 1, 0, 360); 

            // Calcualte particle size based on radius
            const d = p.map(r, 0, p.height / 2, 0.5, 15);
            // Calculate color alpha based on size
            const alpha = p.map(d, 1, 15, 1, 0.8);

            // Draw
            p.fill(hu, 255, 255, alpha);
            p.noStroke();           
            p.ellipse(x, y, d, d, 5); 
        }

        // Toggle growth / skrinking
        if (n < 0 || n >= maxParticles) {
            growth = !growth
        }
        n += growth ? increment : -increment;

        start += 1;
    }
};

export default sketch;