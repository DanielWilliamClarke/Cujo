import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  Block,
  BLOCKS, Inline, INLINES, MARKS
} from '@contentful/rich-text-types';

import { useInjection } from 'inversify-react';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { obsidian } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import readingTime from 'reading-time';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Post } from '../../model/BlogPost';
import { Entries, getAsset, Includes } from '../../model/Includes';
import { IDateService } from '../../services/DateService';
import { SharePanel } from '../nav/SharePanel';
import { DynamicImage } from '../shared/DynamicImage';
import { Lanyard } from '../shared/Lanyard';
import { Reveal } from '../shared/Reveal';
import { Section } from '../shared/Section';

const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'), {
  ssr: false
})

type BlogProps = {
  id: string
  blog: Entries<Post>
}

type PostProps = {
  post: Post
  includes: Includes
}

export const BlogPost: React.FC<BlogProps> = ({ id, blog }: BlogProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format('Do MMMM YYYY HH:mm:ss');

  const post = useMemo(() => blog.entries.find(
    (post: Post) => post.id === id
  ), [blog.entries, id]);

  const [href, setHref] = useState('');
  useEffect(() => {
    setHref(window.location.href);
  }, [])

  return (
    <>
      {(post != null) && (
        <>
          <SharePanel
            url={href}
            title={post.title}
            body={post.excerpt}
            hashtag="DCTechBlog"
          />
          <Head>
            <title>{post.title}</title>
            <meta property="og:title" content={post.title} />
            <meta property="og:image" content={post.media?.file.url} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:url" content={href} />
          </Head>
          <PostContent post={post} includes={blog.includes} />
        </>
      )}
    </>
  );
};

const PostContent: React.FC<PostProps> = ({ post, includes }: PostProps) => {
  const dateService = useInjection(IDateService.$);
  dateService.format('Do MMMM YYYY HH:mm');

  const stats = readingTime(documentToPlainTextString(post.content));

  // Render date strings on the client as they fail during ISR
  const [updatedDate, setUpdatedDate] = useState('');
  useEffect(() => {
    setUpdatedDate(dateService.toSentence(post.sys.updatedAt.toString()))
  }, [post.sys, dateService]);

  const options = useMemo(() => ({
    renderMark: {
      [MARKS.CODE]: (text: ReactNode): JSX.Element => (
        <SyntaxHighlighter
          className="code-snippet"
          language="rust"
          style={obsidian}
          showLineNumbers
        >
          {text as string}
        </SyntaxHighlighter>
      )
    },
    renderNode: {
      [BLOCKS.HR]: (): JSX.Element => (
        <div className="long-line centered" />
      ),
      [INLINES.HYPERLINK]: (
        { data }: Block | Inline,
        children: ReactNode
      ): JSX.Element => (
        <a href={data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => (
        <div>{children}</div>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline): JSX.Element | null => {
        const media = getAsset(
          includes,
          node.data.target.sys.id
        );

        if (!media) {
          return null;
        }

        return (
          <Row className="section-content">
            <Col className="centered featured">
              <DynamicImage
                image={media}
              />
            </Col>
          </Row>
        );
      }
    }
  }), [includes]);

  return (
    <Reveal direction='up'>
      <Section id="post" bg="section-light" title={post.title}>
        <h4 className="blog-date">
          {updatedDate}
        </h4>

        <Lanyard className="tags" tags={post.tags} />

        {(post.media != null) && (
          <>
            <Row className="section-content">
              <Col className="centered featured">
                <DynamicImage
                  image={post.media}
                />
              </Col>
            </Row>
            <div className="line centered" />
          </>
        )}

        <p className="text-muted">{stats.text}</p>

        <Row className="section-content blog-content">
          <Col>{documentToReactComponents(post.content, options)}</Col>
        </Row>
      </Section>
    </Reveal>
  );
};