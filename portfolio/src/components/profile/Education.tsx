import React, { Component } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import moment from "moment";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { MdSchool } from "react-icons/md";

import { Education as EducationData } from "../../model/CVModel";
import { DynamicImage } from "../shared/DynamicImage";

import "../shared/Portfolio.scss";
import "./Education.scss";

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

          <VerticalTimeline className="timeline">
            {this.props.education.map(
              (e: EducationData, index: number) => (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  key={index}
                  date={this.toRange(e.startDate, e.endDate)}
                  icon={<MdSchool />}
                >
                  {!!e.grade.length && (
                    <Row>
                      <Col>
                        <h4>
                          <Badge bg="success" className="highlight">{e.grade}</Badge>
                        </h4>
                      </Col>
                    </Row>
                  )}

                  <Row className="header">
                    <Col className="Qualification-type">
                      <h3>{e.institution}</h3>
                      <h4>
                        {e.studyType}
                        <span className="dot" />
                        {e.area}
                      </h4>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <p>{e.summary}</p>
                    </Col>
                  </Row>

                  <Row className="images">
                    {e.images.map((image) => (
                      <Col className="col-item">
                        <a
                          href={e.link}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <DynamicImage
                            image={image}
                            alt={`${e.institution} - Image not found!`}
                            className="centered image-item"
                          />
                        </a>
                      </Col>
                    ))}
                  </Row>

                  <div className="centered short-line" />
                </VerticalTimelineElement>
              ))}
          </VerticalTimeline>
          <div className="centered short-line" />
        </Container>
      </section>
    );
  }

  private toRange(start: string, end: string): string {
    return `${this.toDateSentence(start)} - ${this.toDateSentence(end)}`;
  }

  private toDateSentence(date: string): string {
    if (date === "Present") {
      return date;
    }
    return moment(date, this.dateFormat).format("MMMM YYYY");
  }
}
