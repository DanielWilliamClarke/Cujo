import React, { Component } from "react";

import { SharePanel } from "../nav/SharePanel";
import { About } from "./About";
import { Experience } from "./Experience";
import { Technical } from "./Technical";
import { Education } from "./Education";
import { Projects } from "./Projects";
import { Contact } from "./Contact";

import { CVProps } from "../../model/CV";

const Fade = require("react-reveal/Fade");

export class Profile extends Component<CVProps> {
  render(): JSX.Element {
    return (
      <div>
        <SharePanel
          url={window.location.href}
          body="Software Engineer Portfolio and Blog"
          hashtag="DCTechPortfolio"
        />
        <Fade bottom>
          <About
            basics={this.props.cv.basics}
            interests={this.props.cv.interests}
          />
        </Fade>
        <Fade bottom>
          <Experience work={this.props.cv.work} />
        </Fade>
        <Fade bottom>
          <Education education={this.props.cv.education} />
        </Fade>
        <Fade bottom>
          <Projects projects={this.props.cv.projects} />
        </Fade>
        <Fade bottom>
          <Technical skills={this.props.cv.skills} />
        </Fade>
        <Fade bottom>
          <Contact profiles={this.props.cv.basics.profiles} />
        </Fade> 
      </div>
    );
  }
}
