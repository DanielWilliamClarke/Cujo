/** @jsxImportSource theme-ui */
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { getColor } from '@theme-ui/color';
import { useInjection } from 'inversify-react';
import React, { useEffect, useState } from 'react';
import { Card, Col, Nav, Row } from 'react-bootstrap';
import readingTime from 'reading-time';
import { Theme } from 'theme-ui';

import { Post } from '@Models/BlogPost';
import { Entries } from '@Models/Includes';

import { usePositionContext } from '@Hooks/PositionContext';

import { IDateService } from '@Services/DateService';
import { IIconService } from '@Services/IconService';

import { Lanyard } from '@Common/Lanyard';
import { Reveal } from '@Common/Reveal';
import { Section } from '@Common/Section';
import { centeredStyle } from '@Common/UtilComponents';

export type BlogProps = {
  blog: Entries<Post>;
};

export type BlogSummaryProps = {
  post: Post;
  index: number;
};

export const Blog: React.FC<BlogProps> = ({ blog }: BlogProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format('Do MMMM YYYY HH:mm:ss');

  return (
    <Section id="blog" title="Blog">
      <Row
        xs={1}
        md={2}
        className="g-4"
        sx={{
          paddingY: 20,
        }}
      >
        {blog.entries.length > 0 ? (
          blog.entries
            .sort(
              (a: Post, b: Post) =>
                dateService.toUnix(b.sys.updatedAt.toString()) -
                dateService.toUnix(a.sys.updatedAt.toString()),
            )
            .map((post: Post, index: number) => (
              <BlogSummaryPanel post={post} index={index} key={index} />
            ))
        ) : (
          <Col
            sx={{
              ...centeredStyle,
              textAlign: 'center',
            }}
          >
            Coming soon
          </Col>
        )}
      </Row>
    </Section>
  );
};

const BlogSummaryPanel: React.FC<BlogSummaryProps> = ({
  post,
  index,
}: BlogSummaryProps): JSX.Element => {
  const iconService = useInjection(IIconService.$);
  const Icon = iconService.getWithDefault('post');
  const dateService = useInjection(IDateService.$);
  dateService.format('Do MMMM YYYY HH:mm');

  const { even } = usePositionContext();

  const stats = readingTime(documentToPlainTextString(post.content));

  const [publishedDate, setPublishedDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  // Render date strings on the client as they fail during ISR
  useEffect(() => {
    setPublishedDate(dateService.toSentence(post.sys.createdAt.toString()));
    setUpdatedDate(dateService.toSentence(post.sys.updatedAt.toString()));
  }, [post.sys, dateService]);

  return (
    <Col>
      <Reveal index={index}>
        <Card
          key={post.id}
          bg="dark"
          sx={(t: Theme) => ({
            border: 0,
            borderRadius: 12,
            marginY: 10,
            textAlign: 'left',
            transition: '0.5s',
            '&.bg-dark': {
              backgroundColor: `${getColor(
                t,
                even ? 'bgLight' : 'bgDark',
              )}  !important`,
            },
            '&:hover': {
              transform: 'scale(1.02)',
            },
          })}
        >
          <Nav navbarScroll>
            <Nav.Link
              href={`/blog/${post.id}`}
              sx={{
                width: '100%',
                padding: 0,

                '&:link,&:visited': {
                  textDecoration: 'none',
                },
              }}
            >
              {post.media != null ? (
                <Card.Img
                  variant="top"
                  src={post.media.file.url}
                  alt={post.media.description}
                  sx={{
                    height: 250,
                    objectFit: 'cover',
                    borderTopRightRadius: 12,
                    borderTopLeftRadius: 12,
                  }}
                />
              ) : (
                <Icon
                  sx={{
                    maxHeight: 100,
                    marginY: 50,
                    width: '100%',
                    color: 'muted',
                  }}
                />
              )}
            </Nav.Link>
          </Nav>

          <Card.Body>
            <Nav navbarScroll>
              <Nav.Link
                href={`/blog/${post.id}`}
                sx={{
                  width: '100%',
                  padding: 0,

                  '&:link,&:visited': {
                    textDecoration: 'none',
                  },
                }}
              >
                <Card.Title>{post.title}</Card.Title>
              </Nav.Link>
            </Nav>
            <Card.Text>Last updated {updatedDate}</Card.Text>
            <Lanyard tags={post.tags} />
            <Card.Text className="text-muted">{post.excerpt}</Card.Text>
            <small className="text-muted">{stats.text}</small>
          </Card.Body>

          <Card.Footer
            sx={{
              border: 0,
            }}
          >
            <small className="text-muted">Published {publishedDate}</small>
          </Card.Footer>
        </Card>
      </Reveal>
    </Col>
  );
};
