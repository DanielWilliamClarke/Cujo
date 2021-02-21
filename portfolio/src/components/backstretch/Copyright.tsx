import React, { Component } from "react";

import { Container, Row, Col } from "react-bootstrap";

import "./Copyright.scss"

export class Copyright extends Component<{}> {
  render(): JSX.Element {
    return (
      <section className="Section Copyright">
        <Container fluid>
          <Row>
            <Col>Copyright © 2021 Daniel Clarke</Col>
          </Row>
          <div className="Centered Short-line" />
        </Container>
      </section>
    );
  }
}
