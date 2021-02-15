import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WPAPI from "wpapi";
import Interweave from "interweave";

import { BlogPost } from "./BlogModel";

import "../../shared/Section.scss";
import "./Blog.scss";

type BlogState = {
  posts: BlogPost[];
};

export class Blog extends Component<{}, BlogState> {
  private wp: WPAPI;

  constructor(props: {}) {
    super(props);
    this.wp = new WPAPI({
      endpoint: "http://localhost:8000/wp-json",
    });
  }

  setBlogState(posts: BlogPost[]): void {
    this.setState({ posts: posts });
  }

  componentWillMount(): void {
    this.setBlogState([]);
    this.wp
      .posts()
      .then(this.setBlogState.bind(this))
      .catch((err) => console.log(err));
  }

  render(): JSX.Element {
    return (
      <Container>
        {this.state.posts.map((post) => (
          <section className="Section">
            <Row className="Section-content">
              <Col className="Centered">
                <h2>{post.title.rendered}</h2>
                <div className="Centered Line"></div>
                <Interweave content={post.content.rendered} />
                <div className="Centered Short-line"></div>
              </Col>
            </Row>
          </section>
        ))}
      </Container>
    );
  }
}
