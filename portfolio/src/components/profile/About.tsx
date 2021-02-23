import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";

import { Basics, Interests } from "../../model/CVModel";
import { DynamicImage } from "../shared/DynamicImage";

import "../shared/Portfolio.scss";
import "./About.scss";

type AboutProps = {
  basics: Basics;
  interests: Interests;
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
                image={this.props.basics.picture}
                alt="Daniel and Amelia - Image not found!"
                className="headshot"
              />
            </Col>
          </Row>

          <Row className="section-content">
            <Col className="text-column">
              <h4>A little about me!</h4>
              <ReactMarkdown
                source={this.props.basics.summary}
                plugins={[breaks]}
              />
            </Col>

            <Col className="text-column">
              <h4>My Interests</h4>
              <ReactMarkdown
                source={this.props.interests.summary}
                plugins={[breaks]}
              />
              <ul className="interests">
                {this.props.interests.list.map((interest: string) => (
                  <li>
                    <ReactMarkdown source={interest} />
                  </li>
                ))}
              </ul>
            </Col>
          </Row>

          <Row className="section-content">
            <Col className="mailto">
              <a href="mailto:dc@danielclarke.tech">
                {this.props.basics.email}
              </a>
            </Col>
          </Row>
          <div className="centered short-line" />
        </Container>
      </section>
    );
  }
}
