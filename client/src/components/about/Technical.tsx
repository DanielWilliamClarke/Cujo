import React, { Component } from "react";
import { Skills } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import "../../shared/Section.scss";
import "./Technical.scss";

type SkillsProps = {
  skills: Skills;
};

export class Technical extends Component<SkillsProps> {
  render(): JSX.Element {
    return (
      <section className="Section Technical">
        <Container>
          <Row>
            <Col>
              <h2 className="Section-title">Technical Skills</h2>
              <div className="Centered Line"></div>
            </Col>
          </Row>

          <Row className="Section-content">
            <Col className="Text-column">
              <p className="Centered">
                I have worked with and are proficient with a varity of
                programming languages. For backend web applications I use Golang
                and Nodejs. For frontend; TypeScript and JavaScript, and for
                performant apps, services and games I use C++. I feel most at
                home with C++ and Golang, but I am trying to learn a few{" "}
                <i>esoteric</i> languages such as Rust and Assembly.
              </p>
            </Col>
          </Row>

          <Row className="Languages">
            {this.props.skills.programming.map((lang) => (
              <Col className="Col-item">
                <p>{lang}</p>
              </Col>
            ))}
          </Row>

          <Row className="Section-content">
            <h4 className="Centered">Frequently used Technologies</h4>
          </Row>

          <Row className="Section-content Skills">
            <Col>
              <h4>Frameworks</h4>
              <div className="Centered Short-line" />
              {this.renderSkills(this.props.skills.frameworks)}
            </Col>
            <Col>
              <h4>Tools</h4>
              <div className="Centered Short-line" />
              {this.renderSkills(this.props.skills.tools)}
            </Col>
            <Col>
              <h4>CI/CD</h4>
              <div className="Centered Short-line" />
              {this.renderSkills(this.props.skills.devtools)}
            </Col>
            <Col>
              <h4>Software</h4>
              <div className="Centered Short-line" />
              {this.renderSkills(this.props.skills.software)}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  private renderSkills(skills: string[]): JSX.Element {
    return (
      <ul className="Skills">
        {skills.map((item: string) => (
          <li>
            <ReactMarkdown source={item} />
          </li>
        ))}
      </ul>
    );
  }
}
