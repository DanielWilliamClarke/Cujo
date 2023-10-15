import { Portfolio } from '../../src/components/App';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { BlogPost } from '../../src/components/blog/BlogPost';
import { wrapPage } from '../../src/Cujo';
import { CujoProps, fetchCujoBlogPaths, fetchCujoProps } from '../../src/CujoISR';
import { Fragment, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { SharePanel } from '../../src/components/nav/SharePanel';
import { id } from 'inversify';
import { Post } from '../../src/model/BlogPost';

export const getStaticPaths: GetStaticPaths = fetchCujoBlogPaths;
export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage(({ cv, blog }: CujoProps): JSX.Element => {
    const { query: { pid } } = useRouter();

    const post = useMemo(() => blog.entries.find(
        ({ id }: Post) => id === pid
    ), [blog.entries, id]);

    const [href, setHref] = useState('');
    useEffect(() => {
        setHref(window.location.href);
    }, [])

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
                    <meta property="og:image" content={`https://${post.media?.file.url}`} />
                    <meta property="og:description" content={post.excerpt} />
                    <meta property="og:url" content={href} />
                </Head>
            )}
            <Portfolio
                cv={cv}
                blog={blog}
                components={[
                    () => <BlogPost id={pid as string} blog={blog} />,
                ]}
            />
        </Fragment>

    );
});