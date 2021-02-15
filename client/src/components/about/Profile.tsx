import { Component } from "react";

import { About } from "./About";
import { Experience } from "./Experience";
import { Technical } from "./Technical";
import { Education } from "./Education";

import { CVProps } from "../../model/CV";

const Fade = require("react-reveal/Fade");

export class Profile extends Component<CVProps> {
  render(): JSX.Element {
    return (
      <div>
        <Fade bottom>
          <About basics={this.props.cv.basics} interests={this.props.cv.interests} />
        </Fade>
        <Fade bottom>
          <Technical skills={this.props.cv.skills} />
        </Fade>
        <Fade bottom>
          <Experience work={this.props.cv.work} />
        </Fade>{" "}
        <Fade bottom>
          <Education education={this.props.cv.education} />
        </Fade>
      </div>
    );
  }
}
