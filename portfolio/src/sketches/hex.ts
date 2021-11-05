import p5 from "p5";

class HSLA {
    constructor(public h: number = 0, public s: number = 0, public b: number = 0, public a: number = 1)  {}
    toString() {
        return `hsla(${this.h}, ${this.s}%, ${this.b}%, ${this.a})`;
    }
}

// Global tick value
let TICK = 0;
const edges = 6;

const options = {
    len: 25,
    count: 50,
    baseTime: 10,
    addedTime: 10,
    dieChance: .05,
    spawnChance: 2,
    sparkChance: .05,
    sparkDist: 10,
    sparkSize: 2,
    color: new HSLA(),
    baseLight: 35,
    addedLight: 10, // [50-10,50+10]
    shadowToTimePropMult: 6,
    baseLightInputMultiplier: .01,
    addedLightInputMultiplier: .01,
    repaintAlpha: .05,
    hueChange: 5
};

class HexLine {

    constructor(
        public dieX: number = 0,
        public dieY: number = 0,
        public x: number = 0,
        public y: number = 0,
        public addedX: number = 0,
        public addedY: number = 0,
        public rad: number = 0,
        public baseRad = Math.PI * 2 / edges,
        public lightInputMultiplier: number = 0,
        public color: HSLA = new HSLA(),
        public cumulativeTime: number = 0,
        public time: number = 0,
        public targetTime: number = 0)
    {
        this.reset();
    }

    reset(): void {
        this.x = 0;
        this.y = 0;
        this.addedX = 0;
        this.addedY = 0;
        this.rad = 0;
        this.cumulativeTime = 0;

        this.lightInputMultiplier = options.baseLightInputMultiplier + options.addedLightInputMultiplier * Math.random();
        this.color = new HSLA(TICK * options.hueChange, 100, 100);

        this.beginPhase();
    }

    beginPhase(): void {
        this.x += this.addedX;
        this.y += this.addedY;

        this.time = 0;
        this.targetTime = (options.baseTime + options.addedTime * Math.random()) | 0;

        this.rad += this.baseRad * (Math.random() < .5 ? 1 : -1);
        this.addedX = Math.cos(this.rad);
        this.addedY = Math.sin(this.rad);

        if (Math.random() < options.dieChance ||
            this.x > this.dieX ||
            this.x < -this.dieX ||
            this.y > this.dieY ||
            this.y < -this.dieY) {
            this.reset();
        }
    }

    step(p: p5, ctx: any, centerX: number, centerY: number): void {

        ++this.time;
        ++this.cumulativeTime;

        if (this.time >= this.targetTime) {
            this.beginPhase();
        }

        const prop = this.time / this.targetTime;
        const wave = Math.sin(prop * Math.PI / 2)
        const x = this.addedX * wave;
        const y = this.addedY * wave;

        this.color.b = options.baseLight + options.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier);

        ctx.shadowBlur = prop * options.shadowToTimePropMult;
        ctx.shadowColor = this.color.toString();
        p.fill(this.color.h, this.color.s, this.color.b);
        p.rect(
            centerX + (this.x + x) * options.len,
            centerY + (this.y + y) * options.len,
            2, 2);

        if (Math.random() < options.sparkChance) {
            p.rect(
                centerX + (this.x + x) * options.len + Math.random() * options.sparkDist * (Math.random() < .5 ? 1 : -1) - options.sparkSize / 2,
                centerY + (this.y + y) * options.len + Math.random() * options.sparkDist * (Math.random() < .5 ? 1 : -1) - options.sparkSize / 2,
                2, 2);
        }
    }
}

export function hex(p: p5): void {

    const lines: HexLine[] = [];

    let screenWidth = 0;
    let screenHeight = 0;
    let centerX = 0;
    let centerY = 0;
    let dieX = 0;
    let dieY = 0;

    let ctx: any;

    p.setup = (): void => {
        p.frameRate(60);
        p.colorMode(p.HSB, 100);
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(0);

        const canvas = document.getElementById('defaultCanvas0') as any;
        ctx = canvas.getContext('2d');

        screenWidth = p.width = window.innerWidth;
        screenHeight = p.height = window.innerHeight;
        centerX = screenWidth / 2;
        centerY = screenHeight / 2;
        dieX = screenWidth / 2 / options.len;
        dieY = screenHeight / 2 / options.len;
    };

    p.windowResized = (): void => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        screenWidth = p.width = window.innerWidth;
        screenHeight = p.height = window.innerHeight;
        centerX = screenWidth / 2;
        centerY = screenHeight / 2;
        dieX = screenWidth / 2 / options.len;
        dieY = screenHeight / 2 / options.len;
    };

    p.draw = (): void => {

        ++TICK;

        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(0,0,0,${options.repaintAlpha})`;
        ctx.fillRect( 0, 0, screenWidth, screenHeight );
        ctx.globalCompositeOperation = 'lighter';

        if (lines.length < options.count &&
            Math.random() < options.spawnChance) {
            lines.push(new HexLine(dieX, dieY));
        }

        lines.forEach((line: HexLine) => line.step(p, ctx, centerX, centerY));
    };
};