import React, { useMemo } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet';

import { CVProps, Project } from '../../model/CVModel';
import { SharePanel } from '../nav/SharePanel';
import { About } from './About';
import { Education } from './Education';
import { Experience } from './Experience';
import { Projects } from './Projects';
import { Technical } from './Technical';

export const Profile: React.FC<CVProps> = ({ cv }: CVProps): JSX.Element => {
  const portfolioProject = useMemo(() => cv.projects.entries.find(
    (project: Project) => project.rank === 2
  ), [cv]);

  return (
    <>
      <SharePanel
        url={window.location.href}
        title="Daniel William Clarke Portfolio"
        body={cv.about.entry.label}
        hashtag="DCTechPortfolio"
      />
      <Helmet>
        <meta property="og:title" content={cv.about.entry.name} />
        <meta
          property="og:image"
          content={portfolioProject?.image.file.url}
        />
        <meta
          property="og:description"
          content={cv.about.entry.label}
        />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <div className="profile">
        <div>
          {[
            <About about={cv.about} />,
            <Experience work={cv.work} />,
            <Education education={cv.education} />,
            <Technical skills={cv.skills} />,
            <Projects projects={cv.projects} />
          ].map((element: JSX.Element, index: number) => (
            <Fade
              triggerOnce
              delay={0.5}
              direction={index % 2 ? 'left' : 'right'}
              key={index}
            >
              {element}
            </Fade>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
