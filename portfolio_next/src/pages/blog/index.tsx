import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';

import { wrapPage } from '@Cujo/Cujo';
import { fetchCujoProps } from '@Cujo/CujoISR';
import { Portfolio } from '@Cujo/components/App';

import { SharePanel } from '@Common/SharePanel';
import { useAppContext } from '@Cujo/components/hooks/AppContext';

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage((): JSX.Element => {
  const {cv, blog} = useAppContext();
  
  const [href, setHref] = useState('');
  useEffect(() => {
    setHref(window.location.href);
  }, []);

  const title = `${cv.about.entry.name} - Blog`;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content={`https://${blog.entries[0].media?.file.url}`}
        />
        <meta property="og:description" content={blog.entries[0].title} />
        <meta property="og:url" content={href} />
      </Head>
      <SharePanel
        url={href}
        title={`${cv.about.entry.name} Blog`}
        body={cv.about.entry.label}
        hashtag="DanClarkeDevBlog"
      />
      <Portfolio />
    </Fragment>
  );
});
