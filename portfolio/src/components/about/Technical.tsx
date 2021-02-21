import React, { Component } from "react";
import { DevIcon } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import "../../shared/section.scss";
import "./Technical.scss";

type SkillsProps = {
  skills: DevIcon[];
};

export class Technical extends Component<SkillsProps> {
  render(): JSX.Element {
    return (
      <section id="technical" className="section technical">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">Technical Skills</h2>
              <div className="centered line" />
            </Col>
          </Row>

          <Row className="section-content">
            <Col>
              <p className="centered">
                I have worked with and are proficient with a large varity of
                programming languages, frameworks and tools. For backend web applications I use Golang
                and Nodejs. For frontend; TypeScript and JavaScript, and for
                performant apps, services and games I use C++. I feel most at
                home with C++ and Golang, but I am trying to learn a few{" "}
                <i>esoteric</i> languages such as Rust and Assembly.
              </p>
            </Col>
          </Row>

          <Row className="skills">
            {this.props.skills.map(
              ({ icon, name }: DevIcon): JSX.Element => (
                <Col>
                  <div className="dev-icon">
                    <span className={`icon devicon-${icon}`} />
                    <p className="icon-name">{name}</p>
                  </div>
                </Col>
              )
            )}
          </Row>

          <Row className="section-content">
            <Col>
              <p className="centered">
                <i>And many more!</i>
              </p>
            </Col>
          </Row>
        </Container>
        <div className="centered short-line" />
      </section>
    );
  }
}
