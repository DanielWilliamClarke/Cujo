/** @jsxImportSource theme-ui */

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useInjection } from 'inversify-react';
import React, { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import { Work } from '../../model/CVModel';
import { Entries, Media } from '../../model/Includes';
import { IDateService } from '../../services/DateService';
import { IIconService } from '../../services/IconService';
import { useShouldAnimate } from '../hooks/useShouldAnimate';
import { DynamicImage } from '../shared/DynamicImage';
import { Lanyard } from '../shared/Lanyard';
import { Section } from '../shared/Section';

import { At, centeredStyle, ShortLine } from '../shared/UtilComponents';
import { Theme } from 'theme-ui';
import { usePositionContext } from '../shared/PositionContext';

type WorkProps = {
  work: Entries<Work>
}

type RoleProps = {
  role: Work
}

// li::marker {
//   //     @include themed() {
//   //       color: t($color);
//   //     }
//   //   }

export const Experience: React.FC<WorkProps> = ({ work }: WorkProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format('MMMM YYYY', 'YYYY-MM-DD');

  const iconService = useInjection(IIconService.$);
  const Icon = iconService.getWithDefault('work');
  const EducationIcon = iconService.getWithDefault('education');

  const { even } = usePositionContext();

  const shouldAnimate = useShouldAnimate();

  return (
    <Section id="experience" title="Experience">
      <VerticalTimeline
        animate={shouldAnimate}
        sx={{
          marginTop: 20,
          textAlign: 'left',
          '.vertical-timeline-element-content-arrow': {
            display: 'none'
          },
          '&:before': {
            backgroundColor: 'timelineLine',
          }
        }}
      >
        {work.entries
          .filter(
            ({ startDate }: Work) =>
              !dateService.IsFuture(startDate.toString())
          )
          .sort(
            (a: Work, b: Work) =>
              dateService.toUnix(b.startDate.toString()) -
              dateService.toUnix(a.startDate.toString())
          )
          .map(
            (work: Work, index: number): JSX.Element => (
              <VerticalTimelineElement
                key={index}
                date={dateService.toRangeWithDuration(
                  work.startDate.toString(),
                  work.endDate?.toString() ?? 'Present'
                )}
                icon={<Icon />}
                sx={{
                  '.vertical-timeline-element-icon': {
                    backgroundColor: even ? 'accent' : 'secondary',
                    color: 'text'
                  },
                  '.vertical-timeline-element-content': {
                    borderRadius: 12,
                    backgroundColor: even ? 'bgLight' : 'bgDark',
                    boxShadow: 'none',
                    transition: '0.5s',

                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }
                }}
              >
                <Role role={work} />
              </VerticalTimelineElement>
            )
          )}
        <VerticalTimelineElement
          contentStyle={{
            backgroundColor: 'transparent'
          }}
          icon={<EducationIcon />}
          sx={{
            '.vertical-timeline-element-icon': {
              backgroundColor: even ? 'accent' : 'secondary',
              color: 'text'
            }
          }}
        />
      </VerticalTimeline>
    </Section>
  );
};

const Role: React.FC<RoleProps> = ({ role }: RoleProps): JSX.Element => {
  return (
    <Fragment>
      <Lanyard tags={[role.company, ...role.highlights]} />

      <Row
        sx={{
          marginTop: 10
        }}
      >
        <Col>
          <h3>
            <span>{role.position}</span>
            <At />
            <span>
              <a
                title={role.company}
                href={role.website}
                rel="noopener noreferrer"
                target="_blank"
              >
                <DynamicImage
                  image={role.logo}
                  sx={(t: Theme) => ({
                    ...centeredStyle,
                    height: 20,
                    maxWidth: 75,
                    filter: `brightness(${t?.colors?.workLogoBrightness})`
                  })}
                />
              </a>
            </span>
          </h3>
        </Col>
      </Row>

      <Row>
        <Col>
          {documentToReactComponents(role.summary)}
        </Col>
      </Row>

      <Row
        sx={{
          marginY: 25
        }}
      >
        {role.images.map((image: Media, index: number) => (
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
                  display: 'flex'
                }
              }
            }}
          >
            <DynamicImage
              image={image}
              sx={{
                ...centeredStyle,
                borderRadius: '50%',
                height: 75,
                width: 75,
                objectFit: 'cover'
              }}
            />
          </Col>
        ))}
      </Row>

      <ShortLine centered />
    </Fragment>
  );
};
