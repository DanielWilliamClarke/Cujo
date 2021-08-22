import { Component } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { resolve } from "inversify-react";

import { IDateService } from "../../services/DateService";
import { IBlogService } from "../../services/BlogService";
import { Post } from "../../model/BlogPostModel";

import "../shared/Portfolio.scss";
import "./BlogPost.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";

const Fade = require("react-reveal/Fade");

type BlogIDProps = {
  id: number;
};

type BlogPostState = {
  post: Post | undefined;
};

export class BlogPost extends Component<BlogIDProps, BlogPostState> {
  @resolve("DateService") private readonly dateService!: IDateService;
  @resolve("BlogService") private readonly blogService!: IBlogService;

  componentWillMount() {
    this.dateService.format("Do MMMM YYYY HH:mm:ss");

    this.setState({ post: undefined });
    this.blogService
      .FetchBlogPost(this.props.id)
      .then((post: Post) => this.setState({ post }));
  }

  render(): JSX.Element {
    return <>{this.state.post && this.displayPost(this.state.post)}</>;
  }

  private displayPost(p: Post): JSX.Element {
    return (
      <Fade left>
        <section id="post" className="section-light blog-post">
          <Container>
            <Row>
              <Col>
                <h2 className="section-title">{p.title}</h2>
                <div className="line centered"></div>
                <h4 className="blog-date">
                  {this.dateService.toSentence(p.date)}
                </h4>
              </Col>
            </Row>

            <div className="tags">
              {p.tags.map(
                (tag: string): JSX.Element => (
                  <Badge bg="portfolio" className="tag">
                    {tag}
                  </Badge>
                )
              )}
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
}
