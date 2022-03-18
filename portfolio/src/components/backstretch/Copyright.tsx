import React, { Component } from "react";
import { resolve } from "inversify-react";

import { Container, Row, Col } from "react-bootstrap";

import { IDateService } from "../../services/DateService";

import "./Copyright.scss";

export class Copyright extends Component<{}> {
  @resolve("DateService") private readonly dateService!: IDateService;

  render(): JSX.Element {
    return (
      <section className="section copyright">
        <Container fluid>
          <Row>
            <Col>
              Copyright © {this.dateService.CurrentYear()} Daniel Clarke
            </Col>
          </Row>
          <div className="centered short-line" />
        </Container>
      </section>
    );
  }
}
