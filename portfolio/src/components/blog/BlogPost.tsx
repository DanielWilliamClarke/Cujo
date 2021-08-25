import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { resolve } from "inversify-react";

import { GiScrollQuill } from "react-icons/gi";

import { IDateService } from "../../services/DateService";
import { IBlogService } from "../../services/BlogService";
import { Post } from "../../model/BlogPostModel";
import { Lanyard } from "../shared/Lanyard";

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

  async componentWillMount() {
    this.dateService.format("Do MMMM YYYY HH:mm:ss");

    this.setState({ post: undefined });
    const post: Post = await this.blogService.FetchBlogPost(this.props.id);
    this.setState({ post });
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

            <Lanyard className="tags" tags={p.tags} />
  
            {p.media_url && (
              <>
                <Row className="section-content">
                  <Col className="centered featured">
                    <img src={p.media_url} alt="not found..." />
                  </Col>
                  
                </Row>
                <div className="line centered" />
              </>
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
          </Container>
          <div className="short-line centered"></div>
          <GiScrollQuill className="section-icon"/>
        </section>
      </Fade>
    );
  }
}
