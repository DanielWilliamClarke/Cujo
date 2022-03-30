import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";

import { Project } from "../../model/CVModel";
import { DevIconName } from "../shared/DevIcon";
import { DynamicImage } from "../shared/DynamicImage";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";

import "../shared/Portfolio.scss";
import "./Projects.scss";

type ProjectProps = {
  projects: Project[];
};

export class Projects extends Component<ProjectProps> {
  render(): JSX.Element {
    return (
      <Section id="projects" title="Personal Projects" noSeparator>
        {this.props.projects.map(this.project.bind(this))}
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
        {p.image.length && (
          <a
            className="image-link"
            href={p.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <DynamicImage
              image={p.image}
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
          <ReactMarkdown
            className="summary"
            children={p.summary}
            remarkPlugins={[breaks]}
          />
        </div>
      </Col>
    );
  }
}
