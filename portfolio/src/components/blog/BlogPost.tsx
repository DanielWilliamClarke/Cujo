import { Component, Fragment } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";

import { DateFormatter } from "../shared/DateUtils";
import { BlogServiceProps } from "./BlogService";
import { Post } from "../../model/BlogPostModel";

import "../shared/Portfolio.scss";
import "./BlogPost.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";

const Fade = require("react-reveal/Fade");

type BlogIDProps = {
  id: number;
};

export class BlogPost extends Component<BlogServiceProps & BlogIDProps> {
  private formatter = new DateFormatter("Do MMMM YYYY HH:mm:ss");

  render(): JSX.Element {
    const post = this.props.service.post(this.props.id);
    return <Fragment>{post && this.displayPost(post)}</Fragment>;
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
                  {this.formatter.toSentence(p.date)}
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
