import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { resolve } from "inversify-react";
import { Fade } from "react-awesome-reveal";

import { GiScrollQuill } from "react-icons/gi";

import { IDateService } from "../../services/DateService";
import { ICujoService } from "../../services/CujoService";
import { Post } from "../../model/BlogPostModel";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";

import "../shared/Portfolio.scss";
import "./BlogPost.scss";
import "highlight.js/scss/tomorrow-night-eighties.scss";

type BlogIDProps = {
  id: number;
};

type BlogPostState = {
  post: Post | undefined;
};

export class BlogPost extends Component<BlogIDProps, BlogPostState> {
  @resolve("DateService") private readonly dateService!: IDateService;
  @resolve("CujoService") private readonly cujoService!: ICujoService;

  async componentWillMount() {
    this.dateService.format("Do MMMM YYYY HH:mm:ss");
    this.setState({ post: undefined });
    this.setState({ post: await this.cujoService.FetchBlogPost(this.props.id) });
  }

  render(): JSX.Element {
    return <>{this.state.post && this.displayPost(this.state.post)}</>;
  }

  private displayPost(p: Post): JSX.Element {
    return (
      <Fade triggerOnce direction="left">
        <Section
          id="post"
          bg="section-light"
          title={p.title}
          icon={GiScrollQuill}>

          <h4 className="blog-date">
            {this.dateService.toSentence(p.date)}
          </h4>

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

        </Section>
      </Fade>
    );
  }
}
