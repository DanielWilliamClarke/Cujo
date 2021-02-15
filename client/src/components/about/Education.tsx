import React, { Component } from "react";
import { CVProps, Education as EducationData } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import moment from "moment";

import "../../shared/Section.scss";
import "./Experience.scss";

export class Education extends Component<CVProps> {
  private dateFormat = "DD/MM/YYYY";

  render(): JSX.Element {
    return (
      <section className="Section Experience">
        <Container>
          <Row>
            <Col>
              <h2 className="Section-title">Education</h2>
              <div className="Centered Line"></div>
            </Col>
          </Row>

         
        </Container>
      </section>
    );
  }

  private toDateSentence(date: string): string {
    if (date === "Present") {
      return date;
    }
    return moment(date, this.dateFormat).format("MMM YY");
  }
}
