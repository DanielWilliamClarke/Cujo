import React, { Component, Fragment, MouseEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import moment from "moment";

import { BlogServiceProps, BlogPostData } from "./BlogService";
import { Tag } from "../../model/BlogTagModel";
import { SharePanel } from "../nav/SharePanel";

import "../shared/Portfolio.scss";
import "./BlogPost.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";

type BlogIDProps = {
  id: number;
};

type BlogPostState = {
  post: BlogPostData | null;
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

  private setPostState(post: BlogPostData | null) {
    this.setState({ post });
  }

  private displayPost(p: BlogPostData): JSX.Element {
    return (
      <section id="blogpost" className="section blog-post">
        <Container>
          <SharePanel
            url={window.location.href}
            title={`Blog - ${p.post.title.rendered}`}
            body={p.post.excerpt.rendered}
            hashtag="DCTechBlog"
          />

          {this.backButton()}

          <Row>
            <Col>
              <h2 className="section-title">{p.post.title.rendered}</h2>
              <h4 className="blog-modified">
                Published {this.toDateSentence(p.post.date)}
              </h4>
              <div className="line"></div>
            </Col>
          </Row>

          <Row className="tags">
            {p.tags.map(
              (t: Tag): JSX.Element => (
                <span className="col-item">{t.name}</span>
              )
            )}
          </Row>

          <Row className="section-content blog-excerpt">
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: p.post.excerpt.rendered,
                }}
              ></div>
            </Col>
          </Row>

          {p.media && (
            <Row className="section-content">
              <Col className="centered Featured">
                <img src={p.media.source_url} alt="not found..." />
              </Col>
            </Row>
          )}

          <Row className="section-content blog-content">
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: p.post.content.rendered,
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
