import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WPAPI from "wpapi";

import { Post } from "./BlogPostModel";
import { Media } from "./BlogMediaModel";
import { Tag } from "./BlogTagModel";

import "../../shared/Section.scss";
import "./Blog.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";
import moment from "moment";

interface BlogPost {
  post: Post;
  media: Media;
  tags: Tag[];
}

type BlogState = {
  blog: BlogPost[];
};
export class Blog extends Component<{}, BlogState> {
  private wp: WPAPI;

  constructor(props: {}) {
    super(props);
    this.wp = new WPAPI({
      endpoint: "http://localhost:8000/wp-json",
    });
  }

  correlate([posts, media, tags]: [Post[], Media[], Tag[]]): void {
    const blog: BlogPost[] = posts.map(
      (p: Post): BlogPost => {
        return {
          post: p,
          media: media.find((m: Media): boolean => m.post === p.id),
          tags: tags.filter((t: Tag): boolean => p.tags.includes(t.id)),
        } as BlogPost;
      }
    );

    this.setState({ blog });
  }

  componentWillMount(): void {
    this.setState({ blog: [] });
    Promise.all([this.wp.posts(), this.wp.media(), this.wp.tags()])
      .then(this.correlate.bind(this))
      .catch((err) => console.log(err));
  }

  render(): JSX.Element {
    return (
      <Fragment>
        {this.state.blog.map(
          (b: BlogPost): JSX.Element => (
            <section className="Section Blog">
              <Container>
                <Row>
                  <Col>
                    <h2 className="Section-title">{b.post.title.rendered}</h2>
                    <h4 className="Blog-modified">
                      Last updated {this.toDateSentence(b.post.modified)}
                    </h4>
                    <div className="Line"></div>
                  </Col>
                </Row>

                <Row className="Tags">
                  {b.tags.map(
                    (t: Tag): JSX.Element => (
                      <span className="Col-item">{t.name}</span>
                    )
                  )}
                </Row>

                <Row className="Section-content Blog-excerpt">
                  <Col>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: b.post.excerpt.rendered,
                      }}
                    ></div>
                  </Col>
                </Row>

                {b.media && (
                  <Row className="Section-content">
                    <Col className="Centered Featured">
                      <img src={b.media.source_url} alt="not found..." />
                    </Col>
                  </Row>
                )}

                <Row className="Section-content Blog-content">
                  <Col>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: b.post.content.rendered,
                      }}
                    ></div>
                  </Col>
                </Row>

                <div className="Short-line"></div>
              </Container>
            </section>
          )
        )}
      </Fragment>
    );
  }

  private toDateSentence(date: string): string {
    if (date === "Present") {
      return date;
    }
    return moment(date).format("Do MMMM YYYY HH:mm:ss");
  }
}
