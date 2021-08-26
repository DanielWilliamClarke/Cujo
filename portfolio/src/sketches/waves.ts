import p5 from "p5";

const SimplexNoise = require('simplex-noise');

class HSLA {
    constructor(public h: number = 0, public s: number = 0, public b: number = 0, public a: number = 0)  {}
}

class Particle {
    public pastX: number = 0;
    public pastY: number = 0;

    constructor(public x: number = 0, public y: number = 0, public color: HSLA = new HSLA()) {
    }

    init(hueBase: number, screenWidth: number, screenHeight: number, centerX: number, centerY: number): void {
        this.x = this.pastX = screenWidth * Math.random();
        this.y = this.pastY = screenHeight * Math.random();
        this.color.h = Math.atan2(this.y - centerY, this.x - centerX) * (180 / Math.PI);
        this.color.s = 100;
        this.color.b = 100;
        this.color.a = 0.95;
    }

    persistPosition(): void {
        this.pastX = this.x;
        this.pastY = this.y;
    }

    integratePosition(x: number, y: number): void {
        this.x += x;
        this.y += y;
    } 
}

class NoiseGenerator {

    constructor(private sn: any) {
    }

    getNoise(x: number, y: number, z: number): number {
        var octaves = 12,
            fallout = 0.3,
            amp = 1, f = 1, sum = 0,
            i;
    
        for (i = 0; i < octaves; ++i) {
            amp *= fallout;
            sum += amp * (this.sn.noise3D(x * f, y * f, z * f) + 1) * 0.5;
            f *= 2;
        }
    
        return sum;
    }

    refresh(sn: any) {
        this.sn = sn;
    }
}

const sketch = (p: p5): void => {

    const noiseGenerator = new NoiseGenerator(new SimplexNoise());
    const totalParticles = 1000;
    const particles: Particle[] = [];
    let screenWidth = 0;
    let screenHeight = 0;    
    let centerX = 0;
    let centerY = 0;
    let hueBase = 0;

    const step = 10;
    const base = 1000;
    const zInc = 0.001;
    let zOff = 0;

    p.setup = (): void => {
        p.frameRate(60);
        p.colorMode(p.HSB, 100);

        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(0);

        screenWidth  = p.width  = window.innerWidth;
        screenHeight = p.height = window.innerHeight;
        centerX = screenWidth / 2;
        centerY = screenHeight / 2;

        for (var i = 0, len = totalParticles; i < len; i++) {
            const p = new Particle();
            p.init(hueBase, screenWidth, screenHeight, centerX, centerY);
            particles.push(p)
        }
    };

    p.windowResized = (): void => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        screenWidth  = p.width  = window.innerWidth;
        screenHeight = p.height = window.innerHeight;
        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;
        noiseGenerator.refresh(new SimplexNoise());
    }

    p.draw = (): void => {

        particles.forEach((particle: Particle): void => {
            particle.persistPosition();

            const angle = Math.PI * 6 * noiseGenerator.getNoise(
                particle.x / base * 1.75, 
                particle.y / base * 1.75,
                zOff);

            particle.integratePosition(
                Math.cos(angle) * step,
                Math.sin(angle) * step);

            if (particle.color.a < 1) {
                particle.color.a += 0.003;   
            }

            // draw pariticle
            p.fill(particle.color.h, particle.color.s, particle.color.b, particle.color.a);
            p.stroke(particle.color.h, particle.color.s, particle.color.b, particle.color.a);
            p.line(particle.pastX, particle.pastY, particle.x, particle.y);
            
            if ((particle.x < 0 || particle.x > window.innerWidth) ||
                 (particle.y < 0 || particle.y > window.innerHeight)) {
                particle.init(hueBase, screenWidth, screenHeight, centerX, centerY);
            }
        });
        
        zOff += zInc;
        hueBase += 0.1;
    };
};

export default sketch;