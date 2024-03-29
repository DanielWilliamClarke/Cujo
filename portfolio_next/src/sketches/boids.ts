import p5 from 'p5';

import { CV, Skill, Work } from '@Models/CVModel';

import { DateService, IDateService } from '@Services/DateService';

import { anton } from '@Common/Font';

import { Sketch } from '.';

type BoidsWord = {
  word: string;
  angle: number;
};

export class Boids implements Sketch {
  private readonly vehicles: Vehicle[] = [];
  private readonly dotSize: number = 10;
  private readonly sampleFactor: number = 0.1;

  private wordIndex = 0;

  private readonly words: BoidsWord[];

  constructor(
    private readonly p: p5,
    private readonly cv: CV,
    private readonly currentRole: Work,
    private readonly dateService: IDateService = new DateService(),
    private readonly noiseGenerator: NoiseGenerator = new NoiseGenerator(p),
  ) {
    this.dateService.format('MMMM YYYY', 'YYYY-MM-DD');

    this.words = [
      ...this.cv.about.entry.name.split(' '),
      ...currentRole.position.split(' '),
      this.currentRole.company,
      ...[
        ...this.cv.skills.entry.favorite.map((skill: Skill) => skill.name),
        ...this.cv.skills.entry.current.map((skill: Skill) => skill.name),
        // ...this.cv.skills.entry.used.map((skill: Skill) => skill.name)
      ].sort(() => Math.random() - 0.5),
    ].map((word: string, index: number) => ({
      word,
      angle: index % 2 ? 270 : -270,
    }));
  }

  private myFont!: p5.Font;
  preload() {
    anton.className;
    this.myFont = this.p.loadFont('./fonts/Anton-Regular.ttf');
  }

  setup() {
    this.p.frameRate(60);
    this.p.createCanvas(window.innerWidth, window.innerHeight, this.p.WEBGL);
    // this.p.setRe
    this.p.colorMode(this.p.HSB);
    this.p.smooth();
    this.p.noStroke();

    const { word, angle } = this.words[this.wordIndex];
    this.setupBoidsForWord(word, angle);
    setInterval(() => {
      this.wordIndex++;
      if (this.wordIndex >= this.words.length) {
        this.wordIndex = 0;
      }
      const { word, angle } = this.words[this.wordIndex];
      this.setupBoidsForWord(word, angle);
    }, 3000);
  }

  windowResized() {
    this.p.resizeCanvas(window.innerWidth, window.innerHeight);
  }

  draw() {
    this.p.background(0);
    this.p.rotateX(120);

    // this.p.rotateY(this.words[this.wordIndex].angle);
    this.p.scale(0.2);

    this.vehicles.forEach((v: Vehicle) =>
      v.behaviors(this.noiseGenerator.getCoord()).update().show(),
    );
  }

  private readonly setupBoidsForWord = (newText: string, angle: number) => {
    const fontSize = this.getFontSizeTextInBounds(
      newText,
      this.p.width * 3,
      this.p.height * 3,
    );
    const bounds = this.myFont.textBounds(newText, 0, 0, fontSize) as {
      w: number;
      h: number;
    };
    const x = this.p.width / 2 - bounds.w / 2;
    const y = this.p.height / 2 + bounds.h / 2;
    const points = this.myFont.textToPoints(newText, x, y, fontSize, {
      sampleFactor: this.sampleFactor,
    });

    this.migrateToNewPoints(points, angle);
  };

  private readonly getFontSizeTextInBounds = (
    text: string,
    boundsWidth: number,
    boundsHeight: number,
  ): number => {
    let fontSize = 1;
    let bounds = { w: 0, h: 0 };
    while (bounds.w < boundsWidth && bounds.h < boundsHeight) {
      fontSize += 2;
      bounds = this.myFont.textBounds(text, 0, 0, fontSize) as {
        w: number;
        h: number;
      };
    }
    return fontSize;
  };

