import React, { ReactNode, useMemo } from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import { Block, INLINES, Inline, MARKS } from '@contentful/rich-text-types';
import { Entry, Media } from '../../model/Includes';
import { About as AboutModel } from '../../model/CVModel';
import { DynamicImage } from '../shared/DynamicImage';
import { Section } from '../shared/Section';

import '../shared/Portfolio.module.scss';
import './About.module.scss';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface AboutProps {
  about: Entry<AboutModel>
}

export const About: React.FC<AboutProps> = ({ about }: AboutProps): JSX.Element => {
  const options = useMemo(() => ({
    renderNode: {
      [INLINES.HYPERLINK]: (
        { data }: Block | Inline,
        children: ReactNode
      ): JSX.Element => (
        <a href={data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
  }), []);

  const statementOptions = useMemo(() => ({
    ...options,
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode): JSX.Element => (
        <b className="about-focus">
          {text}
        </b>
      )
    }
  }), [options]);

  return (
    <Section id="about" title="About">
      <Row className="section-content">
        <Col className="text-column">
          <Fade className="carousel" triggerOnce direction="left">
            <Carousel
              indicators
              wrap={true}
              slide={true}
              nextLabel={''}
              prevLabel={''}
            >
              {about.entry.images.map((media: Media, index: number) => (
                <Carousel.Item key={index}>
                  <DynamicImage
                    image={media.file.url}
                    alt="Image not found!"
                    className="headshot"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Fade>
        </Col>

        <Col className="text-column">
          <div className="about-section">
            <Fade triggerOnce direction="right">
              {documentToReactComponents(about.entry.about, statementOptions)}
            </Fade>
          </div>
          <div className="about-section">
            <Fade triggerOnce direction="right" damping={0.01}>
              {documentToReactComponents(
                about.entry.interests,
                options
              )}
            </Fade>
          </div>
        </Col>
      </Row>
    </Section>
  );
};
