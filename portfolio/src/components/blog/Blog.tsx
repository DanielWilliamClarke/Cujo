import { Component } from "react";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import { resolve } from "inversify-react";
import { Fade } from "react-awesome-reveal";

import { GiBookmarklet, GiScrollQuill } from "react-icons/gi";

import { IDateService } from "../../services/DateService";
import { ICujoService } from "../../services/CujoService";
import { Post } from "../../model/BlogPostModel";
import { Lanyard } from "../shared/Lanyard";

import "../shared/Portfolio.scss";
import "./Blog.scss";


type BlogState = {
  posts: Post[];
};

export class Blog extends Component<{}, BlogState> {
  @resolve("DateService") private readonly dateService!: IDateService;
  @resolve("CujoService") private readonly cujoService!: ICujoService;

  async componentWillMount() {
    this.dateService.format("Do MMMM YYYY HH:mm:ss");
    this.setState({ posts: [] })
    this.setState({ posts: await this.cujoService.FetchAllBlogPosts() });
  }

  render(): JSX.Element {
    return (
      <Fade triggerOnce direction="up">
        <section id="blog" className="section-dark blog">
          <Container>
            <Row>
              <Col>
                <h2 className="section-title">Blog</h2>
                <div className="centered line" />
              </Col>
            </Row>
            <Row xs={1} md={2} className="g-4 blog-cards">
              {this.state.posts &&
                this.state.posts.map(this.blogSummaryPanel.bind(this))}
            </Row>
          </Container>
          <div className="centered short-line" />
          <GiBookmarklet className="section-icon" />
        </section>
      </Fade>
    );
  }

  private blogSummaryPanel(data: Post, index: number): JSX.Element {
    return (
      <Col>
        <Fade triggerOnce direction={index % 2 ? "right" : "left" }>
          <Card key={data.id} bg="dark">
            <Nav navbarScroll>
              <Nav.Link href={`/blog/${data.id}`}>
                {data.media_url ? (
                  <Card.Img variant="top" src={data.media_url} />
                ) : (
                  <GiScrollQuill />
                )}
              </Nav.Link>
            </Nav>

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
      </Col>
    );
  }
}
