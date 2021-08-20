import { Component, Fragment } from "react";
import { Container, Row, Col, Nav, Badge } from "react-bootstrap";
import moment from "moment";

import { BlogServiceProps } from "./BlogService";
import { Post } from "../../model/BlogPostModel";
import { SharePanel } from "../nav/SharePanel";

import "../shared/Portfolio.scss";
import "./BlogPost.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";

const Fade = require("react-reveal/Fade");

type BlogIDProps = {
  id: number;
};

type BlogPostState = {
  post: Post | null;
};

export class BlogPost extends Component<BlogServiceProps & BlogIDProps, BlogPostState> {

  componentWillMount(): void {
    this.setPostState(null);
    this.props.service
      .FetchBlogPost(this.props.id)
      .then(this.setPostState.bind(this))
      .catch((err) => console.log(err));
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
      <Fade left>
        <section id="post" className="section-dark blog-post">
          <Container>
            <Nav navbarScroll>
              <Nav.Link href={`/#blog`} >
                {`< Back`}
              </Nav.Link>
            </Nav>

            <SharePanel
              url={window.location.href}
              title={`Blog - ${p.title}`}
              body={p.excerpt}
              hashtag="DCTechBlog"
            />

            <Row>
              <Col>
                <h2 className="section-title">{p.title}</h2>
                <div className="line centered"></div>
                <h4 className="blog-date">
                  {this.toDateSentence(p.date)}
                </h4>
              </Col>
            </Row>

            <div className="tags">
              {p.tags.map((tag: string): JSX.Element => (
                <Badge bg="portfolio" className="tag">{tag}</Badge>
              ))}
            </div>

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

            <div className="short-line centered"></div>
          </Container>
        </section>
      </Fade>
    );
  }

  private toDateSentence(date: string): string {
    if (date === "Present") {
      return date;
    }
    return moment(date).format("Do MMMM YYYY HH:mm:ss");
  }
}