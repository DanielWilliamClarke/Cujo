import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { resolve } from "inversify-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { IoSchoolOutline } from "react-icons/io5";

import { IDateService } from "../../services/DateService";
import { Education as EducationData } from "../../model/CVModel";
import { DynamicImage } from "../shared/DynamicImage";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";

import "../shared/Portfolio.scss";
import "./Education.scss";

type EducationProps = {
  education: EducationData[];
};

export class Education extends Component<EducationProps> {
  @resolve("DateService") private readonly dateService!: IDateService;
  componentWillMount() {
    this.dateService.format("MMMM YYYY", "DD/MM/YYYY");
  }

  render(): JSX.Element {
    return (
      <Section
        id="education"
        title="Education"
        icon={IoSchoolOutline}>

        <VerticalTimeline className="timeline">
          {this.props.education
            .sort((a, b) =>
              this.dateService.toUnix(b.startDate) -
              this.dateService.toUnix(a.startDate))
            .map((e: EducationData, index: number) => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                key={index}
                date={this.dateService.toRange(e.startDate, e.endDate)}
                icon={<IoSchoolOutline />}
              >
                {this.renderInstitution(e)}
              </VerticalTimelineElement>
            ))}
        </VerticalTimeline>

      </Section>
    );
  }

  private renderInstitution(e: EducationData): JSX.Element {
    return (
      <>
        {e.grade !== "" && (<Lanyard tags={[e.grade]} />)}

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
      </>
    )
  }
}
