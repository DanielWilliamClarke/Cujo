import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  Block,
  BLOCKS,
  MARKS,
  INLINES,
  Inline
} from '@contentful/rich-text-types';
import { Helmet } from 'react-helmet';

import { useInjection } from 'inversify-react';
import React, { ReactNode, useMemo } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Col, Row } from 'react-bootstrap';
import readingTime from 'reading-time';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Post } from '../../model/BlogPost';
import { getAsset, Entries, Includes } from '../../model/Includes';
import { IDateService } from '../../services/DateService';
import { Lanyard } from '../shared/Lanyard';
import { Section } from '../shared/Section';
import { SharePanel } from '../nav/SharePanel';

import '../shared/Portfolio.scss';
import './BlogPost.scss';
import 'highlight.js/scss/tomorrow-night-eighties.scss';

interface BlogProps {
  id: string
  blog: Entries<Post>
}

interface PostProps {
  post: Post
  includes: Includes
}

export const BlogPost: React.FC<BlogProps> = ({ id, blog }: BlogProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format('Do MMMM YYYY HH:mm:ss');

  const post = useMemo(() => blog.entries.find(
    (post: Post) => post.id === id
  ), [blog.entries, id]);

  return (
    <>
      {(post != null) && (
        <>
          <SharePanel
            url={window.location.href}
            title={post.title}
            body={post.excerpt}
            hashtag="DCTechBlog"
          />
          <Helmet>
            <title>{post.title}</title>
            <meta property="og:title" content={post.title} />
            <meta property="og:image" content={post.media?.file.url} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:url" content={window.location.href} />
          </Helmet>
          <PostContent post={post} includes={blog.includes} />
        </>
      )}
    </>
  );
};

const PostContent: React.FC<PostProps> = ({ post, includes }: PostProps) => {
  const dateService = useInjection(IDateService.$);
  dateService.format('Do MMMM YYYY HH:mm:ss');

  const stats = readingTime(documentToPlainTextString(post.content));
  const options = useMemo(() => ({
    renderMark: {
      [MARKS.CODE]: (text: ReactNode): JSX.Element => (
        <SyntaxHighlighter
          className="code-snippet"
          language="rust"
          style={obsidian}
          showLineNumbers
        >
          {text}
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
      [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => {
        if (
          node.content.length === 1 &&
          node.content[0].marks.find(
            ({ type }: { type: string }) => type === 'code'
          )
        ) {
          return <div>{children}</div>;
        }
        return <p>{children}</p>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline): JSX.Element => {
        const media = getAsset(
          includes,
          node.data.target.sys.id
        );

        return (
          <Row className="section-content">
            <Col className="centered featured">
              <img src={media?.file.url} alt={media?.description} />
            </Col>
          </Row>
        );
      }
    }
  }), [includes]);

  return (
    <Fade triggerOnce direction="left">
      <Section id="post" bg="section-light" title={post.title}>
        <h4 className="blog-date">
          {dateService.toSentence(post.sys.updatedAt.toString())}
        </h4>

        <Lanyard className="tags" tags={post.tags} />

        {(post.media != null) && (
          <>
            <Row className="section-content">
              <Col className="centered featured">
                <img src={post.media.file.url} alt={post.media.description} />
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
    </Fade>
  );
};

export default BlogPost;
