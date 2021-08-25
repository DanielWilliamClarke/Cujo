import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import { Zoom } from "react-awesome-reveal";

import { IoCodeWorkingSharp } from "react-icons/io5";

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
  componentWillMount() {
    this.setState({ search: "" });
  }

  render(): JSX.Element {
    return (
      <section id="skills" className="section technical">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">Skills and Competencies</h2>
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
            <Zoom triggerOnce cascade damping={0.01} className="col">
              {this.props.techical.list
                .filter(this.filterSkills.bind(this))
                .map((icon: DevIcon) => (<DevIconName  icon={icon} />))}
            </Zoom>
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
        <IoCodeWorkingSharp className="section-icon" />
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
}
