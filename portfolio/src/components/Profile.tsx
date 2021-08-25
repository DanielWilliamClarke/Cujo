import { Component } from "react";
import { Fade } from "react-awesome-reveal";

import { CVProps } from "../model/CVModel";
import { About } from "./profile/About";
import { Education } from "./profile/Education";
import { Experience } from "./profile/Experience";
import { Projects } from "./profile/Projects";
import { Technical } from "./profile/Technical";

export class Profile extends Component<CVProps> {
  render(): JSX.Element {
    return (
      <div>
        {[
          <About basics={this.props.cv.basics} interests={this.props.cv.interests} />,
          <Experience work={this.props.cv.work} />,
          <Education education={this.props.cv.education} />,
          <Technical techical={this.props.cv.skills} />,
          <Projects projects={this.props.cv.projects} />
        ].map((element: JSX.Element, index: number) => (
          <Fade triggerOnce direction={index % 2 === 0 ? "right" : "left" }>
            {element}
          </Fade>
        ))}
      </div>
    );
  }
}
