import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { event } from "nextjs-google-analytics";

import { Project } from '../../model/CVModel';
import { Entries } from '../../model/Includes';
import { DevIconName } from '../shared/DevIcon';
import { DynamicImage } from '../shared/DynamicImage';
import { Lanyard } from '../shared/Lanyard';
import { Section } from '../shared/Section';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Reveal } from '../shared/Reveal';

type ProjectsProps = {
  projects: Entries<Project>
}

type ProjectProps = {
  project: Project
  index: number
}

const emitClickEvent = ({name, link}: Project) => {
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
          <ProjectSection project={project} index={index} key={index}/>
        ))}
    </Section>
  );
};

const ProjectSection: React.FC<ProjectProps> = ({ project, index }: ProjectProps): JSX.Element => {
  return (
    <Container className="project-panels">
        <Reveal index={index}>
          <div className="centered line" />
          <Row className="project">
            <ProjectImage project={project} index={index} />
            <ProjectContent project={project} index={index} />
          </Row>
        </Reveal>
      </Container>
  );
};

const ProjectImage: React.FC<ProjectProps> = ({ project }: ProjectProps): JSX.Element => {
  return (
    <Col className="project-image">
        {project.image && (
          <a
            className="image-link"
            href={project.link}
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => emitClickEvent(project)}
          >
            <DynamicImage
              image={project.image}
              className="centered image-item"
            />
            <div className="overlay" />
            <DevIconName icon={project.icon} />
          </a>
        )}
      </Col>
  );
};

const ProjectContent: React.FC<ProjectProps> = ({ project }: ProjectProps): JSX.Element => {
  return (
    <Col className="project-content">
    <div className="content">
      <h2>{project.name}</h2>
      <Lanyard tags={project.tags} />
      {documentToReactComponents(project.summary)}
    </div>
  </Col>
  );
};
