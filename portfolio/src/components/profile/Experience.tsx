import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { resolve } from "inversify-react";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { IoRocketOutline } from "react-icons/io5";

import { IDateService } from "../../services/DateService";
import { Work } from "../../model/CVModel";
import { DynamicImage } from "../shared/DynamicImage";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";

import "../shared/Portfolio.scss";
import "./Experience.scss";

type WorkProps = {
  work: Work[];
};

export class Experience extends Component<WorkProps> {
  @resolve("DateService") private readonly dateService!: IDateService;
  componentWillMount() {
    this.dateService.format("MMMM YYYY", "DD/MM/YYYY");
  }

  render(): JSX.Element {
    return (
      <Section
        id="experience"
        title="Professional Experience"
        icon={IoRocketOutline}
      >
        <VerticalTimeline className="timeline">
          {this.props.work
            .filter(
              ({ startDate }: Work) => !this.dateService.IsFuture(startDate)
            )
            .sort(
              (a: Work, b: Work) =>
                this.dateService.toUnix(b.startDate) -
                this.dateService.toUnix(a.startDate)
            )
            .map(
              (work: Work, index: number): JSX.Element => (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  key={index}
                  date={this.dateService.toRangeWithDuration(
                    work.startDate,
                    work.endDate
                  )}
                  icon={<IoRocketOutline />}
                >
                  {this.renderRole(work)}
                </VerticalTimelineElement>
              )
            )}
        </VerticalTimeline>
      </Section>
    );
  }

  private renderRole(work: Work): JSX.Element {
    return (
      <>
        <Lanyard tags={[work.company, ...work.highlights]} />

        <Row className="header">
          <Col className="headline">
            <h3>
              <span>{work.position}</span>
              <span>@</span>
              <span>
                <a
                  title={work.company}
                  href={work.website}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <DynamicImage
                    image={work.logo}
                    alt={work.company}
                    className="centered image-item work-logo"
                  />
                </a>
              </span>
            </h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <ReactMarkdown children={work.summary} remarkPlugins={[breaks]} />
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
      </>
    );
  }
}
