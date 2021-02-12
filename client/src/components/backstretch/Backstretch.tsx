import React, { Component } from "react";
import { CVProps } from "../../model/CV";

import { Container, Row } from "react-bootstrap";

import "./Backstretch.css";

export class Backstretch extends Component<CVProps> {
  render(): JSX.Element {
    return (
        <Container className="Backstretch">
        <Row>
          <Row className="Backstretch-main">
            {this.props.cv.basics.name}
          </Row>
          <Row className="Backstretch-tag">
            {this.props.cv.basics.label}
          </Row>
        </Row>
      </Container>
    );
  }
}
