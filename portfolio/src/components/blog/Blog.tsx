import { Component } from "react";
import { Card, CardColumns, Col, Container, Nav, Row } from "react-bootstrap";
import { resolve } from "inversify-react";

import { GiBookmarklet } from "react-icons/gi";

import { IDateService } from "../../services/DateService";
import { IBlogService } from "../../services/BlogService";
import { Post } from "../../model/BlogPostModel";
import { Lanyard } from "../shared/Lanyard";

import "../shared/Portfolio.scss";
import "./Blog.scss";

const Fade = require("react-reveal/Fade");

type BlogState = {
  posts: Post[];
};

export class Blog extends Component<{}, BlogState> {
  @resolve("DateService") private readonly dateService!: IDateService;
  @resolve("BlogService") private readonly blogService!: IBlogService;

  componentWillMount() {
    this.dateService.format("Do MMMM YYYY HH:mm:ss");

    this.setState({ posts: [] });
    this.blogService
      .FetchAllBlogPosts()
      .then((posts: Post[]) => this.setState({ posts }));
  }

  render(): JSX.Element {
    return (
      <Fade bottom>
        <section id="blog" className="section-dark blog">
          <Container>
            <Row>
              <Col>
                <h2 className="section-title">Blog</h2>
                <div className="centered line" />
              </Col>
            </Row>
            <CardColumns className="section-content">
              {this.state.posts &&
                this.state.posts.map(this.blogSummaryPanel.bind(this))}
            </CardColumns>
          </Container>
          <div className="centered short-line" />
          <GiBookmarklet className="section-icon"/>
        </section>
      </Fade>
    );
  }

  private blogSummaryPanel(data: Post, index: number): JSX.Element {
    return (
      <Fade left={index % 2 === 0} right={index % 2 !== 0}>
        <Card key={data.id} bg="dark">
          {data.mediaUrl && (
            <Nav navbarScroll>
              <Nav.Link href={`/blog/${data.id}`}>
                <Card.Img variant="top" src={data.mediaUrl} />
              </Nav.Link>
            </Nav>
          )}
          <Card.Body>
            <Nav navbarScroll>
              <Nav.Link href={`/blog/${data.id}`}>
                <Card.Title>{data.title}</Card.Title>
              </Nav.Link>
            </Nav>
            <Card.Text>
              Published {this.dateService.toSentence(data.date)}{" "}
            </Card.Text>
            <Lanyard tags={data.tags} />
            <Card.Text
              className="text-muted"
              dangerouslySetInnerHTML={{
                __html: data.excerpt,
              }}
            />
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Last updated {this.dateService.toSentence(data.modified)}
            </small>
          </Card.Footer>
        </Card>
      </Fade>
    );
  }
}
