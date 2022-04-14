import React from "react";
import { Row, Col } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

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

export class Technical extends React.Component<TechnicalProps, SkillsState> {
  constructor(props: TechnicalProps) {
    super(props);
    this.state = {
      search: "",
      gaugeColors: ["#FB6962", "#FB6962", "#FCFC99", "#0CC078", "#0CC078"],
    };
  }

  render(): JSX.Element {
    return (
      <Section id="skills" title="Skills">
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

        {this.displaySkills(
          this.props.skills.entry.currentSummary,
          this.props.skills.entry.current
        )}
        {this.displaySkills(
          this.props.skills.entry.favoriteSummary,
          this.props.skills.entry.favorite
        )}
        {this.displaySkills(
          this.props.skills.entry.usedSummary,
          this.props.skills.entry.used
        )}

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

  private displaySkills(summary: Document, skills: Skill[]) {
    return (
      <>
        <Row className="section-content">
          <Col>{documentToReactComponents(summary)}</Col>
        </Row>
        <Row className="skill-items">
          <Zoom triggerOnce cascade damping={0.01} className="col centered">
            {skills
              .filter(({ name }: Skill) => this.filterSkills(name))
              .sort((a: Skill, b: Skill) => b.level - a.level)
              .map(({ level, icon }: Skill) => (
                <ProgressGauge value={level} colors={this.state.gaugeColors}>
                  {(color: string) => <DevIconName icon={icon} color={color} />}
                </ProgressGauge>
              ))}
          </Zoom>
        </Row>
        <div className="line centered" />
      </>
    );
  }
}
