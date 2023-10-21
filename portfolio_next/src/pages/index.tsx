import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useMemo, useState } from 'react';

import { wrapPage } from '@Cujo/Cujo';
import { CujoProps, fetchCujoProps } from '@Cujo/CujoISR';
import { Portfolio } from '@Cujo/components/App';

import { Project } from '@Models/CVModel';

import { SharePanel } from '@Common/SharePanel';

import { About } from '@Layouts/About';
import { Education } from '@Layouts/Education';
import { Experience } from '@Layouts/Experience';
import { Projects } from '@Layouts/Projects';
import { ReadingList } from '@Layouts/ReadingList';
import { Technical } from '@Layouts/Technical';

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage(({ cv, blog }: CujoProps): JSX.Element => {
  const [href, setHref] = useState('');
  useEffect(() => {
    setHref(window.location.href);
  }, []);

  const portfolioProject = useMemo(
    () => cv.projects.entries.find(({ rank }: Project) => rank === 2),
    [cv],
  );

  const title = `${cv.about.entry.name} Portfolio`;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content={`https://${portfolioProject?.image?.file.url}`}
        />
        <meta property="og:description" content={cv.about.entry.label} />
        <meta property="og:url" content={href} />
      </Head>
      <SharePanel
        url={href}
        title={title}
        body={cv.about.entry.label}
        hashtag="DanClarkeDevPortfolio"
      />
      <Portfolio cv={cv} blog={blog}>
        {[
          <About key="about" about={cv.about} />,
          <Experience key="work" work={cv.work} />,
          <Education key="education" education={cv.education} />,
          <Technical key="skills" skills={cv.skills} />,
          <Projects key="projects" projects={cv.projects} />,
          <ReadingList key="readingList" readingList={cv.readingList} />,
        ]}
      </Portfolio>
    </Fragment>
  );
});