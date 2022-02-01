import p5 from "p5";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { resolve } from "inversify-react";
import { IDateService } from "../../services/DateService";

import {
  hex,
  waves,
  boxes,
  phylotaxis,
  hypercube,
  grid,
  conway,
} from "../../sketches";

import { CVProps } from "../../model/CVModel";

import "./SketchBackstretch.scss";
import { ScrollIndicator } from "./ScrollIndicator";
import { DynamicImage } from "../shared/DynamicImage";

declare global {
  interface Array<T> {
    sample(): T;
  }
}

if (!Array.prototype.sample) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.sample = function (): any {
    return this[Math.floor(Math.random() * this.length)];
  };
}

export class SketchBackstretch extends Component<CVProps> {
  private myRef: React.RefObject<any>;
  @resolve("DateService") private readonly dateService!: IDateService;

  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
  }

  componentWillMount() {
    this.dateService.format("MMMM YYYY", "DD/MM/YYYY");
  }

  componentDidMount() {
    new p5(
      [conway, hex, waves, boxes, phylotaxis, hypercube, grid].sample(),
      this.myRef.current
    );
  }

  render() {
    const currentRole = this.props.cv.work.sort(
      (a, b) =>
        this.dateService.toUnix(b.startDate) -
        this.dateService.toUnix(a.startDate)
    )[0];

    return (
      <section id="home">
        <Container fluid ref={this.myRef} className="sketch-backstretch">
          <div className="backstretch-headline">
            <Row className="backstretch-main">
              <Col>{this.props.cv.basics.name}</Col>
            </Row>
            <div className="centered line"></div>
            <Row className="backstretch-tag">
              <Col>{this.props.cv.basics.label}</Col>
            </Row>
            <Row className="backstretch-logo">
              <Col>
                <DynamicImage
                  image={currentRole.logo}
                  alt={currentRole.company}
                  className="centered image-item work-logo"
                />
              </Col>
            </Row>
          </div>
        </Container>
        <Container fluid className="scroll-indicator">
          <ScrollIndicator />
        </Container>
      </section>
    );
  }
}
