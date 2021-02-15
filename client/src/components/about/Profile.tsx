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
          <About cv={this.props.cv} />
        </Fade>
        <Fade bottom>
          <Technical cv={this.props.cv} />
        </Fade>
        <Fade bottom>
          <Experience cv={this.props.cv} />
        </Fade>{" "}
        <Fade bottom>
          <Education cv={this.props.cv} />
        </Fade>
      </div>
    );
  }
}
