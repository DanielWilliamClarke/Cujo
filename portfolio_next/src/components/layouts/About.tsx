/** @jsxImportSource theme-ui */
import {
  CommonNode,
  documentToReactComponents,
} from '@contentful/rich-text-react-renderer';
import { INLINES, MARKS } from '@contentful/rich-text-types';
import React, { ReactNode, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Media } from '@Models/Includes';

import { DynamicImage } from '@Common/DynamicImage';
import { Reveal } from '@Common/Reveal';
import { Section } from '@Common/Section';

import { useAppContext } from '../hooks/AppContext';

const textColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingX: 20,
  textAlign: 'left',
  width: '50%',

  '@media screen and (max-width: 700px)': {
    margin: '10px 0',
    width: '100%',
  },
};

export const About: React.FC = (): JSX.Element => {
  const {
    cv: { about },
  } = useAppContext();

  const options = useMemo(
    () => ({
      renderNode: {
        [INLINES.HYPERLINK]: ({ data }: CommonNode, children: ReactNode) => (
          <a href={data.uri} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
      },
    }),
    [],
  );

  const statementOptions = useMemo(
    () => ({
      ...options,
      renderMark: {
        [MARKS.BOLD]: (text: ReactNode): JSX.Element => (
          <b
            sx={{
              fontSize: 18,
            }}
          >
            {text}
          </b>
        ),
      },
    }),
    [options],
  );

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
    modules: [Autoplay, Pagination],
  };

  return (
    <Reveal direction="up">
      <Section id="about" title="About">
        <Row sx={{ marginY: 20 }}>
          <Col sx={textColumnStyle}>
            <div sx={{ marginY: 30 }}>
              <Reveal direction="left">
                {documentToReactComponents(about.entry.about, statementOptions)}
              </Reveal>
            </div>
            <div sx={{ marginY: 30 }}>
              <Reveal direction="left" damping={0.01}>
                {documentToReactComponents(about.entry.interests, options)}
              </Reveal>
            </div>
          </Col>

          <Col sx={textColumnStyle}>
            <Reveal direction="right">
              <Swiper
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                {...carouselProps}
              >
                {about.entry.images.map((media: Media, index: number) => (
                  <SwiperSlide key={index}>
                    <DynamicImage
                      image={media}
                      sx={{
                        objectFit: 'cover',
                        borderRadius: 12,
                        height: 700,
                        maxHeight: '100%',
                        width: 'auto',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Reveal>
          </Col>
        </Row>
      </Section>
    </Reveal>
  );
};
