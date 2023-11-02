/** @jsxImportSource theme-ui */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useInjection } from 'inversify-react';
import React, { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import { Education as EducationModel } from '@Models/CVModel';
import { Media } from '@Models/Includes';

import { usePositionContext } from '@Hooks/PositionContext';
import { useShouldAnimate } from '@Hooks/useShouldAnimate';

import { IDateService } from '@Services/DateService';
import { IIconService } from '@Services/IconService';

import { DynamicImage } from '@Common/DynamicImage';
import { Lanyard } from '@Common/Lanyard';
import { Section } from '@Common/Section';
import { Dot, ShortLine, centeredStyle } from '@Common/UtilComponents';
import { useAppContext } from '../hooks/AppContext';

export const Education: React.FC = (): JSX.Element => {
  const { cv: { education } } = useAppContext();

  const dateService = useInjection(IDateService.$);
  dateService.format('MMMM YYYY', 'YYYY-MM-DD');

  const iconService = useInjection(IIconService.$);
  const Icon = iconService.getWithDefault('school');
  const BabyIcon = iconService.getWithDefault('baby');

  const { even } = usePositionContext();

  const shouldAnimate = useShouldAnimate();

  return (
    <Section id="education" title="Education">
      <VerticalTimeline
        animate={shouldAnimate}
        sx={{
          marginTop: 20,
          textAlign: 'left',
          '.vertical-timeline-element-content-arrow': {
            display: 'none',
          },
          '&:before': {
            backgroundColor: 'timelineLine',
          },
        }}
      >
        {education.entries
          .sort(
            (a, b) =>
              dateService.toUnix(b.startDate.toString()) -
              dateService.toUnix(a.startDate.toString()),
          )
          .map((e: EducationModel, index: number) => (
            <VerticalTimelineElement
              key={index}
              date={dateService.toRange(
                e.startDate.toString(),
                e.endDate.toString(),
              )}
              icon={<Icon />}
              sx={{
                '.vertical-timeline-element-icon': {
                  backgroundColor: even ? 'accent' : 'secondary',
                  color: 'text',
                },
                '.vertical-timeline-element-content': {
                  borderRadius: 12,
                  backgroundColor: even ? 'bgLight' : 'bgDark',
                  boxShadow: 'none',
                  transition: '0.5s',

                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                },
              }}
            >
              <Institution institution={e} />
            </VerticalTimelineElement>
          ))}
        <VerticalTimelineElement
          contentStyle={{
            backgroundColor: 'transparent',
          }}
          icon={<BabyIcon />}
          sx={{
            '.vertical-timeline-element-icon': {
              backgroundColor: even ? 'accent' : 'secondary',
              color: 'text',
            },
          }}
        />
      </VerticalTimeline>
    </Section>
  );
};

type InstitutionModel = {
  institution: EducationModel;
};

const Institution: React.FC<InstitutionModel> = ({
  institution,
}: InstitutionModel): JSX.Element => {
  return (
    <Fragment>
      {institution.grade !== '' && <Lanyard tags={[institution.grade]} />}

      <Row
        sx={{
          marginTop: 10,
        }}
      >
        <Col>
          <h3>{institution.institution}</h3>
          <h4>
            {institution.studyType}
            <Dot />
            {institution.area}
          </h4>
        </Col>
      </Row>

      <Row>
        <Col>{documentToReactComponents(institution.summary)}</Col>
      </Row>

      <Row
        sx={{
          marginY: 25,
        }}
      >
        {institution.images.map((image: Media, index: number) => (
          <Col
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:after': {
                content: '""',

                '@media screen and (max-width: 700px)': {
                  flexBasis: 0,
                  display: 'flex',
                },
              },
            }}
          >
            <a
              href={institution.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <DynamicImage
                image={image}
                sx={{
                  ...centeredStyle,
                  borderRadius: '50%',
                  height: 75,
                  width: 75,
                  objectFit: 'cover',
                }}
              />
            </a>
          </Col>
        ))}
      </Row>

      <ShortLine centered />
    </Fragment>
  );
};
