import React, { Component } from "react";
import { Container, Row, Col, Card, CardColumns } from "react-bootstrap";

import { Project } from "../../model/CVModel";
import { DynamicImage } from "../shared/DynamicImage";

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
              <h2 className="section-title">Projects</h2>
              <div className="centered line" />
            </Col>
          </Row>
          <CardColumns className="section-content">
            {this.props.projects.map(
              (p: Project): JSX.Element => this.projectCard(p)
            )}
          </CardColumns>
          <div className="centered short-line" />
        </Container>
      </section>
    );
  }

  private projectCard(p: Project): JSX.Element {
    return (
      <Card bg="dark">
        <Card.Body>
          {p.image.length && (
            <DynamicImage
              image={p.image}
              alt={`${p.name} project image`}
              className="centered image-item"
            />
          )}
          <div className="card-content">
            <Card.Title>{p.name}</Card.Title>
            <div className="centered short-line" />
            <Card.Text>{p.summary}</Card.Text>
          </div>
        </Card.Body>
        <Card.Footer>
          <a href={p.link} rel="noopener noreferrer" target="_blank">
            See more!
          </a>
        </Card.Footer>
      </Card>
    );
  }
}
