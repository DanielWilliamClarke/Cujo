import React from "react";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { useInjection } from "inversify-react";
import { Fade } from "react-awesome-reveal";
import { IDateService } from "../../services/DateService";
import { Post } from "../../model/BlogPost";
import { Entries } from "../../model/Includes";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";
import readingTime from "reading-time";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { IIconService } from "../../services/IconService";

import "../shared/Portfolio.scss";
import "./Blog.scss";

export type BlogProps = {
  blog: Entries<Post>;
};

export type BlogSummaryProps = {
  post: Post;
  index: number;
};

export const Blog: React.FC<BlogProps> = ({ blog }: BlogProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format("Do MMMM YYYY HH:mm:ss");

  return (
    <Fade triggerOnce direction="up">
      <Section id="blog" bg="section-dark" title="Blog">
        <Row xs={1} md={2} className="g-4 blog-cards">
          {blog.entries.length ? (
            blog.entries
              .sort(
                (a: Post, b: Post) =>
                  dateService.toUnix(b.sys.createdAt.toString()) -
                  dateService.toUnix(a.sys.createdAt.toString())
              )
              .map((post: Post, index: number) => (
                <BlogSummaryPanel post={post} index={index} key={index} />
              ))
          ) : (
            <Col className="blog-placeholder centered">Coming soon</Col>
          )}
        </Row>
      </Section>
    </Fade>
  )
}

const BlogSummaryPanel: React.FC<BlogSummaryProps> = ({ post, index }: BlogSummaryProps): JSX.Element => {
  const iconService = useInjection(IIconService.$);
  const Icon = iconService.getWithDefault("post");

  const dateService = useInjection(IDateService.$);
  dateService.format("Do MMMM YYYY HH:mm:ss");

  const stats = readingTime(documentToPlainTextString(post.content));

  return (
    <Col>
      <Fade triggerOnce direction={index % 2 ? "right" : "left"}>
        <Card key={post.id} bg="dark">
          <Nav navbarScroll>
            <Nav.Link href={`/blog/${post.id}`}>
              {post.media ? (
                <Card.Img variant="top" src={post.media.file.url} />
              ) : (
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
              Published{" "}
              {dateService.toSentence(post.sys.createdAt.toString())}{" "}
            </Card.Text>
            <Lanyard tags={post.tags} />
            <Card.Text className="text-muted">
              {post.excerpt}
            </Card.Text>
            <small className="text-muted">{stats.text}</small>
          </Card.Body>

          <Card.Footer>
            <small className="text-muted">
              Last updated{" "}
              {dateService.toSentence(post.sys.updatedAt.toString())}
            </small>
          </Card.Footer>
        </Card>
      </Fade>
    </Col>
  )
}