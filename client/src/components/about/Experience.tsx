import React, { Component } from "react";
import { CVProps, Work } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import moment from "moment";
import util from "util";

import "../../shared/Section.scss";
import "./Experience.scss";

type WorkProps = {
  work: Work[];
};

export class Experience extends Component<WorkProps> {
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

          {this.props.work
            .sort((a, b) => {
              return this.toUnix(b.startDate) - this.toUnix(a.startDate);
            })
            .map(
              (work: Work): JSX.Element => (
                <div>
                  <Row className="Section-content">
                    <Col className="Centered">
                      <h4>{work.position}</h4>
                      <h6>
                        <a
                          href={work.website}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {work.company}
                        </a>
                      </h6>
                    </Col>
                  </Row>

                  <Row className="Section-content Period">
                    <Col className="Centered">
                      <span>
                        <b>Period:</b>
                      </span>
                      <span className="Date-range">
                        <span>{this.toDateSentence(work.startDate)}</span>
                        <span className="Dash" />
                        <span>{this.toDateSentence(work.endDate)}</span>
                        <span className="Dot" />
                        <span>
                          <b>{this.toDuration(work.startDate, work.endDate)}</b>
                        </span>
                      </span>
                    </Col>
                  </Row>

                  <Row className="Section-content Highlights">
                    {work.highlights.map((highlight) => (
                      <Col className="Col-item">
                        <p>{highlight}</p>
                      </Col>
                    ))}
                  </Row>

                  <Row className="Section-content">
                    <Col>
                      <ReactMarkdown source={work.summary} plugins={[breaks]} />
                    </Col>
                  </Row>

                  <Row className="Images">
                    {work.images.map((image) => (
                      <Col className="Col-item">
                        <img
                          className="Centered Image-item"
                          src={image}
                          alt="not found..."
                        />
                      </Col>
                    ))}
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
    return moment(date, this.dateFormat).format("MMMM YYYY");
  }

  private toDuration(start: string, end: string): string {
    let endMoment = moment(end, this.dateFormat);
    if (end === "Present") {
      endMoment = moment();
    }
    const difference = moment.duration(
      endMoment.diff(moment(start, this.dateFormat))
    );
    const years = difference.years();
    const months = difference.months();
    const yearFormat = years
      ? util.format("%d year%s", years, years === 1 ? "" : "s")
      : "";
    const monthFormat = months
      ? util.format("%d month%s", months, months === 1 ? "" : "s")
      : "";
    return `${yearFormat} ${monthFormat}`;
  }
}
