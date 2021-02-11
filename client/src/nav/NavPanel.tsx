import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./NavPanel.css";
import logo from "../assets/logo.png";

export class NavPanel extends Component<{}> {
  render(): JSX.Element {
    return (
      <nav className="Nav-panel">
        <div className="Nav-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="Nav-container">
          <ul>
            <li className="option">
              <Link to="/">Home</Link>
            </li>
            <li className="option">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="option">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
