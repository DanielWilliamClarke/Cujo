import React, { Component } from "react";
import { CVProps } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";

import "../../shared/Section.css";
import "./Technical.css";

export class Technical extends Component<CVProps> {
  render(): JSX.Element {
    return (
      <section className="Section-alt Technical">
        <Container>
          <Row>
            <Col>
              <h2 className="Section-title">Technical Skills</h2>
              <div className="Centered Line"></div>
            </Col>
          </Row>

          <Row className="Section-content">
            <p className="Centered">
              I have worked with and are proficient with a varity of programming
              languages. For backend web applications I use Golang and Nodejs.
              For frontend; TypeScript and JavaScript, and for performant apps, services and
              games I use C++. I feel most at home with C++ and Golang, but I am trying to learn a few <i>esoteric</i> languages
              such as Rust and Assembly.
            </p>
          </Row>

          <Row className="Langauges">
            {this.props.cv.skills.programming.map((lang) => (
              <Col>{lang}</Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  }
}
