import React, { Component } from "react";
import { NavLink } from "react-router-dom";

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
              <NavLink exact activeClassName='Nav-active' to="/">Home</NavLink>
            </li>
            <li className="option">
              <NavLink exact activeClassName='Nav-active' to="/blog">Blog</NavLink>
            </li>
            <li className="option">
              <NavLink exact activeClassName='Nav-active' to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
