import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Block, BLOCKS, Inline } from "@contentful/rich-text-types";

import { resolve } from "inversify-react";
import { Component } from "react";
import { Fade } from "react-awesome-reveal";
import { Col, Row } from "react-bootstrap";
import readingTime from "reading-time";
import { Post } from "../../model/BlogPost";
import { getAsset, Entries } from "../../model/Includes";
import { IDateService } from "../../services/DateService";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";

import "../shared/Portfolio.scss";
import "./BlogPost.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";

type BlogProps = {
  id: string;
  blog: Entries<Post>;
};

export class BlogPost extends Component<BlogProps> {
  @resolve("DateService") private readonly dateService!: IDateService;

  constructor(props: BlogProps, context: {}) {
    super(props, context);
    this.dateService.format("Do MMMM YYYY HH:mm:ss");
  }

  render(): JSX.Element {
    const post = this.props.blog.entries.find(
      (post: Post) => post.id === this.props.id
    );

    return <>{post && this.displayPost(post)}</>;
  }

  private displayPost(post: Post): JSX.Element {
    const stats = readingTime(documentToPlainTextString(post.content));

    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline): JSX.Element => {
          const media = getAsset(
            this.props.blog.includes,
            node.data.target.sys.id
          );

          return (
            <Row className="section-content">
              <Col className="centered featured">
                <img src={media?.file.url} alt={media?.description} />
              </Col>
            </Row>
          );
        },
      },
    };

    return (
      <Fade triggerOnce direction="left">
        <Section id="post" bg="section-light" title={post.title}>
          <h4 className="blog-date">
            {this.dateService.toSentence(post.sys.updatedAt.toString())}
          </h4>

          <Lanyard className="tags" tags={post.tags} />

          {post.media && (
            <>
              <Row className="section-content">
                <Col className="centered featured">
                  <img src={post.media.file.url} alt={post.media.description} />
                </Col>
              </Row>
              <div className="line centered" />
            </>
          )}

          <small className="text-muted">{stats.text}</small>

          <Row className="section-content blog-content">
            <Col>{documentToReactComponents(post.content, options)}</Col>
          </Row>
        </Section>
      </Fade>
    );
  }
}
