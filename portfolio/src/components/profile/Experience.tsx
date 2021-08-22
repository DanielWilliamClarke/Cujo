import { Component } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { MdWork } from "react-icons/md";

import { DateFormatter } from "../shared/DateUtils";
import { Work } from "../../model/CVModel";
import { DynamicImage } from "../shared/DynamicImage";

import "../shared/Portfolio.scss";
import "./Experience.scss";

type WorkProps = {
  work: Work[];
};

export class Experience extends Component<WorkProps> {
  private formatter = new DateFormatter("MMMM YYYY", "DD/MM/YYYY");

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
                return (
                  this.formatter.toUnix(b.startDate) -
                  this.formatter.toUnix(a.startDate)
                );
              })
              .map(
                (work: Work, index: number): JSX.Element => (
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    key={index}
                    date={this.formatter.toRangeWithDuration(
                      work.startDate,
                      work.endDate
                    )}
                    icon={<MdWork />}
                  >
                    {work.highlights.map((highlight) => (
                      <Badge bg="portfolio" className="highlight">
                        {highlight}
                      </Badge>
                    ))}

                    <Row className="header">
                      <Col className="headline">
                        <h3>
                          <span>{work.position}</span>
                          <span>@</span>
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
                )
              )}
          </VerticalTimeline>
          <div className="centered short-line" />
        </Container>
      </section>
    );
  }
}
