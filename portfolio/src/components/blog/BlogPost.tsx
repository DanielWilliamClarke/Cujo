import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  Block,
  BLOCKS,
  MARKS,
  INLINES,
  Inline,
} from "@contentful/rich-text-types";

import { resolve } from "inversify-react";
import React, { ReactNode } from "react";
import { Fade } from "react-awesome-reveal";
import { Col, Row } from "react-bootstrap";
import readingTime from "reading-time";
import SyntaxHighlighter from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Post } from "../../model/BlogPost";
import { getAsset, Entries } from "../../model/Includes";
import { IDateService } from "../../services/DateService";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";
import { SharePanel } from "../nav/SharePanel";

import "../shared/Portfolio.scss";
import "./BlogPost.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";

type BlogProps = {
  id: string;
  blog: Entries<Post>;
};

export class BlogPost extends React.Component<BlogProps> {
  @resolve("DateService") private readonly dateService!: IDateService;

  constructor(props: BlogProps, context: {}) {
    super(props, context);
    this.dateService.format("Do MMMM YYYY HH:mm:ss");
  }

  render(): JSX.Element {
    const post = this.props.blog.entries.find(
      (post: Post) => post.id === this.props.id
    );

    return (
      <>
        {post && (
          <>
            <SharePanel
              url={window.location.href}
              title={post.title}
              body={post.excerpt}
              hashtag="DCTechBlog"
            />
            {this.displayPost(post)}
          </>
        )}
      </>
    );
  }

  private displayPost(post: Post): JSX.Element {
    const stats = readingTime(documentToPlainTextString(post.content));

    const options = {
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
        ),
      },
      renderNode: {
        [BLOCKS.HR]: (node: Block | Inline): JSX.Element => (
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
              ({ type }: { type: string }) => type === "code"
            )
          ) {
            return <div>{children}</div>;
          }
          return <p>{children}</p>;
        },
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

          <p className="text-muted">{stats.text}</p>

          <Row className="section-content blog-content">
            <Col>{documentToReactComponents(post.content, options)}</Col>
          </Row>
        </Section>
      </Fade>
    );
  }
}
