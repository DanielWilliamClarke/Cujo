import { INLINES, MARKS } from '@contentful/rich-text-types';
import React, { ReactNode, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { About as AboutModel } from '../../model/CVModel';
import { Entry, Media } from '../../model/Includes';
import { DynamicImage } from '../shared/DynamicImage';
import { Section } from '../shared/Section';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

import { CommonNode, documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Reveal } from '../shared/Reveal';

type AboutProps = {
  about: Entry<AboutModel>
}

export const About: React.FC<AboutProps> = ({ about }: AboutProps): JSX.Element => {
  const options = useMemo(() => ({
    renderNode: {
      [INLINES.HYPERLINK]: (
        { data }: CommonNode,
        children: ReactNode
      ) => (
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

  const carouselProps = {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    rewind: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
        dynamicBullets: true,
    },
    modules: [Autoplay, Pagination]
  };

  return (
    <Section id="about" title="About">
      <Row className="section-content">
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

        <Col className="text-column">
          <Reveal className="carousel" direction="left">
            <Swiper
              className="carousel"
               {...carouselProps}
            >
              {about.entry.images.map((media: Media, index: number) => (
                <SwiperSlide key={index}>
                  <DynamicImage
                    image={media}
                    className="headshot"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Reveal>
        </Col>
      </Row>
    </Section>
  );
};
