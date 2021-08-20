import { Component } from "react";
import { CVProps } from "../model/CVModel";
import { BlogServiceProps } from "./blog/BlogService";
import { SharePanel } from "./nav/SharePanel";
import { About } from "./profile/About";
import { Education } from "./profile/Education";
import { Experience } from "./profile/Experience";
import { Projects } from "./profile/Projects";
import { Technical } from "./profile/Technical";

const Fade = require("react-reveal/Fade");

export class Profile extends Component<CVProps & BlogServiceProps> {
  render(): JSX.Element {
    return (
      <div>
        <SharePanel
          url={window.location.href}
          body="Software Engineer Portfolio and Blog"
          hashtag="DCTechPortfolio"
        />
        <Fade left>
          <About
            basics={this.props.cv.basics}
            interests={this.props.cv.interests}
          />
        </Fade>
        <Fade right>
          <Experience work={this.props.cv.work} />
        </Fade>
        <Fade left>
          <Technical techical={this.props.cv.skills} />
        </Fade>
        <Fade right>
          <Education education={this.props.cv.education} />
        </Fade>
        <Fade left>
          <Projects projects={this.props.cv.projects} />
        </Fade>
      </div>
    );
  }
}
