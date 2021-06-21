import React, { Component, Fragment, MouseEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import moment from "moment";

import { BlogServiceProps } from "./BlogService";
import { Post } from "../../model/BlogPostModel";
import { SharePanel } from "../nav/SharePanel";

import "../shared/Portfolio.scss";
import "./BlogPost.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";

type BlogIDProps = {
  id: number;
};

type BlogPostState = {
  post: Post | null;
};

class BlogPost extends Component<
  BlogServiceProps & BlogIDProps & RouteComponentProps,
  BlogPostState
> {
  componentWillMount(): void {
    this.setPostState(null);
    this.props.service
      .FetchBlogPost(this.props.id)
      .then(this.setPostState.bind(this))
      .catch((err) => console.log(err));
  }

  handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    this.props.history.goBack();
  }

  render(): JSX.Element {
    return (
      <Fragment>
        {this.state.post && this.displayPost(this.state.post)}
      </Fragment>
    );
  }

  private setPostState(post: Post | null) {
    this.setState({ post });
  }

  private displayPost(p: Post): JSX.Element {
    return (
      <section id="blogpost" className="section blog-post">
        <Container>
          <SharePanel
            url={window.location.href}
            title={`Blog - ${p.title}`}
            body={p.excerpt}
            hashtag="DCTechBlog"
          />

          {this.backButton()}

          <Row>
            <Col>
              <h2 className="section-title">{p.title}</h2>
              <h4 className="blog-modified">
                Published {this.toDateSentence(p.date)}
              </h4>
              <div className="line"></div>
            </Col>
          </Row>

          <Row className="tags">
            {p.tags.map(
              (tag: string): JSX.Element => (
                <span className="col-item">{tag}</span>
              )
            )}
          </Row>

          <Row className="section-content blog-excerpt">
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: p.excerpt,
                }}
              ></div>
            </Col>
          </Row>

          {p.mediaUrl && (
            <Row className="section-content">
              <Col className="centered Featured">
                <img src={p.mediaUrl} alt="not found..." />
              </Col>
            </Row>
          )}

          <Row className="section-content blog-content">
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: p.content,
                }}
              ></div>
            </Col>
          </Row>

          <div className="short-line"></div>
          {this.backButton()}
        </Container>
      </section>
    );
  }

  private backButton(): JSX.Element {
    return (
      <Button
        className="blog-back"
        variant="link"
        onClick={this.handleClick.bind(this)}
      >
        {`< Back`}
      </Button>
    );
  }

  private toDateSentence(date: string): string {
    if (date === "Present") {
      return date;
    }
    return moment(date).format("Do MMMM YYYY HH:mm:ss");
  }
}

export default withRouter(BlogPost);
