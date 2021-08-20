import { Component } from "react";
import { CVProps } from "../model/CVModel";
import { Blog } from "./blog/Blog";
import { BlogServiceProps } from "./blog/BlogService";
import { SharePanel } from "./nav/SharePanel";
import { About } from "./profile/About";
import { Contact } from "./profile/Contact";
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
          <Education education={this.props.cv.education} />
        </Fade>
        <Fade right>
          <Projects projects={this.props.cv.projects} />
        </Fade>
        <Fade left>
          <Technical techical={this.props.cv.skills} />
        </Fade>
        <Fade right>
          <Blog service={this.props.service} />
        </Fade>
        <Fade bottom>
          <Contact profiles={this.props.cv.basics.profiles} />
        </Fade>  
      </div>
    );
  }
}
