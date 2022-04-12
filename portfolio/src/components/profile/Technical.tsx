import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { Entry } from "../../model/Includes";
import { Skills, Skill } from "../../model/CVModel";
import { DevIconName } from "../shared/DevIcon";
import { Section } from "../shared/Section";
import { ProgressGauge } from "../shared/ProgressGauge";

import "../shared/Portfolio.scss";
import "./Technical.scss";

type TechnicalProps = {
  skills: Entry<Skills>;
};

type SkillsState = {
  search: string;
  gaugeColors: string[];
};

export class Technical extends Component<TechnicalProps, SkillsState> {
  constructor(props: TechnicalProps) {
    super(props);
    this.state = {
      search: "",
      gaugeColors: ["#FB6962", "#FB6962", "#FCFC99", "#0CC078", "#0CC078"],
    };
  }

  render(): JSX.Element {
    return (
      <Section id="skills" title="Skills and Competencies">
        <Row className="section-content">
          <Col>
            {documentToReactComponents(this.props.skills.entry.summary)}
          </Col>
        </Row>

        <Row>
          <Col className="section-content centered search">
            <input
              className="skills-input"
              type="text"
              value={this.state.search}
              onChange={this.handleSearchInput.bind(this)}
              placeholder="Search"
            />
          </Col>
        </Row>

        <Row className="skill-items">
          <Zoom triggerOnce cascade damping={0.01} className="col centered">
            {this.props.skills.entry.list
              .filter(({ name }: Skill) => this.filterSkills(name))
              .sort((a: Skill, b: Skill) => b.level - a.level)
              .map(({ level, icon }: Skill) => (
                <ProgressGauge value={level} colors={this.state.gaugeColors}>
                  {(color: string) => <DevIconName icon={icon} color={color} />}
                </ProgressGauge>
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
