import React, { Component } from "react";
import { Project } from "../../model/CV";
import { Container, Row, Col, Card, CardColumns } from "react-bootstrap";
import { ImageLocator } from "../shared/DynamicImage";

import "../../shared/Section.scss";
import "./Education.scss";

type ProjectProps = {
  projects: Project[];
};

export class Projects extends Component<ProjectProps> {
  render(): JSX.Element {
    return (
      <section id="projects" className="Section Projects">
        <Container>
          <Row>
            <Col>
              <h2 className="Section-title">Projects</h2>
              <div className="Centered Line" />
            </Col>
          </Row>
          <CardColumns className="Section-content">
            {this.props.projects.map(
              (p: Project): JSX.Element => this.projectCard(p)
            )}
          </CardColumns>
        </Container>
      </section>
    );
  }

  private projectCard(p: Project): JSX.Element {
    return (
      <Card bg="dark">
        {p.image.length && (
          <Card.Img
            variant="top"
            src={ImageLocator.buildImageUri(p.image)}
          />
        )}
        <Card.Body>
          <Card.Title>{p.name}</Card.Title>
          <Card.Text>{p.summary}</Card.Text>
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