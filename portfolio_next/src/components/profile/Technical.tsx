import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { event } from "nextjs-google-analytics";
import React, { HTMLAttributes, useCallback, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { Col, Row } from 'react-bootstrap';
import { debounce } from "ts-debounce";

import { Skill, Skills } from '../../model/CVModel';
import { Entry } from '../../model/Includes';
import { DevIconName } from '../shared/DevIcon';
import { ProgressGauge } from '../shared/ProgressGauge';
import { GenericComponentProps } from '../shared/props';
import { Section } from '../shared/Section';

type TechnicalProps = {
  skills: Entry<Skills>
}

type SkillsProps = {
  summary: Document;
  skills: Skill[];
  search: string;
  size?: number;
};

const emitSearchEvent = debounce((label: string) => {
  event("dc_user_event", {
    category: "Skill Search",
    label
  });
}, 300);

export const Technical: React.FC<TechnicalProps> = ({ skills }: TechnicalProps): JSX.Element => {
  const [search, setSearch] = useState('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    emitSearchEvent(e.target.value);

    setSearch(e.target.value);
  };

  return (
    <Section id="skills" title="Skills">
      <Row className="section-content">
        <Col>
          {documentToReactComponents(skills.entry.summary)}
        </Col>
      </Row>

      <Row>
        <Col className="section-content centered search">
          <input
            className="skills-input"
            type="text"
            value={search}
            onChange={handleSearchInput.bind(this)}
            placeholder="Search"
          />
        </Col>
      </Row>

      <SkillsSection
        skills={skills.entry.current}
        summary={skills.entry.currentSummary}
        search={search}
      />

      <SkillsSection
        skills={skills.entry.favorite}
        summary={skills.entry.favoriteSummary}
        search={search}
      />

      <SkillsSection
        skills={skills.entry.used}
        summary={skills.entry.usedSummary}
        search={search}
        size={30}
      />

      <Row className="section-content">
        <Col>
          <p className="centered">
            <i>And many more!</i>
          </p>
        </Col>
      </Row>
    </Section>
  );
};

const SkillsSection: React.FC<SkillsProps> = (
  { skills, summary, search, size = 55 }: SkillsProps
) => {
  const gaugeColors = ['#FB6962', '#FB6962', '#FCFC99', '#0CC078', '#0CC078'];

  const filterSkills = useCallback((name: string): boolean => {
    return search.length
      ? name.toLowerCase().includes(search.toLowerCase())
      : true;
  }, [search]);

  const filteredSkills = skills
    .filter(({ name }: Skill) => filterSkills(name))
    .sort((a: Skill, b: Skill) => b.level - a.level)
    .map(({ level, icon }: Skill, index: number) => (
      <ProgressGauge key={index} value={level} colors={gaugeColors}>
        {(color: string) => <DevIconName
          icon={icon}
          color={color}
          hoverColor={color}
          size={size}
          sx={{
            width: '100%',
            textAlign: ['center', undefined, undefined]
          }}
          textStyle={{
            fontSize: '0.6rem',
            margin: '0.2rem'
          }}
        />}
      </ProgressGauge>
    ));

  if (!filteredSkills.length) {
    return null;
  }

  return (
    <>
      <Row className="section-content">
        <Col>{documentToReactComponents(summary)}</Col>
      </Row>
      <Row className={`skill-items`}>
        <Zoom triggerOnce cascade damping={0.01} className="col centered">
          {filteredSkills}
        </Zoom>
      </Row>
      <div className="line centered" />
    </>
  );
};
