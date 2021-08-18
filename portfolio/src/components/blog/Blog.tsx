import { Component, Fragment } from "react";
import { Card, CardColumns, Col, Nav, Row } from "react-bootstrap";
import moment from "moment";

import { BlogServiceProps } from "./BlogService";
import { Post } from "../../model/BlogPostModel";

import "../shared/Portfolio.scss";
import "./Blog.scss";

const Fade = require("react-reveal/Fade");

type BlogState = {
  blog: Post[];
};

export class Blog extends Component<BlogServiceProps, BlogState> {
  componentWillMount(): void {
    this.setBlogState([]);
    this.props.service
      .FetchAllBlogPosts()
      .then(this.setBlogState.bind(this))
      .catch((err) => console.log(err));
  }

  render(): JSX.Element {
    return this.blogPosts();
  }

  private setBlogState(blog: Post[]) {
    this.setState({ blog });
  }

  private blogPosts(): JSX.Element {
    return (
      <section id="blog" className="section blog">
        <Fade bottom>
          <Row>
            <Col>
              <h2 className="section-title">Blog</h2>
              <div className="centered line" />
            </Col>
          </Row>
          <CardColumns className="section-content">
            {this.state.blog.map(
              (data: Post): JSX.Element => (
                <Fragment>{this.blogSummaryPanel(data)}</Fragment>
              )
            )}
          </CardColumns>
        </Fade>
      </section>
    );
  }

  private blogSummaryPanel(data: Post): JSX.Element {
    return (
      <Fade bottom>
        <Card key={data.id} bg="dark">
          {data.mediaUrl && (
            <Nav navbarScroll>
              <Nav.Link
                href={`/blog/${data.id}`} >
                <Card.Img variant="top" src={data.mediaUrl} />
              </Nav.Link>
            </Nav>
          )}
          <Card.Body>
            <Nav navbarScroll>
              <Nav.Link
                href={`/blog/${data.id}`}
              >
                <Card.Title>{data.title}</Card.Title>
              </Nav.Link>
            </Nav>
            <Card.Text>
              Published {this.toDateSentence(data.date)}{" "}
            </Card.Text>
            <Card.Text
              className="text-muted"
              dangerouslySetInnerHTML={{
                __html: data.excerpt,
              }}
            />
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Last updated {this.toDateSentence(data.modified)}
            </small>
          </Card.Footer>
        </Card>
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