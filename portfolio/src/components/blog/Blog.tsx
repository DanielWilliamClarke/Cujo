import { Component } from "react";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { resolve } from "inversify-react";
import { Fade } from "react-awesome-reveal";

import { MdBook, MdHistoryEdu } from "react-icons/md";

import { IDateService } from "../../services/DateService";
import {
  ContentfulEntries,
  getMediaURL,
  Item,
} from "../../model/ContentfulEntries";
import { Lanyard } from "../shared/Lanyard";
import { Section } from "../shared/Section";
import readingTime from "reading-time";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

import "../shared/Portfolio.scss";
import "./Blog.scss";

export type BlogProps = {
  blog: ContentfulEntries;
};

export class Blog extends Component<BlogProps> {
  @resolve("DateService") private readonly dateService!: IDateService;

  async componentWillMount() {
    this.dateService.format("Do MMMM YYYY HH:mm:ss");
  }

  render(): JSX.Element {
    return (
      <Fade triggerOnce direction="up">
        <Section id="blog" bg="section-dark" title="Blog" icon={MdBook}>
          <Row xs={1} md={2} className="g-4 blog-cards">
            {this.props.blog.items.length ? (
              this.props.blog.items.map(this.blogSummaryPanel.bind(this))
            ) : (
              <Col className="blog-placeholder centered">Coming soon</Col>
            )}
          </Row>
        </Section>
      </Fade>
    );
  }

  private blogSummaryPanel(data: Item, index: number): JSX.Element {
    const mediaUrl = getMediaURL(
      this.props.blog.includes,
      data.fields.media.sys.id
    );

    const stats = readingTime(documentToPlainTextString(data.fields.content));

    return (
      <Col>
        <Fade triggerOnce direction={index % 2 ? "right" : "left"}>
          <Card key={data.fields.id} bg="dark">
            <Nav navbarScroll>
              <Nav.Link href={`/blog/${data.fields.id}`}>
                {mediaUrl ? (
                  <Card.Img variant="top" src={mediaUrl} />
                ) : (
                  <MdHistoryEdu />
                )}
              </Nav.Link>
            </Nav>

            <Card.Body>
              <Nav navbarScroll>
                <Nav.Link href={`/blog/${data.fields.id}`}>
                  <Card.Title>{data.fields.title}</Card.Title>
                </Nav.Link>
              </Nav>
              <Card.Text>
                Published{" "}
                {this.dateService.toSentence(data.sys.createdAt.toString())}{" "}
              </Card.Text>
              <Lanyard tags={data.fields.tags} />
              <Card.Text
                className="text-muted"
                dangerouslySetInnerHTML={{
                  __html: data.fields.excerpt,
                }}
              />
              <small className="text-muted">{stats.text}</small>
            </Card.Body>

            <Card.Footer>
              <small className="text-muted">
                Last updated{" "}
                {this.dateService.toSentence(data.sys.updatedAt.toString())}
              </small>
            </Card.Footer>
          </Card>
        </Fade>
      </Col>
    );
  }
}
