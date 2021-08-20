import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";

import { Skills, DevIcon } from "../../model/CVModel";
import { DevIconName } from "../shared/DevIcon";

import "../shared/Portfolio.scss";
import "./Technical.scss";

type TechnicalProps = {
  techical: Skills;
};

type SkillsState = {
  search: string;
};

export class Technical extends Component<TechnicalProps, SkillsState> {
  componentWillMount(): void {
    this.setState({ search: "" });
  }

  render(): JSX.Element {
    return (
      <section id="skills" className="section technical">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">Technical Skills</h2>
              <div className="centered line" />
            </Col>
          </Row>

          <Row className="section-content">
            <Col>
              <ReactMarkdown
                children={this.props.techical.summary}
                remarkPlugins={[breaks]}
              />
            </Col>
          </Row>

          <Row>
            <Col className="section-content centered search">
              <input
                type="text"
                value={this.state.search}
                onChange={this.handleSearchInput.bind(this)}
                placeholder="Search for a skill!"
              />
            </Col>
          </Row>
          
          <Row className="skills">
            {this.props.techical.list
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
      ? name.toLowerCase().includes(this.state.search.toLowerCase())
      : true;
  }

  private displayDevIcon(icon: DevIcon): JSX.Element {
    return (
      <Col>
        <DevIconName icon={icon} />
      </Col>
    );
  }
}
