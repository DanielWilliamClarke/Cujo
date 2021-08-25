import React, { Component } from "react";

import { Container, Row, Col } from "react-bootstrap";

import "./Copyright.scss";
export class Copyright extends Component<{}> {
  render(): JSX.Element {
    return (
      <section className="section copyright">
        <Container fluid>
          <Row>
            <Col>Copyright © 2021 Daniel Clarke</Col>
          </Row>
          <div className="centered short-line" />
        </Container>
      </section>
    );
  }
}
