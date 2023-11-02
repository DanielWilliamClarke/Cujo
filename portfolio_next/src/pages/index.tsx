import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useMemo, useState } from 'react';

import { wrapPage } from '@Cujo/Cujo';
import { fetchCujoProps } from '@Cujo/CujoISR';
import { Portfolio } from '@Cujo/components/App';

import { Project } from '@Models/CVModel';

import { SharePanel } from '@Common/SharePanel';

import { About } from '@Layouts/About';
import { Education } from '@Layouts/Education';
import { Experience } from '@Layouts/Experience';
import { Projects } from '@Layouts/Projects';
import { ReadingList } from '@Layouts/ReadingList';
import { Technical } from '@Layouts/Technical';
import { useAppContext } from '@Cujo/components/hooks/AppContext';

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage((): JSX.Element => {
  const { cv } = useAppContext();

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
      <Portfolio>
        {[
          <About key="about" />,
          <Experience key="work" />,
          <Education key="education" />,
          <Technical key="skills" />,
          <Projects key="projects" />,
          <ReadingList key="readingList" />,
        ]}
      </Portfolio>
    </Fragment>
  );
});
