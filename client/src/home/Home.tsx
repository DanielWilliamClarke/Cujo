import React, { Component } from "react";
import { CVProps } from "../model/CV";

import "./Home.css";
import headshot from "../assets/headshot.jpg";

export class Home extends Component<CVProps> {
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
          </div>
        </div>
      </div>
    );
  }
}
