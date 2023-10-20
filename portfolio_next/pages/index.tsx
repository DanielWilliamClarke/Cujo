import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useMemo, useState } from 'react';

import { Portfolio } from '../src/components/App';
import { SharePanel } from '../src/components/SharePanel';
import { About } from '../src/components/About';
import { Education } from '../src/components/Education';
import { Experience } from '../src/components/Experience';

import { Projects } from '../src/components/Projects';
import { ReadingList } from '../src/components/ReadingList';
import { Technical } from '../src/components/Technical';
import { wrapPage } from '../src/Cujo';
import { CujoProps, fetchCujoProps } from '../src/CujoISR';
import { Project } from '../src/model/CVModel';

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage(({ cv, blog }: CujoProps): JSX.Element => {
    const [href, setHref] = useState('');
    useEffect(() => {
        setHref(window.location.href);
    }, [])

    const portfolioProject = useMemo(
        () => cv.projects.entries.find(({ rank }: Project) => rank === 2),
        [cv]
    );

    return (
        <Fragment>
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
            <SharePanel
                url={href}
                title={`${cv.about.entry.name} Portfolio`}
                body={cv.about.entry.label}
                hashtag="DCTechPortfolio"
            />
            <Portfolio
                cv={cv}
                blog={blog}
            >
                {[
                    <About key='about' about={cv.about} />,
                    <Experience key='work' work={cv.work} />,
                    <Education key='education' education={cv.education} />,
                    <Technical key='skills' skills={cv.skills} />,
                    <Projects key='projects' projects={cv.projects} />,
                    <ReadingList key='readingList' readingList={cv.readingList} />
                ]}
            </Portfolio>
        </Fragment>
    );
})