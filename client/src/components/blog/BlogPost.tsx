import React, { Component, Fragment, MouseEvent } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

import { BlogServiceProps, BlogPostData } from "./BlogService";

import "../../shared/Section.scss";
import "./BlogPost.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";
import moment from "moment";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Tag } from "./BlogTagModel";

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
      <section className="Section Blog-post">
        <Container>
          {this.backButton()}

          <Row>
            <Col>
              <h2 className="Section-title">{p.post.title.rendered}</h2>
              <h4 className="Blog-modified">
                Last updated {this.toDateSentence(p.post.modified)}
              </h4>
              <div className="Line"></div>
            </Col>
          </Row>

          <Row className="Tags">
            {p.tags.map(
              (t: Tag): JSX.Element => (
                <span className="Col-item">{t.name}</span>
              )
            )}
          </Row>

          <Row className="Section-content Blog-excerpt">
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: p.post.excerpt.rendered,
                }}
              ></div>
            </Col>
          </Row>

          {p.media && (
            <Row className="Section-content">
              <Col className="Centered Featured">
                <img src={p.media.source_url} alt="not found..." />
              </Col>
            </Row>
          )}

          <Row className="Section-content Blog-content">
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: p.post.content.rendered,
                }}
              ></div>
            </Col>
          </Row>

          <div className="Short-line"></div>
          {this.backButton()}
        </Container>
      </section>
    );
  }

  private backButton(): JSX.Element {
    return (
      <Button
        className="Blog-back"
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
