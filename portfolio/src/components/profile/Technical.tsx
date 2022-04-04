import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { Entries } from "../../model/Includes";
import { Skills, DevIcon } from "../../model/CVModel";
import { DevIconName } from "../shared/DevIcon";
import { Section } from "../shared/Section";

import "../shared/Portfolio.scss";
import "./Technical.scss";

type TechnicalProps = {
  skills: Entries<Skills>;
};

type SkillsState = {
  search: string;
};

export class Technical extends Component<TechnicalProps, SkillsState> {
  constructor(props: TechnicalProps) {
    super(props);
    this.state = { search: "" };
  }

  render(): JSX.Element {
    return (
      <Section id="skills" title="Skills and Competencies">
        <Row className="section-content">
          <Col>
            {documentToReactComponents(this.props.skills.entries[0].summary)}
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

        <Row className="skill-items">
          <Zoom triggerOnce cascade damping={0.01} className="col">
            {this.props.skills.entries[0].list
              .filter(({ name }: DevIcon) => this.filterSkills(name))
              .map((icon: DevIcon) => (
                <DevIconName icon={icon} />
              ))}
          </Zoom>
        </Row>

        <Row className="section-content">
          <Col>
            <p className="centered">
              <i>And many more!</i>
            </p>
          </Col>
        </Row>
      </Section>
    );
  }

  private handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ search: event.target.value });
  }

  private filterSkills(name: string): boolean {
    return this.state.search.length
      ? name.toLowerCase().includes(this.state.search.toLowerCase())
      : true;
  }
}
