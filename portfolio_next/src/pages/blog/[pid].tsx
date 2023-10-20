import { id } from 'inversify';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from 'react';

import { wrapPage } from '@Cujo/Cujo';
import { Portfolio } from '@Cujo/components/App';

import { Post } from '@Models/BlogPost';

import { SharePanel } from '@Common/SharePanel';

import { BlogPost } from '@Layouts/BlogPost';

import { CujoProps, fetchCujoBlogPaths, fetchCujoProps } from '../../CujoISR';

export const getStaticPaths: GetStaticPaths = fetchCujoBlogPaths;
export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage(({ cv, blog }: CujoProps): JSX.Element => {
  const {
    query: { pid },
  } = useRouter();

  const post = useMemo(
    () => blog.entries.find(({ id }: Post) => id === pid),
    [blog.entries, id],
  );

  const [href, setHref] = useState('');
  useEffect(() => {
    setHref(window.location.href);
  }, []);

  return (
    <Fragment>
      {post && (
        <SharePanel
          url={href}
          title={post.title}
          body={post.excerpt}
          hashtag="DCTechBlog"
        />
      )}
      {post && (
        <Head>
          <title>{post.title}</title>
          <meta property="og:title" content={post.title} />
          <meta
            property="og:image"
            content={`https://${post.media?.file.url}`}
          />
          <meta property="og:description" content={post.excerpt} />
          <meta property="og:url" content={href} />
        </Head>
      )}
      <Portfolio cv={cv} blog={blog}>
        {[<BlogPost id={pid as string} blog={blog} />]}
      </Portfolio>
    </Fragment>
  );
});
