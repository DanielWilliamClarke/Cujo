import React, { Component } from "react";
import { CVProps } from "../model/CV";

import "./Home.css";
import headshot from "../assets/headshot.jpg";
import { LoremIpsum } from "lorem-ipsum";

export class Home extends Component<CVProps> {
  private lorem: LoremIpsum;

  constructor(props: CVProps) {
    super(props);
    
    this.lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });
  }

  render(): JSX.Element {
    return (
      <div className="Home">
        <div className="Home-container">
          <div className="Headshot">
            <img src={headshot} alt="headshot" />
          </div>
        </div>
        <div className="Home-container">
          <div className="Card">
            <div className="Card-title">
              Hi, name is {this.props.cv.basics.name}!
            </div>
            {this.lorem.generateParagraphs(1000)}
          </div>
        </div>
      </div>
    );
  }
}
