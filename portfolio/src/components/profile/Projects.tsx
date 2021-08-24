import { Component } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";

import { GiAnvilImpact } from "react-icons/gi";

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
          <GiAnvilImpact className="section-icon" />
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
          <a className="image-link" href={p.link} rel="noopener noreferrer" target="_blank">
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
          {p.tags.map((tag) => (
            <Badge bg="portfolio" className="highlight">
              {tag}
            </Badge>
          ))}
          <div className="summary">{p.summary}</div>
        </div>
      </Col>
    );
  }
}
