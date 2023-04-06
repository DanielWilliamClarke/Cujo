import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';

import { CVProps, Project } from '../../model/CVModel';
import { SharePanel } from '../nav/SharePanel';
import { Reveal } from '../shared/Reveal';
import { About } from './About';
import { Education } from './Education';
import { Experience } from './Experience';
import { Projects } from './Projects';
import { ReadingList } from './ReadingList';
import { Technical } from './Technical';

export const Profile: React.FC<CVProps> = ({ cv }: CVProps): JSX.Element => {
  const portfolioProject = useMemo(() => cv.projects.entries.find(
    (project: Project) => project.rank === 2
  ), [cv]);

  const [href, setHref] = useState('');
  useEffect(() => {
    setHref(window.location.href);
  }, [])

  return (
    <>
      <SharePanel
        url={href}
        title="Daniel William Clarke Portfolio"
        body={cv.about.entry.label}
        hashtag="DCTechPortfolio"
      />
      <Head>
        <title>{cv.about.entry.name}</title>
        <meta property="og:title" content={cv.about.entry.name} />
        <meta
          property="og:image"
          content={`https://${portfolioProject?.image?.file.url}`}
        />
        <meta
          property="og:description"
          content={cv.about.entry.label}
        />
        <meta property="og:url" content={href} />
      </Head>
      {[
        <About key='about' about={cv.about} />,
        <Experience key='work' work={cv.work} />,
        <Education key='education' education={cv.education} />,
        <Technical key='skills' skills={cv.skills} />,
        <Projects key='projects' projects={cv.projects} />,
        <ReadingList key='readingList' readingList={cv.readingList} />
      ].map((element: JSX.Element, index: number) => (
        <Reveal key={index} index={index}>
          {element}
        </Reveal>
      ))}
    </>
  );
};
