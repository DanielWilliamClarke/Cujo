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
          <Technical techical={this.props.cv.skills} />
        </Fade>
        <Fade bottom>
          <Blog service={this.props.service} />
        </Fade>
        <Fade bottom>
          <Contact profiles={this.props.cv.basics.profiles} />
        </Fade>  
      </div>
    );
  }
}
