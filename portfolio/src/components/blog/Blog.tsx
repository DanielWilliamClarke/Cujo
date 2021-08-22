import { Component } from "react";
import { Card, CardColumns, Col, Container, Nav, Row } from "react-bootstrap";
import moment from "moment";

import { BlogServiceProps } from "./BlogService";
import { Post } from "../../model/BlogPostModel";

import "../shared/Portfolio.scss";
import "./Blog.scss";

const Fade = require("react-reveal/Fade");

export class Blog extends Component<BlogServiceProps> {
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
              {this.props.service.posts().map(this.blogSummaryPanel.bind(this))}
            </CardColumns>
          </Container>
        </section>
      </Fade>
    );
  }

  private blogSummaryPanel(data: Post): JSX.Element {
    return (
      <Fade bottom>
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
            <Card.Text>Published {this.toDateSentence(data.date)} </Card.Text>
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
