import { Component } from "react";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { resolve } from "inversify-react";
import { Fade } from "react-awesome-reveal";
import { IDateService } from "../../services/DateService";
import { Post } from "../../model/BlogPost";
import { Entries } from "../../model/Includes";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";
import readingTime from "reading-time";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { IconWithDefaultState, IIconService } from "../../services/IconService";

import "../shared/Portfolio.scss";
import "./Blog.scss";

export type BlogProps = {
  blog: Entries<Post>;
};

export class Blog extends Component<BlogProps, IconWithDefaultState> {
  @resolve("DateService") private readonly dateService!: IDateService;
  @resolve("IconService") private readonly iconService!: IIconService;

  constructor(props: BlogProps, context: {}) {
    super(props, context);
    this.dateService.format("Do MMMM YYYY HH:mm:ss");
    this.state = {
      icon: this.iconService.getWithDefault("post"),
    };
  }

  render(): JSX.Element {
    return (
      <Fade triggerOnce direction="up">
        <Section id="blog" bg="section-dark" title="Blog">
          <Row xs={1} md={2} className="g-4 blog-cards">
            {this.props.blog.entries.length ? (
              this.props.blog.entries
                .sort(
                  (a: Post, b: Post) =>
                    this.dateService.toUnix(b.sys.createdAt.toString()) -
                    this.dateService.toUnix(a.sys.createdAt.toString())
                )
                .map(this.blogSummaryPanel.bind(this))
            ) : (
              <Col className="blog-placeholder centered">Coming soon</Col>
            )}
          </Row>
        </Section>
      </Fade>
    );
  }

  private blogSummaryPanel(post: Post, index: number): JSX.Element {
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
                  <this.state.icon />
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
                {this.dateService.toSentence(post.sys.createdAt.toString())}{" "}
              </Card.Text>
              <Lanyard tags={post.tags} />
              <Card.Text
                className="text-muted"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt,
                }}
              />
              <small className="text-muted">{stats.text}</small>
            </Card.Body>

            <Card.Footer>
              <small className="text-muted">
                Last updated{" "}
                {this.dateService.toSentence(post.sys.updatedAt.toString())}
              </small>
            </Card.Footer>
          </Card>
        </Fade>
      </Col>
    );
  }
}
