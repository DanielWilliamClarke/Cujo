import { useInjection } from 'inversify-react';
import React, { useContext, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Entries, Media } from '../../model/Includes';
import { Work } from '../../model/CVModel';
import { IDateService } from '../../services/DateService';
import { IIconService } from '../../services/IconService';
import { DynamicImage } from '../shared/DynamicImage';
import { Lanyard } from '../shared/Lanyard';
import { Section } from '../shared/Section';

import ThemeContext from '../theme/ThemeContext';

import '../shared/Portfolio.module.scss';
import './Experience.module.scss';

import styles from '../shared/style.module.scss';

interface WorkProps {
  work: Entries<Work>
}

interface RoleProps {
  role: Work
}

export const Experience: React.FC<WorkProps> = ({ work }: WorkProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format('MMMM YYYY', 'YYYY-MM-DD');

  const iconService = useInjection(IIconService.$);
  const Icon = iconService.getWithDefault('work');
  const EducationIcon = iconService.getWithDefault('education');

  const { theme } = useContext(ThemeContext);
  const background = useMemo(() => (styles[`${theme}-colorBrand`]), [theme]);

  return (
    <Section id="experience" title="Experience">
      <VerticalTimeline className="timeline">
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
                className="vertical-timeline-element--work"
                key={index}
                date={dateService.toRangeWithDuration(
                  work.startDate.toString(),
                  work.endDate?.toString() ?? 'Present'
                )}
                icon={<Icon />}
              >
                <Role role={work} />
              </VerticalTimelineElement>
            )
          )}
          <VerticalTimelineElement
            iconStyle={{ background }}
            contentStyle={{ backgroundColor: 'transparent' }}
            icon={<EducationIcon />}
          />
      </VerticalTimeline>
    </Section>
  );
};

const Role: React.FC<RoleProps> = ({ role }: RoleProps): JSX.Element => {
  return (
    <>
      <Lanyard tags={[role.company, ...role.highlights]} />

      <Row className="header">
        <Col className="headline">
          <h3>
            <span className="at">{role.position}</span>
            <span>
              <a
                title={role.company}
                href={role.website}
                rel="noopener noreferrer"
                target="_blank"
              >
                <DynamicImage
                  image={role.logo.file.url}
                  alt={role.company}
                  className="centered image-item work-logo"
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

      <Row className="images">
        {role.images.map((image: Media, index: number) => (
          <Col className="col-item" key={index}>
            <DynamicImage
              image={image.file.url}
              alt={`${role.position} - Image not found!`}
              className="centered image-item"
            />
          </Col>
        ))}
      </Row>

      <div className="centered short-line" />
    </>
  );
};
