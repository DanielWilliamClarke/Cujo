import React, { Component } from "react";
import { CVProps } from "../../model/CV";

import { Container, Row, Col } from "react-bootstrap";

import "./Backstretch.scss";

export class Backstretch extends Component<CVProps> {
  render(): JSX.Element {
    return (
        <Container fluid className="Backstretch">
        <div>
          <Row className="Backstretch-main">
            <Col>{this.props.cv.basics.name}</Col>
          </Row>
          <Row className="Backstretch-tag">
            <Col>{this.props.cv.basics.label}</Col>
          </Row>
        </div>
      </Container> 
    );
  }
}
