import p5 from "p5";

const fontName = require("../assets/QuartzoBold-W9lv.otf").default;

const p5v: { sub(a: p5.Vector, b: p5.Vector): p5.Vector } = p5.Vector;

export function boids(p: p5): void {

  const vehicles: Vehicle[] = [];

  const padding = 100;
  const dotSize: number = 10;
  const sampleFactor: number = 0.1;

  let wordIndex = 0;
  const words = [
    "Daniel William Clarke",
    "Software Engineer",
    "Freetrade",
    "Rust",
    "Golang",
    "C++",
    "Kotlin",
    "Swift"
  ]

  let myFont: p5.Font;
  p.preload = () => {
    myFont = p.loadFont(fontName);
  }

  p.setup = (): void => {
    p.frameRate(60);
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.colorMode(p.HSB);
    p.smooth();
    p.noStroke();

    setupBoidsForWord(words[wordIndex]);
    setInterval(() => {
      wordIndex++
      if (wordIndex >= words.length) {
        wordIndex = 0
      }
      setupBoidsForWord(words[wordIndex]);
    }, 3000);
  }

  p.windowResized = (): void => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    setupBoidsForWord("Daniel William Clarke");
  }

  p.draw = (): void => {
    p.background(0);
    p.rotateX(120);
    vehicles.forEach((v: Vehicle) => v.behaviors().update().show())
  }

  const setupBoidsForWord = (newText: string) => {
      const fontSize = getFontSizeTextInBounds(newText, p.width - padding, p.height - padding);
      var bounds = myFont.textBounds(newText, 0, 0, fontSize) as {w: number, h: number};
      const y = (p.height / 2) + (bounds.h / 2);
      const points = myFont.textToPoints(newText, 0, y, fontSize, {sampleFactor});
      migrateToNewPoints(points);
  }

  const getFontSizeTextInBounds = (text: string, boundsWidth: number, boundsHeight: number): number => {
    let fontSize = 1;
    let bounds = { w: 0, h: 0 };
    while(bounds.w < boundsWidth && bounds.h < boundsHeight){
        fontSize +=2;
        bounds = myFont.textBounds(text, 0, 0, fontSize) as {w: number, h: number};
    }
    return fontSize;
  }

  const migrateToNewPoints = (points: p5.Vector[]) => {

    if(!vehicles.length) {
        //FIRST TIME CREATION
        vehicles.push(
          ...points.map((point: p5.Vector): Vehicle =>
            new Vehicle(
              p,
              dotSize,
              p.createVector(point.x, point.y),
              p.createVector(p.random(p.width), p.random(p.height)),
              p.createVector(),
              p5.Vector.random2D())));
    }
    else {
        const difference = points.length - vehicles.length;
        const randomIndex = p.floor(p.random(vehicles.length));
        if(difference > 0) {
            //MORE POINTS NEEDED
            for(var i = 0; i < difference; i++) {
                vehicles.splice(
                  randomIndex,
                  0,
                  vehicles[randomIndex].copy());
            }
        } else if(difference < 0) {
            //LESS POINTS NEEDED
            for(var j = 0; j < -difference; j++) {
                vehicles.splice(randomIndex, 1);
            }
        }
    }

    //set target and color
    vehicles.forEach((v, index, {length}) => {
      v.setTarget(new p5.Vector(points[index].x, points[index].y));

      const hue = p.map(index, 0, length, 0, 255);
      v.setColor(new HSLA(hue, 60, 100));

      v.setSize(dotSize);
    });
  }
}

class HSLA {
  constructor(public h: number = 255, public s: number = 255, public b: number = 255, public a: number = 255)  {}
}

class Vehicle {

  private color!: HSLA;
  private arriveDistance: number = 300;
  private fleeRadius: number = 300;
  private maxSpeed: number = 20;
  private maxForce: number = 4;

  constructor(
    private p: p5,
    private radius: number,
    private target: p5.Vector,
    private position: p5.Vector,
    private acceleration: p5.Vector,
    private velocity: p5.Vector)
  { }

  copy() {
    return new Vehicle(
      this.p,
      this.radius,
      this.target.copy(),
      this.position.copy(),
      this.acceleration.copy(),
      this.velocity.copy())
  }

  update () {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
    return this;
  }

  show () {
    this.p.push();

    this.p.translate(
      this.position.x - (this.p.width / 2),
      this.position.y - (this.p.height / 2));

    this.p.fill(this.color.h, this.color.s, this.color.b, this.color.a);
    this.p.noStroke();
    this.p.box(this.radius, this.radius, this.radius);

    this.p.pop();
  }

  behaviors () {
    var arrive = this.arrive(this.target);
    var mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
    var flee = this.flee(mouse);

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

  applyForce (f: p5.Vector) {
    this.acceleration.add(f);
  }

  arrive (target: p5.Vector) {
    var desired = p5v.sub(target, this.position);
    var d = desired.mag();
    var speed = this.maxSpeed;
    if (d < this.arriveDistance) {
      speed = this.p.map(d, 0, this.arriveDistance, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    var steer = p5v.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  flee (target: p5.Vector) {
    var desired = p5v.sub(target, this.position);
    var d = desired.mag();
    if (d < this.fleeRadius) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      var steer = p5v.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return this.p.createVector(0, 0);
    }
  }
}