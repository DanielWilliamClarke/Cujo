import p5 from "p5";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { resolve } from "inversify-react";
import { IDateService } from "../../services/DateService";
import { getSketch } from "../../sketches";
import { CVProps } from "../../model/CVModel";

import "./SketchBackstretch.scss";

import { ScrollIndicator } from "./ScrollIndicator";
import { DynamicImage } from "../shared/DynamicImage";

export class SketchBackstretch extends Component<CVProps> {
  @resolve("DateService") private readonly dateService!: IDateService;
  private myRef: React.RefObject<any>;

  constructor(props: CVProps, context: {}) {
    super(props, context);
    this.dateService.format("MMMM YYYY", "DD/MM/YYYY");
    this.myRef = React.createRef();
  }

  componentDidMount() {
    new p5(getSketch(), this.myRef.current);
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
