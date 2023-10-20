/** @jsxImportSource theme-ui */

import { event } from "nextjs-google-analytics";
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Project } from '../model/CVModel';
import { Entries } from '../model/Includes';
import { DevIconName } from './DevIcon';
import { DynamicImage } from './DynamicImage';
import { Lanyard } from './Lanyard';
import { Section } from './Section';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Reveal } from './Reveal';
import { ThemeUICSSObject } from "theme-ui";
import { centeredStyle, Line } from "./UtilComponents";

const projectOverlayStyle: ThemeUICSSObject = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  display: 'flex',
  alignContent: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0,
}

type ProjectsProps = {
  projects: Entries<Project>
}

type ProjectProps = {
  project: Project
  index: number
}

const emitClickEvent = ({ name, link }: Project) => {
  event("dc_user_event", {
    category: "Project click",
    label: name,
    url: link
  });
};

export const Projects: React.FC<ProjectsProps> = ({ projects }: ProjectsProps): JSX.Element => {
  return (
    <Section id="projects" title="Projects" noSeparator>
      {projects.entries
        .sort((pA, pB) => pA.rank - pB.rank)
        .map((project: Project, index: number) => (
          <ProjectSection
            project={project}
            index={index}
            key={index}
          />
        ))}
    </Section>
  );
};

const ProjectSection: React.FC<ProjectProps> = ({ project, index }: ProjectProps): JSX.Element => {
  return (
    <Container>
      <Reveal index={index}>
        <Line centered />
        <Row
          sx={{
            paddingY: 60,
            flexDirection: index % 2 === 0 ? 'row-reverse' : 'row'
          }}
        >
          <ProjectImage project={project} index={index} />
          <ProjectContent project={project} index={index} />
        </Row>
      </Reveal>
    </Container>
  );
};

const ProjectImage: React.FC<ProjectProps> = ({ project }: ProjectProps): JSX.Element => {
  return (
    <Col
      sx={{
        alignContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'left',

        '&:hover': {
          transition: '0.5s',
          transform: 'scale(1.05)',

          '.overlay': {
            opacity: 0.7
          },
          '.icon': {
            opacity: 1
          }
        }
      }}
    >
      {project.image && (
        <a
          href={project.link}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => emitClickEvent(project)}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            display: 'inlineBlock',
            position: 'relative',
            transition: '0.5s',
            width: '100%',
          }}
        >
          <DynamicImage
            image={project.image}
            sx={{
              ...centeredStyle,
              borderRadius: 12,
              maxHeight: 350,
              objectFit: 'cover',
              width: '100%'
            }}
          />

          <div
            className='overlay'
            sx={{
              ...projectOverlayStyle,
              backgroundColor: 'black',
              borderRadius: 12,
            }}
          />

          <DevIconName
            className="icon"
            icon={project.icon}
            size={75}
            sx={projectOverlayStyle}
            textStyle={{
              fontSize: '1rem',
              margin: '0.2rem'
            }}
          />
        </a>
      )}
    </Col>
  );
};

const ProjectContent: React.FC<ProjectProps> = ({ project }: ProjectProps): JSX.Element => {
  return (
    <Col
      sx={{
        alignContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'left',

        '@media screen and (max-width: 700px)': {
          paddingTop: 30
        }
      }}
    >
      <div
        sx={{
          paddingY: 10,
          width: '100%'
        }}
      >
        <h2>{project.name}</h2>
        <Lanyard tags={project.tags} />
        {documentToReactComponents(project.summary)}
      </div>
    </Col>
  );
};
