import React, { Component } from "react";
import { DevIcon } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import "../../shared/Section.scss";
import "./Technical.scss";

type SkillsProps = {
  skills: DevIcon[];
};

export class Technical extends Component<SkillsProps> {
  render(): JSX.Element {
    return (
      <section id="technical" className="Section Technical">
        <Container>
          <Row>
            <Col>
              <h2 className="Section-title">Technical Skills</h2>
              <div className="Centered Line" />
            </Col>
          </Row>

          <Row className="Section-content">
            <Col>
              <p className="Centered">
                I have worked with and are proficient with a large varity of
                programming languages, frameworks and tools. For backend web applications I use Golang
                and Nodejs. For frontend; TypeScript and JavaScript, and for
                performant apps, services and games I use C++. I feel most at
                home with C++ and Golang, but I am trying to learn a few{" "}
                <i>esoteric</i> languages such as Rust and Assembly.
              </p>
            </Col>
          </Row>

          <Row className="Skills">
            {this.props.skills.map(
              ({ icon, name }: DevIcon): JSX.Element => (
                <Col>
                  <div className="Dev-icon">
                    <span className={`Icon devicon-${icon}`} />
                    <p className="Icon-name">{name}</p>
                  </div>
                </Col>
              )
            )}
          </Row>

          <Row className="Section-content">
            <Col>
              <p className="Centered">
                <i>And many more!</i>
              </p>
            </Col>
          </Row>
        </Container>
        <div className="Centered Short-line" />
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
