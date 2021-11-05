import p5 from "p5";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { hex, waves, boxes, phylotaxis, hypercube, grid } from "../../sketches";

import { CVProps } from "../../model/CVModel";

import "./SketchBackstretch.scss";
import { ScrollIndicator } from "./ScrollIndicator";

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

  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    new p5(
      [hex, waves, boxes, phylotaxis, hypercube, grid].sample(),
      this.myRef.current
    );
  }

  render() {
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
          </div>
        </Container>
        <Container fluid className="scroll-indicator">
          <ScrollIndicator />
        </Container>
      </section>
    );
  }
}
