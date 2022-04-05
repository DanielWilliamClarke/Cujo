import React, { Component } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import { Fade, Zoom } from "react-awesome-reveal";

import { Entry, Media } from "../../model/Includes";
import { About as AboutModel } from "../../model/CVModel";
import { DynamicImage } from "../shared/DynamicImage";
import { Section } from "../shared/Section";

import "../shared/Portfolio.scss";
import "./About.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

type AboutProps = {
  about: Entry<AboutModel>;
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
              {this.props.about.entry.images.map((media: Media) => (
                <Carousel.Item>
                  <DynamicImage
                    image={media.file.url}
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
              {documentToReactComponents(this.props.about.entry.about)}
            </Fade>
          </Col>

          <Col className="text-column">
            <Fade triggerOnce direction="right">
              {documentToReactComponents(this.props.about.entry.interests)}
            </Fade>
          </Col>
        </Row>

        <Row className="section-content">
          <Zoom triggerOnce damping={0.01}>
            <Col className="mailto">
              <a href={`mailto:${this.props.about.entry.email}`}>
                {this.props.about.entry.email}
              </a>
            </Col>
          </Zoom>
        </Row>
      </Section>
    );
  }
}
