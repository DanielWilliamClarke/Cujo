import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Post } from "./BlogPostModel";
import { Media } from "./BlogMediaModel";
import { Tag } from "./BlogTagModel";

import "../../shared/Section.scss";
import "./BlogPost.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";
import moment from "moment";

export interface BlogPostData {
  post: Post;
  media: Media;
  tags: Tag[];
}

type BlogPostProps = {
  p: BlogPostData;
};

export class BlogPost extends Component<BlogPostProps> {
  render(): JSX.Element {
    return (
      <section className="Section Blog-post">
        <Container>
          <Row>
            <Col>
              <h2 className="Section-title">{this.props.p.post.title.rendered}</h2>
              <h4 className="Blog-modified">
                Last updated {this.toDateSentence(this.props.p.post.modified)}
              </h4>
              <div className="Line"></div>
            </Col>
          </Row>

          <Row className="Tags">
            {this.props.p.tags.map(
              (t: Tag): JSX.Element => (
                <span className="Col-item">{t.name}</span>
              )
            )}
          </Row>

          <Row className="Section-content Blog-excerpt">
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.p.post.excerpt.rendered,
                }}
              ></div>
            </Col>
          </Row>

          {this.props.p.media && (
            <Row className="Section-content">
              <Col className="Centered Featured">
                <img src={this.props.p.media.source_url} alt="not found..." />
              </Col>
            </Row>
          )}

          <Row className="Section-content Blog-content">
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.p.post.content.rendered,
                }}
              ></div>
            </Col>
          </Row>

          <div className="Short-line"></div>
        </Container>
      </section>
    );
  }

  private toDateSentence(date: string): string {
    if (date === "Present") {
      return date;
    }
    return moment(date).format("Do MMMM YYYY HH:mm:ss");
  }
}
