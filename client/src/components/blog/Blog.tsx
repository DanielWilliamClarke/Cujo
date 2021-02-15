import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WPAPI from "wpapi";

import { Post } from "./BlogPostModel";
import { Media } from "./BlogMediaModel";

import "../../shared/Section.scss";
import "./Blog.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";

interface BlogPost {
  post: Post;
  media: Media;
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

  correlate([posts, media]: [Post[], Media[]]): void {
    const blog: BlogPost[] = posts.map(
      (p: Post): BlogPost => {
        return {
          post: p,
          media: media.find((m: Media): boolean => m.post === p.id),
        } as BlogPost;
      }
    );

    this.setState({ blog });
  }

  componentWillMount(): void {
    this.setState({ blog: [] });
    Promise.all([this.wp.posts(), this.wp.media()])
      .then(this.correlate.bind(this))
      .catch((err) => console.log(err));
  }

  render(): JSX.Element {
    return (
      <Fragment>
        {this.state.blog.map((b) => (
          <section className="Section Blog">
            <Container>
              <Row className="Section-content">
                <Col className="Centered">
                  <h2>{b.post.title.rendered}</h2>
                  <div className="Centered Line"></div>
                </Col>
              </Row>

              {b.media && (
                <Row className="Section-content">
                  <Col className="Centered">
                    <img src={b.media.source_url} alt="not found..." />
                  </Col>
                </Row>
              )}

              <Row className="Section-content Blog-content">
                <Col className="Centered">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: b.post.content.rendered,
                    }}
                  ></div>
                </Col>
              </Row>

              <div className="Centered Short-line"></div>
            </Container>
          </section>
        ))}
      </Fragment>
    );
  }
}
