import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import moment from "moment";
import util from "util";

import { Work } from "../../model/CVModel";
import { DynamicImage } from "../shared/DynamicImage";

import "../shared/Portfolio.scss";
import "./Experience.scss";


type WorkProps = {
  work: Work[];
};

export class Experience extends Component<WorkProps> {
  private dateFormat = "DD/MM/YYYY";

  render(): JSX.Element {
    return (
      <section id="experience" className="section experience">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">Experience</h2>
              <div className="centered line" />
            </Col>
          </Row>

          {this.props.work
            .sort((a, b) => {
              return this.toUnix(b.startDate) - this.toUnix(a.startDate);
            })
            .map(
              (work: Work): JSX.Element => (
                <div>
                  <Row className="section-content">
                    <Col className="centered">
                      <h6>
                        <a
                          href={work.website}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <DynamicImage
                            image={work.logo}
                            alt={`${work.company} - Image not found!`}
                            className="centered image-item work-logo"
                          />
                        </a>
                      </h6>
                      <h4>{work.position}</h4>
                    </Col>
                  </Row>

                  <Row className="period">
                    <Col className="centered">
                      <span className="date-range">
                        <span>{this.toDateSentence(work.startDate)}</span>
                        <span className="dash" />
                        <span>{this.toDateSentence(work.endDate)}</span>
                        <span className="dot" />
                        <span>
                          <b>{this.toDuration(work.startDate, work.endDate)}</b>
                        </span>
                      </span>
                    </Col>
                  </Row>

                  <Row className="section-content highlights">
                    {work.highlights.map((highlight) => (
                      <Col className="col-item">
                        <p>{highlight}</p>
                      </Col>
                    ))}
                  </Row>

                  <Row className="section-content">
                    <Col>
                      <ReactMarkdown source={work.summary} plugins={[breaks]} />
                    </Col>
                  </Row>

                  <Row className="images">
                    {work.images.map((image) => (
                      <Col className="col-item">
                        <DynamicImage
                          image={image}
                          alt={`${work.position} - Image not found!`}
                          className="centered image-item"
                        />
                      </Col>
                    ))}
                  </Row>

                  <div className="centered short-line" />
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
