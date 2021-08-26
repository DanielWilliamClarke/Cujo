import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

import { GiAnvilImpact } from "react-icons/gi";

import { Project } from "../../model/CVModel";
import { DevIconName } from "../shared/DevIcon";
import { DynamicImage } from "../shared/DynamicImage";
import { Lanyard } from "../shared/Lanyard";

import "../shared/Portfolio.scss";
import "./Projects.scss";

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
          <Lanyard tags={p.tags} />
          <div className="summary">{p.summary}</div>
        </div>
      </Col>
    );
  }
}
