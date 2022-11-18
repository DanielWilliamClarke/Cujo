import { Block, Inline, INLINES, MARKS } from '@contentful/rich-text-types';
import React, { ReactNode, useMemo } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { About as AboutModel } from '../../model/CVModel';
import { Entry, Media } from '../../model/Includes';
import { DynamicImage } from '../shared/DynamicImage';
import { Section } from '../shared/Section';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Reveal } from '../shared/Reveal';

type AboutProps = {
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
          <Reveal className="carousel" direction="left">
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
                    image={media}
                    className="headshot"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Reveal>
        </Col>

        <Col className="text-column">
          <div className="about-section">
            <Reveal direction="right">
              {documentToReactComponents(about.entry.about, statementOptions)}
            </Reveal>
          </div>
          <div className="about-section">
            <Reveal direction="right" damping={0.01}>
              {documentToReactComponents(
                about.entry.interests,
                options
              )}
            </Reveal>
          </div>
        </Col>
      </Row>
    </Section>
  );
};
