import React, { Component } from "react";
import { CVProps } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";

import "../../shared/Section.scss";
import "./About.css";

import headshot from "../../assets/headshot.jpg";

export class About extends Component<CVProps> {
  render(): JSX.Element {
    return (
      <section className="Section About">
        <Container>
          <Row>
            <Col>
              <h2 className="Section-title">About</h2>
              <div className="Centered Line"></div>
            </Col>
          </Row>

          <Row className="Section-content">
            <Col>
              <img src={headshot} alt="its, me!" className="Headshot" />
            </Col>

            <Col className="Text-column">
              <h4>A little about me!</h4>
              <ReactMarkdown
                source={this.props.cv.basics.summary}
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
                {this.props.cv.interests.map((interest: string) => (
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
