import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Block, Inline } from "@contentful/rich-text-types";
import "highlight.js/scss/tomorrow-night-eighties.scss";
import { resolve } from "inversify-react";
import { Component } from "react";
import { Fade } from "react-awesome-reveal";
import { Col, Row } from "react-bootstrap";
import { GiScrollQuill } from "react-icons/gi";
import {
  ContentfulEntries,
  getMediaURL,
  Item,
} from "../../model/ContentfulEntries";
import readingTime from "reading-time";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { IDateService } from "../../services/DateService";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";

import "./BlogPost.scss";
import "../shared/Portfolio.scss";

type BlogProps = {
  id: string;
  blog: ContentfulEntries;
};

export class BlogPost extends Component<BlogProps> {
  @resolve("DateService") private readonly dateService!: IDateService;

  async componentWillMount() {
    this.dateService.format("Do MMMM YYYY HH:mm:ss");
  }

  render(): JSX.Element {
    const post = this.props.blog.items.find(
      (item: Item) => item.fields.id === this.props.id
    );

    return <>{post && this.displayPost(post)}</>;
  }

  private displayPost(item: Item): JSX.Element {
    const mediaUrl = getMediaURL(
      this.props.blog.includes,
      item.fields.media.sys.id
    );

    const stats = readingTime(documentToPlainTextString(item.fields.content));

    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline): JSX.Element => {
          const mediaUrl = getMediaURL(
            this.props.blog.includes,
            node.data.target.sys.id
          );

          return (
            <Row className="section-content">
              <Col className="centered featured">
                <img src={mediaUrl} alt="not found..." />
              </Col>
            </Row>
          );
        },
      },
    };

    return (
      <Fade triggerOnce direction="left">
        <Section
          id="post"
          bg="section-light"
          title={item.fields.title}
          icon={GiScrollQuill}
        >
          <h4 className="blog-date">
            {this.dateService.toSentence(item.sys.updatedAt.toString())}
          </h4>

          <Lanyard className="tags" tags={item.fields.tags} />

          {mediaUrl && (
            <>
              <Row className="section-content">
                <Col className="centered featured">
                  <img src={mediaUrl} alt="not found..." />
                </Col>
              </Row>
              <div className="line centered" />
            </>
          )}

          <small className="text-muted">{stats.text}</small>

          <Row className="section-content blog-content">
            <Col>{documentToReactComponents(item.fields.content, options)}</Col>
          </Row>
        </Section>
      </Fade>
    );
  }
}
