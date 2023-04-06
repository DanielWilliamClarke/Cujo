import React, { HTMLAttributes, ReactNode, useCallback, useMemo, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Zoom } from 'react-awesome-reveal';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

import { Entry } from '../../model/Includes';
import { Skills, Skill } from '../../model/CVModel';
import { DevIconName } from '../shared/DevIcon';
import { Section } from '../shared/Section';
import { ProgressGauge } from '../shared/ProgressGauge';

type TechnicalProps = {
  skills: Entry<Skills>
}

type SkillsProps = HTMLAttributes<HTMLDivElement> & {
  summary: Document
  skills: Skill[]
  search: string
};

export const Technical: React.FC<TechnicalProps> = ({ skills }: TechnicalProps): JSX.Element => {
  const [search, setSearch] = useState('');

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
        className="skills-small"
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
  { skills, summary, search, className = '' }: SkillsProps
) => {
  const gaugeColors = ['#FB6962', '#FB6962', '#FCFC99', '#0CC078', '#0CC078'];

  const filterSkills = useCallback((name: string): boolean => {
    return search.length
      ? name.toLowerCase().includes(search.toLowerCase())
      : true;
  }, [search]);

  const filteredSkills = useMemo(() => skills
    .filter(({ name }: Skill) => filterSkills(name))
    .sort((a: Skill, b: Skill) => b.level - a.level)
    .map(({ level, icon }: Skill, index: number) => (
      <ProgressGauge key={index} value={level} colors={gaugeColors}>
        {(color: string) => <DevIconName icon={icon} color={color} />}
      </ProgressGauge>
    )), [search]);

  if (!filteredSkills.length) {
    return null;
  }

  return (
    <>
      <Row className="section-content">
        <Col>{documentToReactComponents(summary)}</Col>
      </Row>
      <Row className={`skill-items ${className}`}>
        <Zoom triggerOnce cascade damping={0.01} className="col centered">
          {filteredSkills}
        </Zoom>
      </Row>
      <div className="line centered" />
    </>
  );
};
