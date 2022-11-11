import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useInjection } from 'inversify-react';
import React, { useContext, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import { Education as EducationModel } from '../../model/CVModel';
import { Entries, Media } from '../../model/Includes';
import { IDateService } from '../../services/DateService';
import { IIconService } from '../../services/IconService';
import { DynamicImage } from '../shared/DynamicImage';
import { Lanyard } from '../shared/Lanyard';
import { Section } from '../shared/Section';
import ThemeContext from '../theme/ThemeContext';

import '../shared/Portfolio.scss';
import './Education.scss';

import styles from '../shared/style.module.scss';

interface EducationProps {
  education: Entries<EducationModel>
}

interface InstitutionModel {
  institution: EducationModel
}

export const Education: React.FC<EducationProps> = ({ education }: EducationProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format('MMMM YYYY', 'YYYY-MM-DD');

  const iconService = useInjection(IIconService.$);
  const Icon = iconService.getWithDefault('school');
  const BabyIcon = iconService.getWithDefault('baby');

  const { theme } = useContext(ThemeContext);
  const background = useMemo(() => (styles[`${theme}-colorBrand`]), [theme]);

  return (
    <Section id="education" title="Education">
      <VerticalTimeline className="timeline">
        {education.entries
          .sort(
            (a, b) =>
              dateService.toUnix(b.startDate.toString()) -
              dateService.toUnix(a.startDate.toString())
          )
          .map((e: EducationModel, index: number) => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              key={index}
              date={dateService.toRange(
                e.startDate.toString(),
                e.endDate.toString()
              )}
              icon={<Icon />}
            >
              <Institution institution={e} />
            </VerticalTimelineElement>
          ))}
          <VerticalTimelineElement
            iconStyle={{ background }}
            contentStyle={{ backgroundColor: 'transparent' }}
            icon={<BabyIcon />}
          />
      </VerticalTimeline>
    </Section>
  );
};

const Institution: React.FC<InstitutionModel> = ({ institution }: InstitutionModel): JSX.Element => {
  return (
    <>
      {institution.grade !== '' && <Lanyard tags={[institution.grade]} />}

      <Row className="header">
        <Col className="Qualification-type">
          <h3>{institution.institution}</h3>
          <h4>
            {institution.studyType}
            <span className="dot" />
            {institution.area}
          </h4>
        </Col>
      </Row>

      <Row>
        <Col>{documentToReactComponents(institution.summary)}</Col>
      </Row>

      <Row className="images">
        {institution.images.map((image: Media, index: number) => (
          <Col className="col-item" key={index}>
            <a href={institution.link} rel="noopener noreferrer" target="_blank">
              <DynamicImage
                image={image.file.url}
                alt={`${institution.institution} - Image not found!`}
                className="centered image-item"
              />
            </a>
          </Col>
        ))}
      </Row>

      <div className="centered short-line" />
    </>
  );
};
