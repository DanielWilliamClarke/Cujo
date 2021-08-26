import React, { Component } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";

import { GiDiceTwentyFacesTwenty } from "react-icons/gi";

import { Basics, Interests } from "../../model/CVModel";
import { DynamicImage } from "../shared/DynamicImage";
import { Heading } from "../shared/Heading";

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
          <Heading title="About Me!" />

          <Row className="section-content">
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
          </Row>

          <Row className="section-content">
            <Col className="text-column">
              <h4>A little about me!</h4>
              <ReactMarkdown
                children={this.props.basics.summary}
                remarkPlugins={[breaks]}
              />
            </Col>

            <Col className="text-column">
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
            </Col>
          </Row>

          <Row className="section-content">
            <Col className="mailto">
              <a href={`mailto:${this.props.basics.email}`}>
                {this.props.basics.email}
              </a>
            </Col>
          </Row>
          <div className="centered short-line" />
          <GiDiceTwentyFacesTwenty className="section-icon" />
        </Container>
      </section>
    );
  }
}
