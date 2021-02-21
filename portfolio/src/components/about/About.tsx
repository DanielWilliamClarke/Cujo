import React, { Component } from "react";
import { Basics } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";

import { DynamicImage } from "../shared/DynamicImage";

import "../../shared/section.scss";
import "./About.scss";

type AboutProps = {
  basics: Basics;
  interests: string[];
};

export class About extends Component<AboutProps> {
  render(): JSX.Element {
    return (
      <section id="about" className="section about">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">About</h2>
              <div className="centered line" />
            </Col>
          </Row>

          <Row className="section-content">
            <Col>
              <DynamicImage
                image="headshot.jpg"
                alt="its, me!"
                className="headshot"
              />
            </Col>

            <Col className="text-column">
              <h4>A little about me!</h4>
              <ReactMarkdown
                source={this.props.basics.summary}
                plugins={[breaks]}
              />
            </Col>

            <Col className="text-column">
              <h4>My Interests</h4>
              <p>
                Outside of my professional work, I enjoy spending my time doing
                any of the following:
              </p>
              <ul className="interests">
                {this.props.interests.map((interest: string) => (
                  <li>
                    <ReactMarkdown source={interest} />
                  </li>
                ))}
              </ul>
            </Col>
          </Row>

          <Row className="section-content">
            <Col className="mailto">
              <a href="mailto:dc@danielclarke.tech">dc@danielclarke.tech</a>
            </Col>
          </Row>
          <div className="centered short-line" />
        </Container>
      </section>
    );
  }
}
