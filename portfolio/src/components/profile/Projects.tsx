import { Component } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";

import { BsLightning } from "react-icons/bs";

import { Project } from "../../model/CVModel";
import { DevIconName } from "../shared/DevIcon";
import { DynamicImage } from "../shared/DynamicImage";

import "../shared/Portfolio.scss";
import "./Projects.scss";

const Fade = require("react-reveal/Fade");

type ProjectProps = {
  projects: Project[];
};

export class Projects extends Component<ProjectProps> {
  render(): JSX.Element {
    return (
      <section id="projects" className="section projects">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">Personal Projects</h2>
            </Col>
          </Row>
          {this.props.projects.map(this.project.bind(this))}
          <div className="centered short-line" />
          <BsLightning className="section-icon" />
        </Container>
      </section>
    );
  }

  private project(p: Project, index: number): JSX.Element {
    return (
      <Container className="project-panels">
        <Fade right={index % 2 === 0} left={index % 2 !== 0}>
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
          <DynamicImage
            image={p.image}
            alt={`${p.name} project image`}
            className="centered image-item"
          />
        )}
      </Col>
    );
  }

  private projectContent(p: Project): JSX.Element {
    return (
      <Col className="project-content">
        <div className="content">
          <h2>{p.name}</h2>
          {p.tags.map((tag) => (
            <Badge bg="portfolio" className="highlight">
              {tag}
            </Badge>
          ))}
          <div className="summary">{p.summary}</div>
        </div>
        <div className="links">
          <a href={p.link} rel="noopener noreferrer" target="_blank">
            <DevIconName icon={p.icon} />
          </a>
        </div>
      </Col>
    );
  }
}
