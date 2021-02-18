import React, { Component } from "react";
import { Basics } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";

import { DynamicImage } from "../shared/DynamicImage";

import "../../shared/Section.scss";
import "./About.scss";

type AboutProps = {
  basics: Basics;
  interests: string[];
};

export class About extends Component<AboutProps> {
  render(): JSX.Element {
    return (
      <section id="about" className="Section About">
        <Container>
          <Row>
            <Col>
              <h2 className="Section-title">About</h2>
              <div className="Centered Line"/>
            </Col>
          </Row>

          <Row className="Section-content">
            <Col>
              <DynamicImage image="headshot.jpg" alt="its, me!" className="Headshot" />
            </Col>

            <Col className="Text-column">
              <h4>A little about me!</h4>
              <ReactMarkdown
                source={this.props.basics.summary}
                plugins={[breaks]}
              />
            </Col>

            <Col className="Text-column">
              <h4>My Interests</h4>
              <p>
                Outside of my professional work, I enjoy spending my time doing
                any of the following: the following:
              </p>
              <ul className="Interests">
                {this.props.interests.map((interest: string) => (
                  <li>
                    <ReactMarkdown source={interest} />
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
