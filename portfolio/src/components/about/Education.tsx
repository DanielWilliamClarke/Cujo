import React, { Component } from "react";
import { Education as EducationData } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";

import "../../shared/section.scss";
import "./Education.scss";
import { DynamicImage } from "../shared/DynamicImage";

type EducationProps = {
  education: EducationData[];
};

export class Education extends Component<EducationProps> {
  private dateFormat = "DD/MM/YYYY";

  render(): JSX.Element {
    return (
      <section id="education" className="section education">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">Education</h2>
              <div className="centered line" />
            </Col>
          </Row>

          {this.props.education.map((e) => (
            <div>
              <Row className="section-content">
                <Col className="centered Qualification-type">
                  <h4>{e.institution}</h4>
                  <h6>
                    {e.studyType}
                    <span className="dot" />
                    {e.area}
                  </h6>
                </Col>
              </Row>

              {!!e.grade.length && <Row className="section-content">
                <Col className="centered">
                  <h5>
                    <b>{e.grade}</b>
                  </h5>
                </Col>
              </Row>}

              <Row className="period">
                <Col className="centered">
                  <span className="date-range">
                    <span>{this.toDateSentence(e.startDate)}</span>
                    <span className="dash" />
                    <span>{this.toDateSentence(e.endDate)}</span>
                  </span>
                </Col>
              </Row>

              <Row className="section-content">
                <Col className="centered">
                  <p>{e.summary}</p>
                </Col>
              </Row>

              <Row className="images">
                {e.images.map((image) => (
                  <Col className="col-item">
                    <a href={e.link} rel="noopener noreferrer" target="_blank">
                      <DynamicImage
                        image={image}
                        alt="not found..."
                        className="centered image-item"
                      />
                    </a>
                  </Col>
                ))}
              </Row>

              <div className="centered short-line" />
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
