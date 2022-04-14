import React from "react";
import { resolve } from "inversify-react";

import { Container, Row, Col } from "react-bootstrap";

import { IDateService } from "../../services/DateService";

import "./Copyright.scss";

export class Copyright extends React.Component<{}> {
  @resolve("DateService") private readonly dateService!: IDateService;

  render(): JSX.Element {
    return (
      <section className="section copyright-footer">
        <Container fluid>
          <Row>
            <Col>
              <span className="copyright">Copyright</span>
              <span>{this.dateService.CurrentYear()} Daniel Clarke</span>
            </Col>
          </Row>
          <div className="centered short-line" />
        </Container>
      </section>
    );
  }
}
