import { Component } from "react";
import { Card, CardColumns, Col, Container, Nav, Row } from "react-bootstrap";

import { DateFormatter } from "../shared/DateUtils";
import { BlogServiceProps } from "./BlogService";
import { Post } from "../../model/BlogPostModel";

import "../shared/Portfolio.scss";
import "./Blog.scss";

const Fade = require("react-reveal/Fade");

export class Blog extends Component<BlogServiceProps> {
  private formatter = new DateFormatter("Do MMMM YYYY HH:mm:ss");

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
            <Card.Text>
              Published {this.formatter.toSentence(data.date)}{" "}
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
              Last updated {this.formatter.toSentence(data.modified)}
            </small>
          </Card.Footer>
        </Card>
      </Fade>
    );
  }
}