  private readonly migrateToNewPoints = (
    points: p5.Vector[],
    angle: number,
  ) => {
    if (this.vehicles.length === 0) {
      // FIRST TIME CREATION
      this.vehicles.push(
        ...points.map(
          (point: p5.Vector): Vehicle =>
            new Vehicle(
              this.p,
              this.dotSize,
              this.p.createVector(point.x, point.y),
              this.p.createVector(
                this.p.random(this.p.width),
                this.p.random(this.p.height),
              ),
              this.p.createVector(),
              this.p.createVector(this.p.random(), this.p.random()),
            ),
        ),
      );
    } else {
      const difference = points.length - this.vehicles.length;
      const randomIndex = this.p.floor(this.p.random(this.vehicles.length));
      if (difference > 0) {
        // MORE POINTS NEEDED
        for (let i = 0; i < difference; i++) {
          this.vehicles.splice(
            randomIndex,
            0,
            this.vehicles[randomIndex].copy(),
          );
        }
      } else if (difference < 0) {
        // LESS POINTS NEEDED
        for (let j = 0; j < -difference; j++) {
          this.vehicles.splice(randomIndex, 1);
        }
      }
    }

    // with randomised targets
    this.vehicles
      .map((value, index) => ({ value, sort: this.p.noise(index) }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .forEach((v, index, { length }) => {
        const vec = this.p.createVector(points[index].x, points[index].y);
        v.setTarget(vec.rotate(angle));
        const hue = this.p.map(index, 0, length, 0, 255);
        v.setColor(new HSLA(hue, 60, 100));
        v.setSize(this.p.max(10, this.p.width * 0.001));
      });
  };
}

class HSLA {
  constructor(
    public h: number = 255,
    public s: number = 255,
    public b: number = 255,
    public a: number = 255,
  ) {}
}

class Vehicle {
  private color!: HSLA;
  private readonly arriveDistance: number = 100;
  private readonly fleeRadius: number = 100;
  private readonly maxSpeed: number = 20;
  private readonly maxForce: number = 4;

  constructor(
    private readonly p: p5,
    private radius: number,
    private target: p5.Vector,
    private readonly position: p5.Vector,
    private readonly acceleration: p5.Vector,
    private readonly velocity: p5.Vector,
  ) {}

  copy() {
    return new Vehicle(
      this.p,
      this.radius,
      this.target.copy(),
      this.position.copy(),
      this.acceleration.copy(),
      this.velocity.copy(),
    );
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
    return this;
  }

  show(point: p5.Vector = this.position, color: HSLA = this.color) {
    this.p.push();

    this.p.translate(point.x - this.p.width / 2, point.y - this.p.height / 2);

    this.p.fill(color.h, color.s, color.b, color.a);
    this.p.noStroke();
    this.p.ellipse(0, 0, this.radius, this.radius);

    this.p.pop();
  }

  behaviors(agitator: p5.Vector) {
    const arrive = this.arrive(this.target);
    const flee = this.flee(agitator);

    // const oldR = this.radius;
    // this.radius = 50;
    // this.show(agitator, new HSLA(255, 255, 255, 255))
    // this.radius = oldR;

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);

    return this;
  }

  setTarget(t: p5.Vector) {
    this.target = t;
  }

  setColor(c: HSLA) {
    this.color = c;
  }

  setSize(s: number) {
    this.radius = s;
  }

  applyForce(f: p5.Vector) {
    this.acceleration.add(f);
  }

  arrive(target: p5.Vector) {
    const desired = target.copy().sub(this.position);
    const d = desired.mag();
    let speed = this.maxSpeed;
    if (d < this.arriveDistance) {
      speed = this.p.map(d, 0, this.arriveDistance, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    const steer = desired.copy().sub(this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  flee(target: p5.Vector) {
    const desired = target.copy().sub(this.position);
    const d = desired.mag();
    if (d < this.fleeRadius) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      const steer = desired.copy().sub(this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return this.p.createVector(0, 0);
    }
  }
}

class NoiseGenerator {
  constructor(
    private readonly p: p5,
    private xoff: number = 0,
    private yoff: number = 0,
  ) {}

  getCoord(): p5.Vector {
    this.xoff += 0.00001;
    this.yoff += 0.00001;
    return this.p.createVector(
      this.p.noise(this.xoff) * this.p.width,
      this.p.height / 2 + this.p.sin(this.yoff) * (this.p.height / 4),
    );
  }
}
