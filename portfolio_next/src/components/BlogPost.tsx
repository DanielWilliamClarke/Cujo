/** @jsxImportSource theme-ui */

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { CommonNode, documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import { useInjection } from 'inversify-react';
import React, { Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { obsidian } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import readingTime from 'reading-time';

import dynamic from 'next/dynamic';
import { Post } from '../model/BlogPost';
import { Entries, getAsset, Includes } from '../model/Includes';
import { IDateService } from '../services/DateService';
import { DynamicImage } from './DynamicImage';
import { Lanyard } from './Lanyard';
import { Section } from './Section';
import { centeredStyle, Line, LongLine } from './UtilComponents';

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

  if (!post) {
    return <></>;
  }

  return (
    <PostContent
      post={post}
      includes={blog.includes}
    />
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
          language="rust"
          style={obsidian}
          showLineNumbers
          sx={{
            borderRadius: 12,
            marginY: 50,
            width: '100%',
            boxShadow: '0 0 25px shadow'
          }}
        >
          {text as string}
        </SyntaxHighlighter>
      )
    },
    renderNode: {
      [BLOCKS.HR]: () => (
        <LongLine centered />
      ),
      [INLINES.HYPERLINK]: (
        node: CommonNode,
        children: ReactNode
      ) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      [BLOCKS.PARAGRAPH]: (
        _: CommonNode,
        children: ReactNode
      ) => (
        <div
          sx={{
            paddingBottom: 10,
          }}
        >
          {children}
        </div>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (
        node: CommonNode
      ) => {
        const media = getAsset(
          includes,
          node.data.target.sys.id
        );

        if (!media) {
          return null;
        }

        return (
          <Row
            sx={{
              marginY: [10, 20, 20]
            }}
          >
            <Col
              sx={{
                ...centeredStyle,
                textAlign: 'center'
              }}
            >
              <DynamicImage
                image={media}
                sx={{
                  borderRadius: 12,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Col>
          </Row>
        );
      }
    }
  }), [includes]);

  return (
    <Section id="post" title={post.title}>
      <Lanyard tags={post.tags} />
      <h4
        sx={{
          textAlign: 'center'
        }}
      >
        Last updated {updatedDate}
      </h4>
      {(post.media != null) && (
        <Fragment>
          <Row
            sx={{
              marginY: [10, 20, 20]
            }}
          >
            <Col
              sx={{
                ...centeredStyle,
                textAlign: 'center'
              }}
            >
              <DynamicImage
                image={post.media}
                sx={{
                  borderRadius: 12,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Col>
          </Row>
          <Line centered />
        </Fragment>
      )}

      <p
        sx={{
          marginTop: 10,
          textAlign: 'center',
          color: 'muted'
        }}
      >
        {stats.text}
      </p>

      <Row
        sx={{
          textAlign: 'left',
          marginY: [10, 20, 20],
          "h1,h2,h3,h4,h5,h6": {
            paddingTop: 20
          }
        }}
      >
        <Col>{documentToReactComponents(post.content, options)}</Col>
      </Row>
    </Section >
  );
};