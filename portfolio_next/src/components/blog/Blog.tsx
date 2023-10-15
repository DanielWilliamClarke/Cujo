import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { useInjection } from 'inversify-react';
import React, { useEffect, useState } from 'react';
import { Card, Col, Nav, Row } from 'react-bootstrap';
import readingTime from 'reading-time';
import { Post } from '../../model/BlogPost';
import { Entries } from '../../model/Includes';
import { IDateService } from '../../services/DateService';
import { IIconService } from '../../services/IconService';
import { Lanyard } from '../shared/Lanyard';
import { GenericComponentProps } from '../shared/props';
import { Reveal } from '../shared/Reveal';
import { Section } from '../shared/Section';

export type BlogProps = {
  blog: Entries<Post>
}

export type BlogSummaryProps = {
  post: Post
  index: number
}

export const Blog: React.FC<BlogProps> = ({ blog }: BlogProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format('Do MMMM YYYY HH:mm:ss');

  return (
    <Section id="blog" title="Blog">
      <Row xs={1} md={2} className="g-4 blog-cards">
        {(blog.entries.length > 0)
          ? (
            blog.entries
              .sort(
                (a: Post, b: Post) =>
                  dateService.toUnix(b.sys.updatedAt.toString()) -
                  dateService.toUnix(a.sys.updatedAt.toString())
              )
              .map((post: Post, index: number) => (
                <BlogSummaryPanel post={post} index={index} key={index} />
              ))
          )
          : (
            <Col className="blog-placeholder centered">Coming soon</Col>
          )}
      </Row>
    </Section>
  );
};

const BlogSummaryPanel: React.FC<BlogSummaryProps> = ({ post, index }: BlogSummaryProps): JSX.Element => {
  const iconService = useInjection(IIconService.$);
  const Icon = iconService.getWithDefault('post');
  const dateService = useInjection(IDateService.$);
  dateService.format('Do MMMM YYYY HH:mm');

  const stats = readingTime(documentToPlainTextString(post.content));

  const [publishedDate, setPublishedDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  // Render date strings on the client as they fail during ISR
  useEffect(() => {
    setPublishedDate(dateService.toSentence(post.sys.createdAt.toString()))
    setUpdatedDate(dateService.toSentence(post.sys.updatedAt.toString()))
  }, [post.sys, dateService]);

  return (
    <Col>
      <Reveal index={index}>
        <Card key={post.id} bg="dark">
          <Nav navbarScroll>
            <Nav.Link href={`/blog/${post.id}`}>
              {(post.media != null)
                ? (
                  <Card.Img
                    variant="top"
                    src={post.media.file.url}
                    alt={post.media.description}
                  />
                )
                : (
                  <Icon />
                )}
            </Nav.Link>
          </Nav>

          <Card.Body>
            <Nav navbarScroll>
              <Nav.Link href={`/blog/${post.id}`}>
                <Card.Title>{post.title}</Card.Title>
              </Nav.Link>
            </Nav>
            <Card.Text>
              Last updated {updatedDate}
            </Card.Text>
            <Lanyard tags={post.tags} />
            <Card.Text className="text-muted">
              {post.excerpt}
            </Card.Text>
            <small className="text-muted">{stats.text}</small>
          </Card.Body>

          <Card.Footer>
            <small className="text-muted">
              Published {publishedDate}
            </small>
          </Card.Footer>
        </Card>
      </Reveal>
    </Col>
  );
};
