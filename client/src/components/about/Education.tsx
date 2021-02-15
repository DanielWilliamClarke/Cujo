import React, { Component } from "react";
import { Education as EducationData } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import moment from "moment";

import "../../shared/Section.scss";
import "./Education.scss";

type EducationProps = {
  education: EducationData[];
};

export class Education extends Component<EducationProps> {
  private dateFormat = "DD/MM/YYYY";

  render(): JSX.Element {
    return (
      <section className="Section Education">
        <Container>
          <Row>
            <Col>
              <h2 className="Section-title">Education</h2>
              <div className="Centered Line"/>
            </Col>
          </Row>

          {this.props.education.map((e) => (
            <div>
              <Row className="Section-content">
                <Col className="Centered Qualification-type">
                  <h4>{e.institution}</h4>
                  <h6>
                    {e.studyType}
                    <span className="Dot" />
                    {e.area}
                  </h6>
                </Col>
              </Row>

              <Row className="Section-content">
                <Col className="Centered">
                  <h5>
                    <b>{e.grade}</b>
                  </h5>
                </Col>
              </Row>

              <Row className="Section-content Period">
                <Col className="Centered">
                  <span>
                    <b>Period:</b>
                  </span>
                  <span className="Date-range">
                    <span>{this.toDateSentence(e.startDate)}</span>
                    <span className="Dash" />
                    <span>{this.toDateSentence(e.endDate)}</span>
                  </span>
                </Col>
              </Row>

              <Row className="Section-content Period">
                <Col className="Centered">
                  <p>{e.summary}</p>
                </Col>
              </Row>

              <Row className="Images">
                {e.images.map((image) => (
                  <Col className="Col-item">
                    <img
                      className="Centered Image-item"
                      src={image}
                      alt="not found..."
                    />
                  </Col>
                ))}
              </Row>

              <div className="Centered Short-line"/>
            </div>
          ))}
        </Container>
      </section>
    );
  }

  private toDateSentence(date: string): string {
    if (date === "Present") {
      return date;
    }
    return moment(date, this.dateFormat).format("MMMM YYYY");
  }
}
