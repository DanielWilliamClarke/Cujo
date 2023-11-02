/** @jsxImportSource theme-ui */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { getColor } from '@theme-ui/color';
import { event } from 'nextjs-google-analytics';
import React, { Fragment, useCallback, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { Col, Row } from 'react-bootstrap';
import { Theme } from 'theme-ui';
import { debounce } from 'ts-debounce';

import { Skill } from '@Models/CVModel';

import { usePositionContext } from '@Hooks/PositionContext';

import { DevIconName } from '@Common/DevIcon';
import { ProgressGauge } from '@Common/ProgressGauge';
import { Section } from '@Common/Section';
import { Line, centeredStyle } from '@Common/UtilComponents';
import { useAppContext } from '../hooks/AppContext';

type SkillsProps = {
  summary: Document;
  skills: Skill[];
  search: string;
  size?: number;
};

const emitSearchEvent = debounce((label: string) => {
  event('dc_user_event', {
    category: 'Skill Search',
    label,
  });
}, 300);

export const Technical: React.FC = (): JSX.Element => {
  const { cv: { skills } } = useAppContext();
  const { even } = usePositionContext();

  const [search, setSearch] = useState('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    emitSearchEvent(e.target.value);

    setSearch(e.target.value);
  };

  return (
    <Section id="skills" title="Skills">
      <Row
        sx={{
          marginY: [10, 20, 20],
        }}
      >
        <Col>{documentToReactComponents(skills.entry.summary)}</Col>
      </Row>

      <Row>
        <Col
          sx={{
            ...centeredStyle,
            marginY: [10, 20, 20],

            '@media screen and (max-width: 700px)': {
              textAlign: 'center',
            },
          }}
        >
          <input
            type="text"
            value={search}
            onChange={handleSearchInput.bind(this)}
            placeholder="Search"
            sx={(t: Theme) => ({
              borderRadius: 12,
              fontSize: '2em',
              marginY: 10,
              textAlign: 'center',
              transition: '0.5s',
              width: '50%',
              backgroundColor: even ? 'techBgLight' : 'techBgDark',
              border: `1px solid ${getColor(
                t,
                even ? 'techBgDark' : 'techBgLight',
              )}`,
              color: 'text',

              '&:focus-within': {
                width: '100%',
              },

              '@media screen and (max-width: 700px)': {
                textAlign: 'center',
              },
            })}
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
        small
      />

      <Row
        sx={{
          marginY: [10, 20, 20],
        }}
      >
        <Col>
          <p
            sx={{
              ...centeredStyle,
            }}
          >
            <i>And many more!</i>
          </p>
        </Col>
      </Row>
    </Section>
  );
};

const SkillsSection: React.FC<SkillsProps & { small: boolean }> = ({
  skills,
  summary,
  search,
  small,
}) => {
  const { even } = usePositionContext();

  const gaugeColors = ['#FB6962', '#FB6962', '#FCFC99', '#0CC078', '#0CC078'];

  const filterSkills = useCallback(
    (name: string): boolean => {
      return search.length
        ? name.toLowerCase().includes(search.toLowerCase())
        : true;
    },
    [search],
  );

  const filteredSkills = skills
    .filter(({ name }: Skill) => filterSkills(name))
    .sort((a: Skill, b: Skill) => b.level - a.level)
    .map(({ level, icon }: Skill, index: number) => (
      <ProgressGauge key={index} value={level} colors={gaugeColors}>
        {(color: string) => (
          <DevIconName
            icon={icon}
            color={color}
            hoverColor={color}
            size={small ? 25 : 50}
            sx={{
              width: '100%',
              textAlign: ['center', undefined, undefined],
            }}
            textStyle={{
              fontSize: '0.6rem',
              margin: 0,
            }}
          />
        )}
      </ProgressGauge>
    ));

  if (!filteredSkills.length) {
    return null;
  }

  return (
    <Fragment>
      <Row
        sx={{
          marginY: [10, 20, 20],
        }}
      >
        <Col>{documentToReactComponents(summary)}</Col>
      </Row>
      <Row
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 12,
          fontWeight: 500,
          marginBottom: 30,
          minHeight: 160,
          padding: 10,
          color: 'textTitle',
          backgroundColor: even ? 'techBgLight' : 'techBgDark',
        }}
      >
        <Zoom
          triggerOnce
          cascade
          damping={0.01}
          sx={{
            ...centeredStyle,
            maxWidth: small ? 100 : 150,
            minWidth: small ? 100 : 150,

            '@media screen and (max-width: 700px)': {
              marginY: 20,
              flexBasis: 0,
            },
          }}
        >
          {filteredSkills}
        </Zoom>
      </Row>
      <Line centered />
    </Fragment>
  );
};
