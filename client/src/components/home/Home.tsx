import React, { Component } from "react";
import { CVProps } from "../../model/CV";
import { LoremIpsum } from "lorem-ipsum";

import "./Home.css";
import headshot from "../../assets/headshot.jpg";

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
      <section className="Home">
        <section id="about">
          <div className="section-title">About</div>

          <div className="Home-container"> 
            <img className="Headshot" src={headshot} alt="headshot" />
          </div>
          <div className="Home-container">
            <div className="Card">
              <div className="Card-title">
                Hi, name is {this.props.cv.basics.name}!
              </div>
              {this.lorem.generateParagraphs(1000)}
            </div>
          </div>
        </section>
      </section>
    );
  }
}
