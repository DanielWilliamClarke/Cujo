import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

import { Entries } from "../../model/Includes";
import { Project } from "../../model/CVModel";
import { DevIconName } from "../shared/DevIcon";
import { DynamicImage } from "../shared/DynamicImage";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";

import "../shared/Portfolio.scss";
import "./Projects.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

type ProjectProps = {
  projects: Entries<Project>;
};

export class Projects extends Component<ProjectProps> {
  render(): JSX.Element {
    return (
      <Section id="projects" title="Personal Projects" noSeparator>
        {this.props.projects.entries
          .sort((pA, pB) => pA.rank - pB.rank)
          .map(this.project.bind(this))}
      </Section>
    );
  }

  private project(p: Project, index: number): JSX.Element {
    return (
      <Container className="project-panels">
        <Fade triggerOnce direction={index % 2 ? "left" : "right"}>
          <div className="centered line" />
          <Row className="project">
            {this.projectImage(p)}
            {this.projectContent(p)}
          </Row>
        </Fade>
      </Container>
    );
  }

  private projectImage(p: Project): JSX.Element {
    return (
      <Col className="project-image">
        {p.image && (
          <a
            className="image-link"
            href={p.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <DynamicImage
              image={p.image.file.url}
              alt={`${p.name} project image`}
              className="centered image-item"
            />
            <div className="overlay" />
            <DevIconName icon={p.icon} />
          </a>
        )}
      </Col>
    );
  }

  private projectContent(p: Project): JSX.Element {
    return (
      <Col className="project-content">
        <div className="content">
          <h2>{p.name}</h2>
          <Lanyard tags={p.tags} />
          {documentToReactComponents(p.summary)}
        </div>
      </Col>
    );
  }
}
