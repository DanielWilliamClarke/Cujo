import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { CVProps } from "../../model/CVModel";

import "./Backstretch.scss";

export class Backstretch extends Component<CVProps> {
  render(): JSX.Element {
    return (
        <Container fluid className="backstretch">
        <div>
          <Row className="backstretch-main">
            <Col>{this.props.cv.basics.name}</Col>
          </Row>
          <div className="centered line"></div>
          <Row className="backstretch-tag">
            <Col>{this.props.cv.basics.label}</Col>
          </Row>
        </div>
      </Container> 
    );
  }
}
