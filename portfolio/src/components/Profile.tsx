import React from "react";
import { Fade } from "react-awesome-reveal";

import { CVProps } from "../model/CVModel";
import { SharePanel } from "./nav/SharePanel";
import { About } from "./profile/About";
import { Education } from "./profile/Education";
import { Experience } from "./profile/Experience";
import { Projects } from "./profile/Projects";
import { Technical } from "./profile/Technical";

export class Profile extends React.Component<CVProps> {
  render(): JSX.Element {
    return (
      <div>
        <SharePanel
          url={window.location.href}
          title="Daniel William Clarke Portfolio"
          body={this.props.cv.about.entry.label}
          hashtag="DCTechPortfolio"
        />
        {[
          <About about={this.props.cv.about} />,
          <Experience work={this.props.cv.work} />,
          <Education education={this.props.cv.education} />,
          <Technical skills={this.props.cv.skills} />,
          <Projects projects={this.props.cv.projects} />,
        ].map((element: JSX.Element, index: number) => (
          <Fade
            triggerOnce
            delay={0.5}
            direction={index % 2 ? "left" : "right"}
          >
            {element}
          </Fade>
        ))}
      </div>
    );
  }
}
