import React, { Component } from "react";
import { DevIcon } from "../../model/CV";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import "../../shared/section.scss";
import "./Technical.scss";

type SkillsProps = {
  skills: DevIcon[];
};

type SkillsState = {
  search: string;
};

export class Technical extends Component<SkillsProps, SkillsState> {
  componentWillMount(): void {
    this.setState({ search: "" });
  }

  render(): JSX.Element {
    return (
      <section id="technical" className="section technical">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">Technical Skills</h2>
              <div className="centered line" />
            </Col>
          </Row>

          <Row className="section-content">
            <Col>
              <p className="centered">
                I have worked with and are proficient with a large varity of
                programming languages, frameworks and tools. For backend web
                applications I use Golang and Nodejs. For frontend; TypeScript
                and JavaScript, and for performant apps, services and games I
                use C++. I feel most at home with C++ and Golang, but I am
                trying to learn a few <i>esoteric</i> languages such as Rust and
                Assembly.
              </p>
              <p className="centered">
                Below is a selection of the langauges, frameworks and tools I have had experience with during my career so far.
              </p>
            </Col>
          </Row>

          <Row>
            <Col className="section-content centered">
              <input
                type="text"
                value={this.state.search}
                onChange={this.handleSearchInput.bind(this)}
                placeholder="Search for a skill!"
              />
            </Col>
          </Row>
          <Row className="skills">
            {this.props.skills
              .filter(this.filterSkills.bind(this))
              .map(this.displayDevIcon)}
          </Row>

          <Row className="section-content">
            <Col>
              <p className="centered">
                <i>And many more!</i>
              </p>
            </Col>
          </Row>
        </Container>
        <div className="centered short-line" />
      </section>
    );
  }

  private handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ search: event.target.value });
  }

  private filterSkills({ name }: DevIcon): boolean {
    return this.state.search.length
      ? name
          .toLowerCase()
          .includes(this.state.search.toLowerCase())
      : true;
  }

  private displayDevIcon({ icon, name }: DevIcon): JSX.Element {
    return (
      <Col>
        <div className="dev-icon">
          <span className={`icon devicon-${icon}`} />
          <p className="icon-name">{name}</p>
        </div>
      </Col>
    );
  }
}
