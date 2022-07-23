import React, { ReactNode } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import { Fade, Zoom } from "react-awesome-reveal";
import { Block, INLINES, Inline } from "@contentful/rich-text-types";
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

export const About: React.FC<AboutProps> = ({ about }: AboutProps): JSX.Element => {
  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (
        { data }: Block | Inline,
        children: ReactNode
      ): JSX.Element => (
        <a href={data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    }
  }

  return (
    <Section id="about" title="About">
      <Row className="section-content">
        <Zoom triggerOnce damping={0.01}>
          <Carousel
            indicators
            wrap={true}
            slide={true}
            nextLabel={""}
            prevLabel={""}
          >
            {about.entry.images.map((media: Media) => (
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
            {documentToReactComponents(about.entry.about, options)}
          </Fade>
        </Col>

        <Col className="text-column">
          <Fade triggerOnce direction="right">
            {documentToReactComponents(
              about.entry.interests,
              options
            )}
          </Fade>
        </Col>
      </Row>

      <Row className="section-content">
        <Zoom triggerOnce damping={0.01}>
          <Col className="mailto">
            <a href={`mailto:${about.entry.email}`}>
              {about.entry.email}
            </a>
          </Col>
        </Zoom>
      </Row>
    </Section>
  );
};
