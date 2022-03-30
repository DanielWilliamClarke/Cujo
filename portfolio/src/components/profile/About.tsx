import React, { Component } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import { Fade, Zoom } from "react-awesome-reveal";

import { Basics, Interests } from "../../model/CVModel";
import { DynamicImage } from "../shared/DynamicImage";
import { Section } from "../shared/Section";

import "../shared/Portfolio.scss";
import "./About.scss";

type AboutProps = {
  basics: Basics;
  interests: Interests;
};

export class About extends Component<AboutProps> {
  render(): JSX.Element {
    return (
      <Section id="about" title="About Me!">
        <Row className="section-content">
          <Zoom triggerOnce damping={0.01}>
            <Carousel
              indicators
              wrap={true}
              slide={true}
              nextLabel={""}
              prevLabel={""}
            >
              {this.props.basics.images.map((src: string) => (
                <Carousel.Item>
                  <DynamicImage
                    image={src}
                    alt="Image not found!"
                    className="headshot"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Zoom>
        </Row>

        <Row className="section-content">
          <Col className="text-column">
            <Fade triggerOnce direction="left">
              <h4>A little about me!</h4>
              <ReactMarkdown
                children={this.props.basics.summary}
                remarkPlugins={[breaks]}
              />
            </Fade>
          </Col>

          <Col className="text-column">
            <Fade triggerOnce direction="right">
              <h4>My Interests</h4>
              <ReactMarkdown
                children={this.props.interests.summary}
                remarkPlugins={[breaks]}
              />
              <ul className="interests">
                {this.props.interests.list.map((interest: string) => (
                  <li>
                    <ReactMarkdown children={interest} />
                  </li>
                ))}
              </ul>
            </Fade>
          </Col>
        </Row>

        <Row className="section-content">
          <Zoom triggerOnce damping={0.01}>
            <Col className="mailto">
              <a href={`mailto:${this.props.basics.email}`}>
                {this.props.basics.email}
              </a>
            </Col>
          </Zoom>
        </Row>
      </Section>
    );
  }
}
