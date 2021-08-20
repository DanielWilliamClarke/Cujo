import React, { Component } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import moment from "moment";
import util from "util";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { MdWork } from "react-icons/md"

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

          <VerticalTimeline className="timeline">
            {this.props.work
              .sort((a, b) => {
                return this.toUnix(b.startDate) - this.toUnix(a.startDate);
              })
              .map(
                (work: Work, index: number): JSX.Element => (
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    key={index}
                    date={this.toRange(work.startDate, work.endDate)}
                    icon={<MdWork />}
                  >
                    {work.highlights.map((highlight) => (
                      <Badge bg="primary" className="highlight">{highlight}</Badge>
                    ))}

                    <Row className="header">
                      <Col className="headline">
                        <h3>
                          <span>
                            {work.position}
                          </span>
                          <span>
                            @
                          </span>
                          <span>
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
                          </span>
                        </h3>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <ReactMarkdown
                          children={work.summary}
                          remarkPlugins={[breaks]}
                        />
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
                  </VerticalTimelineElement>
                ))}
          </VerticalTimeline>
          <div className="centered short-line" />
        </Container>
      </section>
    );
  }

  private toUnix(date: string): number {
    return moment(date, this.dateFormat).unix();
  }

  private toRange(start: string, end: string): string {
    return `${this.toDateSentence(start)} - ${this.toDateSentence(end)} (${this.toDuration(start, end)})`;
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
      endMoment.diff(moment(start, this.dateFormat)));
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
