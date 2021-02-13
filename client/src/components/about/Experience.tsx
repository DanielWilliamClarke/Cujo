import React, { Component } from "react";
import { CVProps, Work } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import moment from "moment";

import "../../shared/Section.css";
import "./Experience.css";

export class Experience extends Component<CVProps> {
  private dateFormat = "DD/MM/YYYY";

  render(): JSX.Element {
    return (
      <section className="Section Experience">
        <Container>
          <Row>
            <Col>
              <h2 className="Section-title">Experience</h2>
              <div className="Centered Line"></div>
            </Col>
          </Row>

          {this.props.cv.work
            .sort((a, b) => {
              return this.toUnix(b.startDate) - this.toUnix(a.startDate);
            })
            .map(
              (work: Work): JSX.Element => (
                <div>
                  <Row className="Section-content">
                    <Col className="Centered">
                      <h4>{work.position}</h4>
                      <h6>{work.company}</h6>
                    </Col>
                  </Row>
                  <Row className="Highlights">
                    {work.highlights.map((highlight) => (
                      <Col className="Col-item">
                        <p>{highlight}</p>
                      </Col>
                    ))}
                  </Row>

                  <Row>
                    <Col>
                      <ReactMarkdown source={work.summary} plugins={[breaks]} />
                    </Col>
                  </Row>

                  <Row className="Period">
                    <Col className="Centered">
                      <span>
                        <b>Period:</b>
                      </span>
                      <span>{this.toDateSentence(work.startDate)}</span>-
                      <span>{this.toDateSentence(work.endDate)}</span>•
                      <span>
                        {this.toDuration(work.startDate, work.endDate)}
                      </span>
                    </Col>
                  </Row>

                  <div className="Centered Short-line"></div>
                </div>
              )
            )}
        </Container>
      </section>
    );
  }

  private toUnix(date: string): number {
    return moment(date, this.dateFormat).unix();
  }

  private toDateSentence(date: string): string {
    if (date === "Present") {
      return date;
    }
    return moment(date, this.dateFormat).format("MMM YY");
  }

  private toDuration(start: string, end: string): string {
    if (end === "Present") {
      return moment(start, this.dateFormat).fromNow(true);
    }
    return moment(start, this.dateFormat).from(
      moment(end, this.dateFormat),
      true
    );
  }
}
