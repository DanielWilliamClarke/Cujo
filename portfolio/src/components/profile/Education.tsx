import { resolve } from "inversify-react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Entries, Media } from "../../model/Includes";
import { Education as EducationModel } from "../../model/CVModel";
import { IDateService } from "../../services/DateService";
import { IconWithDefaultState, IIconService } from "../../services/IconService";
import { DynamicImage } from "../shared/DynamicImage";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";

import "../shared/Portfolio.scss";
import "./Education.scss";

type EducationProps = {
  education: Entries<EducationModel>;
};

export class Education extends React.Component<
  EducationProps,
  IconWithDefaultState
> {
  @resolve(IDateService.$) private readonly dateService!: IDateService;
  @resolve(IIconService.$) private readonly iconService!: IIconService;

  constructor(props: EducationProps, context: {}) {
    super(props, context);
    this.dateService.format("MMMM YYYY", "YYYY-MM-DD");
    this.state = { icon: this.iconService.getWithDefault("school") };
  }

  render(): JSX.Element {
    return (
      <Section id="education" title="Education">
        <VerticalTimeline className="timeline">
          {this.props.education.entries
            .sort(
              (a, b) =>
                this.dateService.toUnix(b.startDate.toString()) -
                this.dateService.toUnix(a.startDate.toString())
            )
            .map((e: EducationModel, index: number) => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                key={index}
                date={this.dateService.toRange(
                  e.startDate.toString(),
                  e.endDate.toString()
                )}
                icon={<this.state.icon />}
              >
                {this.renderInstitution(e)}
              </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
      </Section>
    );
  }

  private renderInstitution(e: EducationModel): JSX.Element {
    return (
      <>
        {e.grade !== "" && <Lanyard tags={[e.grade]} />}

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
          <Col>{documentToReactComponents(e.summary)}</Col>
        </Row>

        <Row className="images">
          {e.images.map((image: Media) => (
            <Col className="col-item">
              <a href={e.link} rel="noopener noreferrer" target="_blank">
                <DynamicImage
                  image={image.file.url}
                  alt={`${e.institution} - Image not found!`}
                  className="centered image-item"
                />
              </a>
            </Col>
          ))}
        </Row>

        <div className="centered short-line" />
      </>
    );
  }
}
